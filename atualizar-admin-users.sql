-- Script para atualizar a tabela admin_users com o usuário criado no Supabase Auth
-- Execute este script no SQL Editor do Supabase APÓS criar o usuário na interface

-- 1. Verificar se o usuário foi criado no Supabase Auth
SELECT 
    id,
    email,
    created_at,
    email_confirmed_at
FROM auth.users 
WHERE email = 'admin@sema.org.br';

-- 2. Atualizar a tabela admin_users com o ID do usuário do Supabase Auth
-- Substitua 'USER_ID_AQUI' pelo ID que apareceu na consulta acima
UPDATE public.admin_users 
SET 
    auth_user_id = (SELECT id FROM auth.users WHERE email = 'admin@sema.org.br'),
    role = 'super_admin',
    full_name = 'Administrador SEMA',
    updated_at = NOW()
WHERE email = 'admin@sema.org.br';

-- 3. Se não existir na tabela admin_users, inserir
INSERT INTO public.admin_users (
    email,
    full_name,
    role,
    auth_user_id,
    created_at,
    updated_at
)
SELECT 
    'admin@sema.org.br',
    'Administrador SEMA',
    'super_admin',
    id,
    NOW(),
    NOW()
FROM auth.users 
WHERE email = 'admin@sema.org.br'
ON CONFLICT (email) DO UPDATE SET
    auth_user_id = EXCLUDED.auth_user_id,
    role = EXCLUDED.role,
    full_name = EXCLUDED.full_name,
    updated_at = NOW();

-- 4. Verificar se foi atualizado corretamente
SELECT 
    au.id,
    au.email,
    au.full_name,
    au.role,
    au.auth_user_id,
    au.created_at,
    au.updated_at
FROM public.admin_users au
WHERE au.email = 'admin@sema.org.br';

-- 5. Confirmar sucesso
SELECT 
    '🎉 USUÁRIO ADMIN CONFIGURADO COM SUCESSO!' as status,
    '📧 Email: admin@sema.org.br' as email,
    '🔑 Senha: admin123' as senha,
    '👤 Role: super_admin' as role;
