-- Shop waitlist: email addresses only, kept apart from patient submissions.
-- Written by the server (secret key) only; staff with two-factor can read it.
create table public.shop_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (char_length(email) <= 200),
  consented_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.shop_waitlist enable row level security;
revoke all on public.shop_waitlist from anon, authenticated;
grant select on public.shop_waitlist to authenticated;

create policy "staff can read the waitlist" on public.shop_waitlist
  for select to authenticated using (private.is_staff());
