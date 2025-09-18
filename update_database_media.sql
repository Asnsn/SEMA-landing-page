-- Script para atualizar banco de dados para suportar múltiplas mídias
-- Execute este script no SQL Editor do Neon

-- 1. Adicionar coluna para mídias (JSON array)
ALTER TABLE public.news_posts 
ADD COLUMN media_files jsonb DEFAULT '[]'::jsonb;

-- 2. Adicionar coluna para tipo de mídia principal
ALTER TABLE public.news_posts 
ADD COLUMN featured_media_type text DEFAULT 'image' CHECK (featured_media_type IN ('image', 'video'));

-- 3. Criar tabela para gerenciar uploads
CREATE TABLE IF NOT EXISTS public.media_uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  original_name text NOT NULL,
  file_type text NOT NULL,
  file_size bigint NOT NULL,
  mime_type text NOT NULL,
  url text NOT NULL,
  thumbnail_url text,
  uploaded_by uuid REFERENCES public.admin_users(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Habilitar RLS na nova tabela
ALTER TABLE public.media_uploads ENABLE ROW LEVEL SECURITY;

-- 5. Políticas RLS para media_uploads
CREATE POLICY "Admins can view all media uploads"
  ON public.media_uploads FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert media uploads"
  ON public.media_uploads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update their own media uploads"
  ON public.media_uploads FOR UPDATE
  USING (true);

CREATE POLICY "Admins can delete their own media uploads"
  ON public.media_uploads FOR DELETE
  USING (true);

-- 6. Índices para performance
CREATE INDEX IF NOT EXISTS media_uploads_file_type_idx ON public.media_uploads(file_type);
CREATE INDEX IF NOT EXISTS media_uploads_uploaded_by_idx ON public.media_uploads(uploaded_by);
CREATE INDEX IF NOT EXISTS media_uploads_created_at_idx ON public.media_uploads(created_at);
