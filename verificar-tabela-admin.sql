-- Script para verificar a estrutura da tabela admin_users
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar estrutura da tabela
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'admin_users' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Verificar dados do usuário admin
SELECT 
    id,
    email,
    full_name,
    role,
    password_hash,
    created_at,
    updated_at
FROM public.admin_users
WHERE email = 'admin@sema.org.br';

-- 3. Verificar se a coluna password_hash existe e tem dados
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'admin_users' 
            AND column_name = 'password_hash'
            AND table_schema = 'public'
        ) 
        THEN '✅ Coluna password_hash EXISTE' 
        ELSE '❌ Coluna password_hash NÃO EXISTE' 
    END as status_password_hash;

-- 4. Verificar se a coluna role existe
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'admin_users' 
            AND column_name = 'role'
            AND table_schema = 'public'
        ) 
        THEN '✅ Coluna role EXISTE' 
        ELSE '❌ Coluna role NÃO EXISTE' 
    END as status_role;
