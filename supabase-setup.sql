-- Script para configurar o banco de dados Supabase
-- Execute este script no SQL Editor do Supabase

-- 1. Criar tabela de usuários admin
CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text,
  role text DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  password_hash text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Criar tabela de notícias/posts
CREATE TABLE IF NOT EXISTS public.news_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  featured_image text,
  slug text UNIQUE NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author_id uuid NOT NULL REFERENCES public.admin_users(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  published_at timestamp with time zone
);

-- 3. Criar tabela de configurações do site
CREATE TABLE IF NOT EXISTS public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value text,
  setting_type text DEFAULT 'text' CHECK (setting_type IN ('text', 'boolean', 'json')),
  description text,
  category text DEFAULT 'general',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$;

-- 5. Triggers para updated_at
CREATE TRIGGER admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER news_posts_updated_at
  BEFORE UPDATE ON public.news_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 6. Índices para performance
CREATE INDEX IF NOT EXISTS admin_users_email_idx ON public.admin_users(email);
CREATE INDEX IF NOT EXISTS news_posts_status_idx ON public.news_posts(status);
CREATE INDEX IF NOT EXISTS news_posts_published_at_idx ON public.news_posts(published_at);
CREATE INDEX IF NOT EXISTS news_posts_slug_idx ON public.news_posts(slug);
CREATE INDEX IF NOT EXISTS site_settings_key_idx ON public.site_settings(setting_key);
CREATE INDEX IF NOT EXISTS site_settings_category_idx ON public.site_settings(category);

-- 7. Habilitar RLS (Row Level Security)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 8. Políticas RLS para admin_users
CREATE POLICY "Admin users can view all data"
  ON public.admin_users FOR SELECT
  USING (true);

CREATE POLICY "Admin users can insert data"
  ON public.admin_users FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin users can update data"
  ON public.admin_users FOR UPDATE
  USING (true);

CREATE POLICY "Admin users can delete data"
  ON public.admin_users FOR DELETE
  USING (true);

-- 9. Políticas RLS para news_posts
-- Qualquer pessoa pode ver posts publicados
CREATE POLICY "Anyone can view published posts"
  ON public.news_posts FOR SELECT
  USING (status = 'published');

-- Admins podem ver todos os posts
CREATE POLICY "Admins can view all posts"
  ON public.news_posts FOR SELECT
  USING (true);

-- Admins podem inserir posts
CREATE POLICY "Admins can insert posts"
  ON public.news_posts FOR INSERT
  WITH CHECK (true);

-- Admins podem atualizar posts
CREATE POLICY "Admins can update posts"
  ON public.news_posts FOR UPDATE
  USING (true);

-- Admins podem deletar posts
CREATE POLICY "Admins can delete posts"
  ON public.news_posts FOR DELETE
  USING (true);

-- 10. Políticas RLS para site_settings
CREATE POLICY "Anyone can view settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert settings"
  ON public.site_settings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update settings"
  ON public.site_settings FOR UPDATE
  USING (true);

CREATE POLICY "Admins can delete settings"
  ON public.site_settings FOR DELETE
  USING (true);

-- 11. Inserir configurações padrão
INSERT INTO public.site_settings (setting_key, setting_value, setting_type, description, category) VALUES
-- Informações da Organização
('org_name', 'SEMA - Sociedade Esportiva e Musical de Hortolândia', 'text', 'Nome da organização', 'organization'),
('org_description', 'Transformando vidas através do esporte e da cultura em Hortolândia há mais de 15 anos.', 'text', 'Descrição da organização', 'organization'),
('org_website', 'https://institutosema.org.br', 'text', 'Website da organização', 'organization'),

-- Informações de Contato
('contact_email', 'contato@sema.org.br', 'text', 'E-mail de contato', 'contact'),
('contact_phone', '+55 (19) 98917-8896', 'text', 'Telefone de contato', 'contact'),
('contact_address', 'Rua Lidia Lopes Moreira, 278\nHortolândia - SP\nCEP: 13184-696 - Jd Carmen Cristina', 'text', 'Endereço completo', 'contact'),

-- Configurações do Site
('site_maintenance', 'false', 'boolean', 'Modo de manutenção do site', 'site'),
('news_comments', 'true', 'boolean', 'Permitir comentários nas notícias', 'site'),
('newsletter_enabled', 'false', 'boolean', 'Sistema de newsletter ativo', 'site'),

-- SEO e Redes Sociais
('meta_title', 'SEMA - Sociedade Esportiva e Musical de Hortolândia', 'text', 'Título da página para SEO', 'seo'),
('meta_description', 'Transformando vidas através do esporte e da cultura em Hortolândia. Ballet, futebol, capoeira e muito mais!', 'text', 'Descrição para SEO', 'seo'),
('facebook_url', '', 'text', 'URL do Facebook', 'social'),
('instagram_url', '', 'text', 'URL do Instagram', 'social')
ON CONFLICT (setting_key) DO NOTHING;

-- 12. Criar usuário admin padrão
-- Senha: admin123
-- Hash bcrypt: $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO public.admin_users (
    email,
    full_name,
    role,
    password_hash
) VALUES (
    'admin@sema.org.br',
    'Administrador SEMA',
    'super_admin',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
) ON CONFLICT (email) DO NOTHING;

-- 13. Verificar se tudo foi criado corretamente
SELECT 'TABELAS CRIADAS:' as status;
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('admin_users', 'news_posts', 'site_settings');

SELECT 'USUÁRIO ADMIN CRIADO:' as status;
SELECT email, full_name, role FROM public.admin_users WHERE email = 'admin@sema.org.br';

SELECT 'CONFIGURAÇÕES INSERIDAS:' as status;
SELECT setting_key, setting_value, category FROM public.site_settings ORDER BY category, setting_key;
