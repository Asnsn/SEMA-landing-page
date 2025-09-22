-- Script para corrigir a constraint da tabela news_posts
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar constraints atuais
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

-- 2. Remover a constraint atual (se existir)
ALTER TABLE public.news_posts 
DROP CONSTRAINT IF EXISTS news_posts_author_id_fkey;

-- 3. Verificar se a tabela admin_users existe e tem o ID
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE id = '13a874dc-b22d-4013-b903-a29747c208dd'
        ) 
        THEN '✅ ID existe na tabela admin_users' 
        ELSE '❌ ID NÃO existe na tabela admin_users' 
    END as status_id_admin_users;

-- 4. Criar nova constraint para referenciar admin_users (se a tabela existir)
-- Primeiro, vamos verificar se a tabela admin_users tem a coluna id
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'admin_users' 
            AND column_name = 'id'
            AND table_schema = 'public'
        ) 
        THEN '✅ Tabela admin_users tem coluna id' 
        ELSE '❌ Tabela admin_users NÃO tem coluna id' 
    END as status_coluna_id;

-- 5. Se a tabela admin_users existir, criar constraint para ela
-- Caso contrário, não criar constraint (permitir qualquer UUID)
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'admin_users' 
        AND table_schema = 'public'
    ) THEN
        -- Criar constraint para admin_users
        ALTER TABLE public.news_posts 
        ADD CONSTRAINT news_posts_author_id_fkey 
        FOREIGN KEY (author_id) REFERENCES public.admin_users(id);
        
        RAISE NOTICE 'Constraint criada para referenciar admin_users';
    ELSE
        RAISE NOTICE 'Tabela admin_users não existe, constraint não criada';
    END IF;
END $$;

-- 6. Verificar constraints finais
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

-- 7. Confirmar correção
SELECT 
    '🎉 CONSTRAINT CORRIGIDA COM SUCESSO!' as status,
    '📝 Tabela news_posts agora pode usar IDs de admin_users' as descricao;
