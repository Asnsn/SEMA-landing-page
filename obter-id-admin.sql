-- Script para obter o ID do usuário admin
-- Execute este script no SQL Editor do Supabase

-- 1. Buscar o ID do usuário admin
SELECT 
    id,
    email,
    full_name,
    role
FROM public.admin_users 
WHERE email = 'admin@sema.org.br';

-- 2. Se não existir, buscar na tabela auth.users
SELECT 
    id,
    email,
    created_at
FROM auth.users 
WHERE email = 'admin@sema.org.br';

-- 3. Mostrar o ID para usar na API
SELECT 
    '📋 COPIE O ID ABAIXO PARA USAR NA API:' as instrucao,
    COALESCE(
        (SELECT id FROM public.admin_users WHERE email = 'admin@sema.org.br'),
        (SELECT id FROM auth.users WHERE email = 'admin@sema.org.br'),
        '00000000-0000-0000-0000-000000000001'
    ) as admin_user_id;
