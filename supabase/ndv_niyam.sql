-- Niyam on the course's Claude API credit.
-- Signed-in learners' questions go through the Edge Function "niyam" (supabase/functions/niyam), which holds the
-- Anthropic API key as a secret (ANTHROPIC_API_KEY, the same project secret EpiCompass's Kenny uses). These tables
-- record only how many questions each learner asked per day and what they cost, so that the daily limit and the
-- monthly budget can be enforced, plus the instructor's central switch. What learners type and what Niyam replies
-- are never stored.
--
-- The Claude API credit (US$500 a month) is shared with Kenny. Niyam stops when its own monthly budget is used, or
-- when Kenny and Niyam together have used the shared cap (ndv_niyam_settings.shared_cap).

create table if not exists public.ndv_niyam_usage (
  user_id   uuid not null references auth.users(id) on delete cascade,
  day       date not null,
  questions int not null default 0,
  cost_usd  numeric(12, 6) not null default 0,
  primary key (user_id, day)
);
create index if not exists ndv_niyam_usage_day on public.ndv_niyam_usage (day);
alter table public.ndv_niyam_usage enable row level security;
drop policy if exists "ndv niyam usage: read own or instructor" on public.ndv_niyam_usage;
create policy "ndv niyam usage: read own or instructor" on public.ndv_niyam_usage for select to authenticated
  using (user_id = (select auth.uid()) or (select public.is_instructor()));
-- no insert/update/delete policies: only the Edge Function (secret key) writes

create table if not exists public.ndv_niyam_settings (
  id             int primary key default 1 check (id = 1),
  enabled        boolean not null default true,
  daily_limit    int not null default 150 check (daily_limit between 1 and 1000),
  monthly_budget numeric(8, 2) not null default 50 check (monthly_budget between 0 and 500),
  shared_cap     numeric(8, 2) not null default 500 check (shared_cap between 0 and 500),
  updated_at     timestamptz not null default now(),
  updated_by     uuid references auth.users(id) on delete set null
);
insert into public.ndv_niyam_settings (id) values (1) on conflict (id) do nothing;
alter table public.ndv_niyam_settings enable row level security;
drop policy if exists "ndv niyam settings: read" on public.ndv_niyam_settings;
create policy "ndv niyam settings: read" on public.ndv_niyam_settings for select to authenticated using (true);
drop policy if exists "ndv niyam settings: instructor update" on public.ndv_niyam_settings;
create policy "ndv niyam settings: instructor update" on public.ndv_niyam_settings for update to authenticated
  using ((select public.is_instructor())) with check ((select public.is_instructor()));

create or replace function public.ndv_niyam_settings_stamp() returns trigger
language plpgsql security definer set search_path = public as $$
begin new.updated_at := now(); new.updated_by := auth.uid(); new.id := 1; return new; end $$;
drop trigger if exists ndv_niyam_settings_stamp on public.ndv_niyam_settings;
create trigger ndv_niyam_settings_stamp before update on public.ndv_niyam_settings
  for each row execute function public.ndv_niyam_settings_stamp();

-- today's date in India, so the daily allowance resets at midnight IST
create or replace function public.ndv_niyam_today() returns date
language sql stable as $$ select (now() at time zone 'Asia/Kolkata')::date $$;

-- Kenny's spend this month, if EpiCompass's table exists (0 otherwise)
create or replace function public.ndv_kenny_month_spend() returns numeric
language plpgsql security definer set search_path = public stable as $$
declare s numeric := 0;
begin
  if to_regclass('public.kenny_usage') is not null then
    execute 'select coalesce(sum(cost_usd), 0) from public.kenny_usage where day >= date_trunc(''month'', public.ndv_niyam_today())::date' into s;
  end if;
  return s;
end $$;

-- Reserve one question. Returns the questions left today after this one, -1 if the daily limit is reached,
-- -2 if Niyam's monthly budget or the shared cap is used up.
create or replace function public.ndv_niyam_reserve(uid uuid, daily_limit int, monthly_budget numeric, shared_cap numeric) returns int
language plpgsql security definer set search_path = public as $$
declare used int; spent numeric;
begin
  select coalesce(sum(cost_usd), 0) into spent from ndv_niyam_usage where day >= date_trunc('month', ndv_niyam_today())::date;
  if spent >= monthly_budget or spent + ndv_kenny_month_spend() >= shared_cap then return -2; end if;
  insert into ndv_niyam_usage (user_id, day, questions) values (uid, ndv_niyam_today(), 0) on conflict (user_id, day) do nothing;
  select questions into used from ndv_niyam_usage where user_id = uid and day = ndv_niyam_today() for update;
  if used >= daily_limit then return -1; end if;
  update ndv_niyam_usage set questions = questions + 1 where user_id = uid and day = ndv_niyam_today();
  return daily_limit - used - 1;
end $$;

-- Record what a question cost, or give the question back if it failed.
create or replace function public.ndv_niyam_settle(uid uuid, cost numeric, refund boolean) returns void
language plpgsql security definer set search_path = public as $$
begin
  update ndv_niyam_usage set cost_usd = cost_usd + greatest(cost, 0),
         questions = greatest(questions - case when refund then 1 else 0 end, 0)
   where user_id = uid and day = ndv_niyam_today();
end $$;

-- Questions the signed-in learner has left today (for the counter in the chat).
create or replace function public.ndv_niyam_left(daily_limit int) returns int
language sql security definer set search_path = public stable as $$
  select greatest(daily_limit - coalesce((select questions from ndv_niyam_usage where user_id = auth.uid() and day = ndv_niyam_today()), 0), 0)
$$;

-- Instructor summary for this month: totals only.
create or replace function public.ndv_niyam_month_summary() returns table (questions bigint, learners bigint, cost_usd numeric, kenny_cost_usd numeric)
language plpgsql security definer set search_path = public stable as $$
begin
  if not public.is_instructor() then raise exception 'Not permitted'; end if;
  return query select coalesce(sum(k.questions), 0)::bigint, count(distinct k.user_id) filter (where k.questions > 0), coalesce(sum(k.cost_usd), 0), ndv_kenny_month_spend()
    from ndv_niyam_usage k where k.day >= date_trunc('month', ndv_niyam_today())::date;
end $$;

revoke all on function public.ndv_niyam_settings_stamp() from public, anon, authenticated;
revoke all on function public.ndv_kenny_month_spend() from public, anon, authenticated;
revoke all on function public.ndv_niyam_reserve(uuid, int, numeric, numeric) from public, anon, authenticated;
revoke all on function public.ndv_niyam_settle(uuid, numeric, boolean) from public, anon, authenticated;
grant execute on function public.ndv_niyam_reserve(uuid, int, numeric, numeric) to service_role;
grant execute on function public.ndv_niyam_settle(uuid, numeric, boolean) to service_role;
grant execute on function public.ndv_kenny_month_spend() to service_role;
revoke all on function public.ndv_niyam_left(int) from public, anon;
grant execute on function public.ndv_niyam_left(int) to authenticated;
revoke all on function public.ndv_niyam_month_summary() from public, anon;
grant execute on function public.ndv_niyam_month_summary() to authenticated;
