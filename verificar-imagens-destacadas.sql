-- Script para verificar se as notícias têm imagens destacadas
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar todas as notícias e seus campos de imagem
SELECT 
    id,
    title,
    slug,
    status,
    featured_image,
    CASE 
        WHEN featured_image IS NOT NULL AND featured_image != '' THEN '✅ Tem imagem'
        ELSE '❌ Sem imagem'
    END as status_imagem,
    created_at
FROM public.news_posts 
ORDER BY created_at DESC;

-- 2. Verificar especificamente a notícia "teste"
SELECT 
    id,
    title,
    slug,
    status,
    featured_image,
    media_files,
    CASE 
        WHEN featured_image IS NOT NULL AND featured_image != '' THEN '✅ Tem imagem destacada'
        ELSE '❌ Sem imagem destacada'
    END as status_imagem_destacada,
    CASE 
        WHEN media_files IS NOT NULL AND jsonb_array_length(media_files) > 0 THEN '✅ Tem arquivos de mídia'
        ELSE '❌ Sem arquivos de mídia'
    END as status_media_files
FROM public.news_posts 
WHERE slug = 'teste'
ORDER BY created_at DESC;

-- 3. Contar notícias com e sem imagem
SELECT 
    COUNT(*) as total_noticias,
    COUNT(CASE WHEN featured_image IS NOT NULL AND featured_image != '' THEN 1 END) as com_imagem,
    COUNT(CASE WHEN featured_image IS NULL OR featured_image = '' THEN 1 END) as sem_imagem
FROM public.news_posts;

-- 4. Verificar se há notícias com media_files
SELECT 
    id,
    title,
    media_files,
    jsonb_array_length(media_files) as quantidade_arquivos
FROM public.news_posts 
WHERE media_files IS NOT NULL 
AND jsonb_array_length(media_files) > 0;
