-- Script para criar usuário admin no sistema de autenticação do Supabase
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar se a tabela auth.users existe (sistema nativo do Supabase)
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_name = 'users' 
            AND table_schema = 'auth'
        ) 
        THEN '✅ Tabela auth.users EXISTE' 
        ELSE '❌ Tabela auth.users NÃO EXISTE' 
    END as status_auth_table;

-- 2. Verificar se já existe usuário admin no sistema de autenticação
SELECT 
    id,
    email,
    created_at,
    email_confirmed_at,
    last_sign_in_at
FROM auth.users 
WHERE email = 'admin@sema.org.br';

-- 3. Se não existir, vamos criar o usuário admin
-- NOTA: Para criar usuários no Supabase Auth, você deve usar a interface web ou API
-- Este script apenas verifica se existe

-- 4. Verificar se a tabela admin_users tem a estrutura correta para Supabase Auth
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'admin_users' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 5. Atualizar a tabela admin_users para trabalhar com Supabase Auth
-- Remover a coluna password_hash já que não precisamos mais
ALTER TABLE public.admin_users DROP COLUMN IF EXISTS password_hash;

-- 6. Adicionar coluna para referenciar o usuário do Supabase Auth
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id);

-- 7. Verificar estrutura final
SELECT 
    '🎉 ESTRUTURA ATUALIZADA PARA SUPABASE AUTH!' as status,
    '📧 Email: admin@sema.org.br' as email,
    '🔑 Senha: admin123' as senha,
    '👤 Role: super_admin' as role;
