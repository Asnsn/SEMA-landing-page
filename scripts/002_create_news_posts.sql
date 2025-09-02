-- Criar tabela de notícias/posts
create table if not exists public.news_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  excerpt text,
  featured_image text,
  slug text unique not null,
  status text default 'draft' check (status in ('draft', 'published', 'archived')),
  author_id uuid not null references public.admin_users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  published_at timestamp with time zone
);

-- Habilitar RLS
alter table public.news_posts enable row level security;

-- Políticas RLS para news_posts
-- Qualquer pessoa pode ver posts publicados
create policy "Anyone can view published posts"
  on public.news_posts for select
  using (status = 'published');

-- Admins podem ver todos os posts
create policy "Admins can view all posts"
  on public.news_posts for select
  using (
    exists (
      select 1 from public.admin_users 
      where id = auth.uid()
    )
  );

-- Admins podem inserir posts
create policy "Admins can insert posts"
  on public.news_posts for insert
  with check (
    exists (
      select 1 from public.admin_users 
      where id = auth.uid()
    ) and author_id = auth.uid()
  );

-- Admins podem atualizar seus próprios posts
create policy "Admins can update their own posts"
  on public.news_posts for update
  using (
    exists (
      select 1 from public.admin_users 
      where id = auth.uid()
    ) and author_id = auth.uid()
  );

-- Super admins podem atualizar qualquer post
create policy "Super admins can update any post"
  on public.news_posts for update
  using (
    exists (
      select 1 from public.admin_users 
      where id = auth.uid() and role = 'super_admin'
    )
  );

-- Admins podem deletar seus próprios posts
create policy "Admins can delete their own posts"
  on public.news_posts for delete
  using (
    exists (
      select 1 from public.admin_users 
      where id = auth.uid()
    ) and author_id = auth.uid()
  );

-- Super admins podem deletar qualquer post
create policy "Super admins can delete any post"
  on public.news_posts for delete
  using (
    exists (
      select 1 from public.admin_users 
      where id = auth.uid() and role = 'super_admin'
    )
  );

-- Trigger para atualizar updated_at
create trigger news_posts_updated_at
  before update on public.news_posts
  for each row
  execute function public.handle_updated_at();

-- Índices para performance
create index if not exists news_posts_status_idx on public.news_posts(status);
create index if not exists news_posts_published_at_idx on public.news_posts(published_at);
create index if not exists news_posts_slug_idx on public.news_posts(slug);
