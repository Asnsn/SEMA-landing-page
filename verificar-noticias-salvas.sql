-- Script para verificar se as notícias foram salvas no banco
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar todas as notícias na tabela
SELECT 
    id,
    title,
    slug,
    status,
    author_id,
    created_at,
    updated_at
FROM public.news_posts 
ORDER BY created_at DESC;

-- 2. Contar total de notícias
SELECT 
    COUNT(*) as total_noticias,
    COUNT(CASE WHEN status = 'published' THEN 1 END) as noticias_publicadas,
    COUNT(CASE WHEN status = 'draft' THEN 1 END) as rascunhos,
    COUNT(CASE WHEN status = 'archived' THEN 1 END) as arquivadas
FROM public.news_posts;

-- 3. Verificar notícias por status
SELECT 
    status,
    COUNT(*) as quantidade
FROM public.news_posts 
GROUP BY status
ORDER BY status;

-- 4. Verificar a notícia mais recente
SELECT 
    id,
    title,
    slug,
    status,
    author_id,
    created_at,
    updated_at,
    CASE 
        WHEN author_id = '13a874dc-b22d-4013-b903-a29747c208dd' THEN '✅ ID do admin correto'
        ELSE '❌ ID do admin incorreto'
    END as status_author_id
FROM public.news_posts 
ORDER BY created_at DESC 
LIMIT 1;

-- 5. Verificar se há notícias com o slug 'teste'
SELECT 
    id,
    title,
    slug,
    status,
    created_at
FROM public.news_posts 
WHERE slug = 'teste'
ORDER BY created_at DESC;
