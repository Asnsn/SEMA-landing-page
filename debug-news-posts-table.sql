-- Script para debugar a tabela news_posts
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar estrutura completa da tabela
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    character_maximum_length
FROM information_schema.columns 
WHERE table_name = 'news_posts' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Verificar se as colunas JSONB existem
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'news_posts' 
            AND column_name = 'media_files'
            AND data_type = 'jsonb'
            AND table_schema = 'public'
        ) 
        THEN '✅ Coluna media_files (JSONB) EXISTE' 
        ELSE '❌ Coluna media_files (JSONB) NÃO EXISTE' 
    END as status_media_files;

-- 3. Verificar se a coluna featured_media_type existe
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

-- 4. Verificar se a coluna published_at existe
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'news_posts' 
            AND column_name = 'published_at'
            AND table_schema = 'public'
        ) 
        THEN '✅ Coluna published_at EXISTE' 
        ELSE '❌ Coluna published_at NÃO EXISTE' 
    END as status_published_at;

-- 5. Testar inserção de dados de exemplo
INSERT INTO public.news_posts (
    title,
    content,
    excerpt,
    featured_image,
    slug,
    status,
    author_id,
    media_files,
    featured_media_type,
    published_at,
    created_at,
    updated_at
) VALUES (
    'Teste de Notícia',
    'Conteúdo de teste',
    'Resumo de teste',
    'https://exemplo.com/imagem.jpg',
    'teste-noticia',
    'draft',
    '13a874dc-b22d-4013-b903-a29747c208dd',
    '[]'::jsonb,
    'image',
    NULL,
    NOW(),
    NOW()
) RETURNING id, title, slug;

-- 6. Verificar se a inserção funcionou
SELECT 
    id,
    title,
    slug,
    status,
    media_files,
    featured_media_type,
    created_at
FROM public.news_posts 
WHERE slug = 'teste-noticia';

-- 7. Limpar dados de teste
DELETE FROM public.news_posts WHERE slug = 'teste-noticia';

-- 8. Confirmar limpeza
SELECT 
    '🧹 DADOS DE TESTE REMOVIDOS' as status,
    '✅ ESTRUTURA DA TABELA VERIFICADA' as estrutura;
