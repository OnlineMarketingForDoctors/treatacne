-- Staff who may review submissions (added manually after their auth account is created)
create table public.staff_members (
  user_id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);
alter table public.staff_members enable row level security;

-- Get Started form submissions. Written only by the server (secret key).
create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'uploading'
    check (status in ('uploading', 'new', 'reviewed', 'added_to_xestro')),
  first_name text not null,
  last_name text not null,
  date_of_birth date not null,
  mobile text not null,
  email text,
  under_18 boolean not null default false,
  data jsonb not null,
  files jsonb not null default '[]'::jsonb,
  reviewed_by uuid references auth.users (id),
  reviewed_at timestamptz
);
alter table public.submissions enable row level security;
create index submissions_created_at_idx on public.submissions (created_at desc);
create index submissions_status_idx on public.submissions (status);

-- Who opened which submission, and when
create table public.submission_access_log (
  id bigint generated always as identity primary key,
  submission_id uuid not null references public.submissions (id) on delete cascade,
  user_id uuid not null references auth.users (id),
  action text not null check (action in ('viewed', 'status_changed')),
  at timestamptz not null default now()
);
alter table public.submission_access_log enable row level security;
create index submission_access_log_submission_idx on public.submission_access_log (submission_id);

create policy "Staff can see their own membership"
  on public.staff_members for select to authenticated
  using (user_id = (select auth.uid()));

-- Table privileges (new tables are not exposed automatically in this project)
revoke all on public.staff_members, public.submissions, public.submission_access_log from anon, authenticated;
grant select on public.staff_members to authenticated;
grant select on public.submissions to authenticated;
grant update (status, reviewed_by, reviewed_at) on public.submissions to authenticated;
grant select, insert on public.submission_access_log to authenticated;
grant all on public.staff_members, public.submissions, public.submission_access_log to service_role;

-- Private bucket for photos and referral letters
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'submissions',
  'submissions',
  false,
  15728640,
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf']
);
