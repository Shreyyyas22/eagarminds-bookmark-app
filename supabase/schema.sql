create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  handle text unique not null,
  created_at timestamptz default now()
);

alter table profiles
  add constraint handle_format check (handle ~ '^[a-z0-9_]{3,20}$');

create table if not exists bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  url text not null,
  is_public boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table profiles enable row level security;
alter table bookmarks enable row level security;

create policy "profiles_select_public"
  on profiles for select using (true);

create policy "profiles_insert_own"
  on profiles for insert with check (auth.uid() = id);

create policy "profiles_update_own"
  on profiles for update using (auth.uid() = id);

create policy "bookmarks_select"
  on bookmarks for select using (
    auth.uid() = user_id or is_public = true
  );

create policy "bookmarks_insert_own"
  on bookmarks for insert with check (auth.uid() = user_id);

create policy "bookmarks_update_own"
  on bookmarks for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "bookmarks_delete_own"
  on bookmarks for delete using (auth.uid() = user_id);
