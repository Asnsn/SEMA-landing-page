-- Script para criar usuário admin no Supabase
-- Execute este script no SQL Editor do Supabase
-- IMPORTANTE: Execute primeiro o script "criar-tabela-admin-users.sql"

-- 1. Verificar se a tabela admin_users existe
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_name = 'admin_users' 
            AND table_schema = 'public'
        ) 
        THEN '✅ Tabela admin_users EXISTE' 
        ELSE '❌ Tabela admin_users NÃO EXISTE - Execute primeiro criar-tabela-admin-users.sql' 
    END as status_tabela;

-- 2. Limpar usuário admin existente (se houver)
DELETE FROM public.admin_users WHERE email = 'admin@sema.org.br';

-- 3. Criar usuário admin com senha hash bcrypt
-- Senha: admin123
-- Hash bcrypt: $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO public.admin_users (
    email,
    full_name,
    role,
    password_hash,
    created_at,
    updated_at
) VALUES (
    'admin@sema.org.br',
    'Administrador SEMA',
    'super_admin',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    NOW(),
    NOW()
);

-- 4. Verificar se o usuário foi criado
SELECT 
    id,
    email,
    full_name,
    role,
    CASE 
        WHEN password_hash LIKE '$2a$%' THEN '✅ Hash bcrypt válido'
        ELSE '❌ Hash inválido'
    END as status_hash,
    created_at
FROM public.admin_users
WHERE email = 'admin@sema.org.br';

-- 5. Confirmar credenciais
SELECT 
    '🎉 USUÁRIO ADMIN CRIADO COM SUCESSO!' as status,
    '📧 Email: admin@sema.org.br' as email,
    '🔑 Senha: admin123' as senha,
    '👤 Role: super_admin' as role;
