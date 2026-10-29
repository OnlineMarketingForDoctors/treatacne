-- Supabase's automatic-RLS event trigger helper should not be callable over the API
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;

-- Staff = listed in staff_members AND signed in with two-factor (aal2).
-- Lives in a private schema so it is not exposed through the API.
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

create function private.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.staff_members where user_id = (select auth.uid()))
     and coalesce((select auth.jwt() ->> 'aal'), '') = 'aal2';
$$;
revoke execute on function private.is_staff() from public, anon;
grant execute on function private.is_staff() to authenticated;

create policy "Staff can read submissions"
  on public.submissions for select to authenticated
  using ((select private.is_staff()));

create policy "Staff can update submission status"
  on public.submissions for update to authenticated
  using ((select private.is_staff()))
  with check ((select private.is_staff()));

create policy "Staff can record their own access"
  on public.submission_access_log for insert to authenticated
  with check ((select private.is_staff()) and user_id = (select auth.uid()));

create policy "Staff can read the access log"
  on public.submission_access_log for select to authenticated
  using ((select private.is_staff()));

create policy "Staff can read submission files"
  on storage.objects for select to authenticated
  using (bucket_id = 'submissions' and (select private.is_staff()));
