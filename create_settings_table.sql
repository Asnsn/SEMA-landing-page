-- Script para criar tabela de configurações do site
-- Execute este script no SQL Editor do Neon

-- 1. Criar tabela de configurações
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

-- 2. Função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.handle_settings_updated_at()
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

-- 3. Trigger para updated_at
CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_settings_updated_at();

-- 4. Índices para performance
CREATE INDEX IF NOT EXISTS site_settings_key_idx ON public.site_settings(setting_key);
CREATE INDEX IF NOT EXISTS site_settings_category_idx ON public.site_settings(category);

-- 5. Habilitar RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 6. Políticas RLS
CREATE POLICY "Admins can view all settings"
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

-- 7. Inserir configurações padrão
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

-- 8. Verificar se as configurações foram inseridas
SELECT setting_key, setting_value, setting_type, category 
FROM public.site_settings 
ORDER BY category, setting_key;
