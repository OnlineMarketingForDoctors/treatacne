-- Staff roles (admin / nurse) and the blog.

-- 1. Roles. Admins manage users and the blog; nurses only see submissions.
alter table public.staff_members
  add column role text not null default 'nurse' check (role in ('admin', 'nurse'));
update public.staff_members set role = 'admin';

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.staff_members where user_id = (select auth.uid()) and role = 'admin')
     and coalesce((select auth.jwt() ->> 'aal'), '') = 'aal2';
$$;
revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to authenticated;

-- 2. Blog posts. The public can read published posts whose date has arrived.
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 1 and 200),
  excerpt text not null check (char_length(excerpt) between 1 and 400),
  body text not null,
  category text not null default 'Acne basics',
  cover_image text,
  cover_alt text,
  nurse_cta text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  publish_date date not null default current_date,
  last_reviewed date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);

alter table public.blog_posts enable row level security;
grant select on public.blog_posts to anon, authenticated;
grant insert, update, delete on public.blog_posts to authenticated;
grant all on public.blog_posts to service_role;

create policy "public reads published posts" on public.blog_posts
  for select to anon, authenticated
  using (status = 'published' and publish_date <= (now() at time zone 'Australia/Melbourne')::date);
create policy "admins read all posts" on public.blog_posts
  for select to authenticated using (private.is_admin());
create policy "admins add posts" on public.blog_posts
  for insert to authenticated with check (private.is_admin());
create policy "admins edit posts" on public.blog_posts
  for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "admins delete posts" on public.blog_posts
  for delete to authenticated using (private.is_admin());

-- 3. Cover images: a public bucket; only admins can upload or change files.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('blog-images', 'blog-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']);

create policy "admins upload blog images" on storage.objects
  for insert to authenticated with check (bucket_id = 'blog-images' and private.is_admin());
create policy "admins change blog images" on storage.objects
  for update to authenticated using (bucket_id = 'blog-images' and private.is_admin());
create policy "admins delete blog images" on storage.objects
  for delete to authenticated using (bucket_id = 'blog-images' and private.is_admin());
