create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'parent' check (role in ('parent', 'admin')),
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id bigserial primary key,
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  status text not null default 'active' check (status in ('active', 'paused', 'canceled')),
  plan text not null default 'basic' check (plan in ('basic', 'standard', 'premium')),
  monthly_points int not null default 80,
  renewal_date date not null default (current_date + interval '1 month')
);

create table if not exists public.points_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('allocation', 'reservation', 'refund', 'penalty')),
  amount int not null,
  reference_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.toys (
  id bigserial primary key,
  name text not null,
  description text not null,
  age_min_months int not null,
  age_max_months int not null,
  points_cost int not null,
  tags text[] not null default '{}',
  image_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.toy_units (
  id bigserial primary key,
  toy_id bigint not null references public.toys(id) on delete cascade,
  status text not null default 'available' check (status in ('available', 'reserved', 'shipped', 'in_use', 'returned', 'cleaning', 'retired')),
  condition text not null default 'good' check (condition in ('new', 'good', 'worn', 'damaged')),
  last_cleaned_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.rentals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  toy_unit_id bigint not null references public.toy_units(id) on delete restrict,
  status text not null check (status in ('reserved', 'shipped', 'active', 'return_requested', 'returned', 'lost')),
  created_at timestamptz not null default now(),
  due_date timestamptz not null,
  returned_at timestamptz
);

create index if not exists idx_points_transactions_user_created on public.points_transactions(user_id, created_at desc);
create index if not exists idx_toy_units_toy_status on public.toy_units(toy_id, status);
create index if not exists idx_rentals_user_created on public.rentals(user_id, created_at desc);
create index if not exists idx_rentals_status on public.rentals(status);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;

  insert into public.subscriptions (user_id, status, plan, monthly_points, renewal_date)
  values (new.id, 'active', 'basic', 80, current_date + interval '1 month')
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p where p.id = uid and p.role = 'admin'
  );
$$;

create or replace view public.toys_with_availability as
select
  t.id,
  t.name,
  t.description,
  t.age_min_months,
  t.age_max_months,
  t.points_cost,
  t.tags,
  t.image_url,
  count(tu.id) filter (where tu.status = 'available')::int as available_units
from public.toys t
left join public.toy_units tu on tu.toy_id = t.id
group by t.id;

create or replace function public.reserve_toy(p_toy_id bigint)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid;
  v_unit_id bigint;
  v_cost int;
  v_balance int;
  v_rental_id uuid;
begin
  v_user := auth.uid();
  if v_user is null then
    raise exception 'Not authenticated';
  end if;

  if not exists (select 1 from public.profiles where id = v_user and role = 'parent') then
    raise exception 'Only parents can reserve toys';
  end if;

  select points_cost into v_cost from public.toys where id = p_toy_id;
  if v_cost is null then
    raise exception 'Toy not found';
  end if;

  select coalesce(sum(amount), 0)::int into v_balance
  from public.points_transactions
  where user_id = v_user;

  if v_balance < v_cost then
    raise exception 'Insufficient points';
  end if;

  select id into v_unit_id
  from public.toy_units
  where toy_id = p_toy_id and status = 'available'
  order by id
  for update skip locked
  limit 1;

  if v_unit_id is null then
    raise exception 'No available units';
  end if;

  insert into public.rentals (user_id, toy_unit_id, status, due_date)
  values (v_user, v_unit_id, 'reserved', now() + interval '30 days')
  returning id into v_rental_id;

  update public.toy_units
  set status = 'reserved'
  where id = v_unit_id;

  insert into public.points_transactions (user_id, type, amount, reference_id)
  values (v_user, 'reservation', -v_cost, v_rental_id::text);

  return v_rental_id;
end;
$$;

create or replace function public.request_rental_return(p_rental_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid;
begin
  v_user := auth.uid();
  if v_user is null then
    raise exception 'Not authenticated';
  end if;

  update public.rentals
  set status = 'return_requested'
  where id = p_rental_id
    and user_id = v_user
    and status in ('reserved', 'shipped', 'active');

  if not found then
    raise exception 'Rental not eligible for return request';
  end if;
end;
$$;

create or replace function public.admin_mark_rental_returned(p_rental_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid;
  v_unit_id bigint;
begin
  v_user := auth.uid();
  if v_user is null or not public.is_admin(v_user) then
    raise exception 'Admin access required';
  end if;

  update public.rentals
  set status = 'returned', returned_at = now()
  where id = p_rental_id
    and status in ('return_requested', 'active', 'shipped', 'reserved')
  returning toy_unit_id into v_unit_id;

  if v_unit_id is null then
    raise exception 'Rental not found or invalid state';
  end if;

  update public.toy_units
  set status = 'cleaning'
  where id = v_unit_id;
end;
$$;

alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.points_transactions enable row level security;
alter table public.toys enable row level security;
alter table public.toy_units enable row level security;
alter table public.rentals enable row level security;

create policy "profiles select self or admin" on public.profiles
for select using (auth.uid() = id or public.is_admin(auth.uid()));

create policy "profiles update self or admin" on public.profiles
for update using (auth.uid() = id or public.is_admin(auth.uid()));

create policy "profiles insert self" on public.profiles
for insert with check (auth.uid() = id or public.is_admin(auth.uid()));

create policy "subscriptions select own or admin" on public.subscriptions
for select using (auth.uid() = user_id or public.is_admin(auth.uid()));

create policy "subscriptions manage admin" on public.subscriptions
for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

create policy "points select own or admin" on public.points_transactions
for select using (auth.uid() = user_id or public.is_admin(auth.uid()));

create policy "points insert admin" on public.points_transactions
for insert with check (public.is_admin(auth.uid()));

create policy "points update admin" on public.points_transactions
for update using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

create policy "toys public read" on public.toys
for select using (true);

create policy "toys admin write" on public.toys
for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

create policy "toy_units public read" on public.toy_units
for select using (true);

create policy "toy_units admin write" on public.toy_units
for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

create policy "rentals select own or admin" on public.rentals
for select using (auth.uid() = user_id or public.is_admin(auth.uid()));

create policy "rentals admin write" on public.rentals
for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

grant usage on schema public to anon, authenticated;
grant select on public.toys to anon, authenticated;
grant select on public.toys_with_availability to anon, authenticated;
grant execute on function public.reserve_toy(bigint) to authenticated;
grant execute on function public.request_rental_return(uuid) to authenticated;
grant execute on function public.admin_mark_rental_returned(uuid) to authenticated;
