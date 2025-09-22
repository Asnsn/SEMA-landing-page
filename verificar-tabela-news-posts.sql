-- Script para verificar e atualizar a estrutura da tabela news_posts
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar estrutura atual da tabela news_posts
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'news_posts' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Verificar se as colunas necessárias existem
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'news_posts' 
            AND column_name = 'media_files'
            AND table_schema = 'public'
        ) 
        THEN '✅ Coluna media_files EXISTE' 
        ELSE '❌ Coluna media_files NÃO EXISTE' 
    END as status_media_files;

SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'news_posts' 
            AND column_name = 'featured_media_type'
            AND table_schema = 'public'
        ) 
        THEN '✅ Coluna featured_media_type EXISTE' 
        ELSE '❌ Coluna featured_media_type NÃO EXISTE' 
    END as status_featured_media_type;

-- 3. Adicionar colunas que estão faltando
ALTER TABLE public.news_posts 
ADD COLUMN IF NOT EXISTS media_files JSONB DEFAULT '[]'::jsonb;

ALTER TABLE public.news_posts 
ADD COLUMN IF NOT EXISTS featured_media_type VARCHAR(20) DEFAULT 'image';

-- 4. Verificar estrutura final
SELECT 
    '🎉 ESTRUTURA DA TABELA news_posts ATUALIZADA!' as status,
    '📝 Colunas adicionadas: media_files, featured_media_type' as colunas_adicionadas;
