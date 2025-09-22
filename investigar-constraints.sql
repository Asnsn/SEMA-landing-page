-- Script para investigar constraints e estrutura das tabelas
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar se existe tabela 'users'
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_name = 'users' 
            AND table_schema = 'public'
        ) 
        THEN '✅ Tabela users EXISTE' 
        ELSE '❌ Tabela users NÃO EXISTE' 
    END as status_tabela_users;

-- 2. Verificar constraints da tabela news_posts
SELECT 
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_name = 'news_posts'
    AND tc.table_schema = 'public';

-- 3. Verificar se o ID existe na tabela users (se existir)
SELECT 
    id,
    email,
    created_at
FROM public.users 
WHERE id = '13a874dc-b22d-4013-b903-a29747c208dd'
LIMIT 1;

-- 4. Verificar se o ID existe na tabela admin_users
SELECT 
    id,
    email,
    full_name,
    role
FROM public.admin_users 
WHERE id = '13a874dc-b22d-4013-b903-a29747c208dd'
LIMIT 1;

-- 5. Verificar se o ID existe na tabela auth.users
SELECT 
    id,
    email,
    created_at
FROM auth.users 
WHERE id = '13a874dc-b22d-4013-b903-a29747c208dd'
LIMIT 1;

-- 6. Mostrar estrutura da tabela news_posts
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'news_posts' 
AND table_schema = 'public'
ORDER BY ordinal_position;
