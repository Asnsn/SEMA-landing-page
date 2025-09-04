-- Criar tabela de usuários admin
create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text default 'admin' check (role in ('admin', 'super_admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS
alter table public.admin_users enable row level security;

-- Políticas RLS para admin_users
create policy "Admin users can view their own data"
  on public.admin_users for select
  using (auth.uid() = id);

create policy "Admin users can update their own data"
  on public.admin_users for update
  using (auth.uid() = id);

-- Apenas super_admin pode inserir novos admins
create policy "Super admin can insert new admins"
  on public.admin_users for insert
  with check (
    exists (
      select 1 from public.admin_users 
      where id = auth.uid() and role = 'super_admin'
    )
  );

-- Trigger para atualizar updated_at
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create trigger admin_users_updated_at
  before update on public.admin_users
  for each row
  execute function public.handle_updated_at();
