-- Script para configurar Supabase Auth + tabelas customizadas
-- Execute este script no SQL Editor do Supabase

-- 1. Limpar tabelas antigas (se existirem)
DROP TABLE IF EXISTS public.news_posts CASCADE;
DROP TABLE IF EXISTS public.admin_users CASCADE;
DROP TABLE IF EXISTS public.site_settings CASCADE;

-- 2. Criar tabela de perfis de usuário (extensão de auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  role text DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Criar tabela de notícias/posts
CREATE TABLE IF NOT EXISTS public.news_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  featured_image text,
  slug text UNIQUE NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  published_at timestamp with time zone
);

-- 4. Criar tabela de configurações do site
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

-- 5. Função para atualizar updated_at
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

-- 6. Triggers para updated_at
CREATE TRIGGER user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
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

-- 7. Função para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'admin');
  RETURN NEW;
END;
$$;

-- 8. Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 9. Índices para performance
CREATE INDEX IF NOT EXISTS user_profiles_role_idx ON public.user_profiles(role);
CREATE INDEX IF NOT EXISTS news_posts_status_idx ON public.news_posts(status);
CREATE INDEX IF NOT EXISTS news_posts_published_at_idx ON public.news_posts(published_at);
CREATE INDEX IF NOT EXISTS news_posts_slug_idx ON public.news_posts(slug);
CREATE INDEX IF NOT EXISTS site_settings_key_idx ON public.site_settings(setting_key);
CREATE INDEX IF NOT EXISTS site_settings_category_idx ON public.site_settings(category);

-- 10. Habilitar RLS (Row Level Security)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 11. Políticas RLS para user_profiles
CREATE POLICY "Users can view their own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.user_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- 12. Políticas RLS para news_posts
-- Qualquer pessoa pode ver posts publicados
CREATE POLICY "Anyone can view published posts"
  ON public.news_posts FOR SELECT
  USING (status = 'published');

-- Usuários autenticados podem ver todos os posts
CREATE POLICY "Authenticated users can view all posts"
  ON public.news_posts FOR SELECT
  USING (auth.role() = 'authenticated');

-- Admins podem inserir posts
CREATE POLICY "Admins can insert posts"
  ON public.news_posts FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    ) AND
    author_id = auth.uid()
  );

-- Admins podem atualizar posts
CREATE POLICY "Admins can update posts"
  ON public.news_posts FOR UPDATE
  USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Admins podem deletar posts
CREATE POLICY "Admins can delete posts"
  ON public.news_posts FOR DELETE
  USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- 13. Políticas RLS para site_settings
CREATE POLICY "Anyone can view settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage settings"
  ON public.site_settings FOR ALL
  USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- 14. Inserir configurações padrão
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

-- 15. Criar usuário admin via Supabase Auth (execute manualmente no painel)
-- Vá em Authentication > Users > Add user
-- Email: admin@sema.org.br
-- Password: admin123
-- User metadata: {"full_name": "Administrador SEMA", "role": "super_admin"}

-- 16. Verificar se tudo foi criado corretamente
SELECT 'TABELAS CRIADAS:' as status;
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('user_profiles', 'news_posts', 'site_settings');

SELECT 'CONFIGURAÇÕES INSERIDAS:' as status;
SELECT setting_key, setting_value, category FROM public.site_settings ORDER BY category, setting_key;

SELECT 'PRÓXIMO PASSO:' as status;
SELECT 'Criar usuário admin@sema.org.br no painel Authentication > Users' as instrucao;
