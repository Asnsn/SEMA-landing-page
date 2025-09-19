-- Script para verificar se o usuário admin foi criado corretamente
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar se a tabela admin_users existe
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_name = 'admin_users' 
            AND table_schema = 'public'
        ) 
        THEN '✅ Tabela admin_users EXISTE' 
        ELSE '❌ Tabela admin_users NÃO EXISTE' 
    END as status_tabela;

-- 2. Verificar quantos usuários existem
SELECT 
    COUNT(*) as total_usuarios,
    'Total de usuários na tabela' as descricao
FROM public.admin_users;

-- 3. Verificar se o usuário admin existe
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM public.admin_users WHERE email = 'admin@sema.org.br')
        THEN '✅ Usuário admin@sema.org.br EXISTE'
        ELSE '❌ Usuário admin@sema.org.br NÃO EXISTE'
    END as status_usuario;

-- 4. Mostrar dados do usuário admin (se existir)
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

-- 5. Se o usuário não existir, criar novamente
INSERT INTO public.admin_users (
    email,
    full_name,
    role,
    password_hash
) VALUES (
    'admin@sema.org.br',
    'Administrador SEMA',
    'super_admin',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
) ON CONFLICT (email) DO UPDATE SET
    password_hash = EXCLUDED.password_hash,
    role = EXCLUDED.role,
    updated_at = NOW();

-- 6. Verificar novamente após inserção
SELECT 
    'USUÁRIO VERIFICADO/CRIADO:' as status,
    email,
    full_name,
    role,
    CASE 
        WHEN password_hash LIKE '$2a$%' THEN 'Hash bcrypt válido'
        ELSE 'Hash inválido'
    END as status_hash
FROM public.admin_users 
WHERE email = 'admin@sema.org.br';
