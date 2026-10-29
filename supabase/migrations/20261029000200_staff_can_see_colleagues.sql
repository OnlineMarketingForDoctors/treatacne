-- Lets verified staff see colleagues' names (for the "who viewed this" log)
create policy "Staff can see colleagues"
  on public.staff_members for select to authenticated
  using ((select private.is_staff()));
