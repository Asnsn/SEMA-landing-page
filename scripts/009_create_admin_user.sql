-- SCRIPT PARA CRIAR USUÁRIO ADMIN COMPLETO
-- Execute este script no SQL Editor do Neon

-- 1. Primeiro, criar o usuário no sistema de autenticação
-- NOTA: Este comando precisa ser executado via API do Supabase, não via SQL
-- Mas vamos preparar o registro na tabela admin_users

-- 2. Limpar qualquer registro existente
DELETE FROM public.admin_users WHERE email = 'admin@sema.org.br';

-- 3. Inserir o registro na tabela admin_users
-- O ID será gerado automaticamente
INSERT INTO public.admin_users (
    email,
    full_name,
    role
) VALUES (
    'admin@sema.org.br',
    'Administrador SEMA',
    'super_admin'
);

-- 4. Verificar se foi inserido
SELECT 
    id,
    email,
    full_name,
    role,
    created_at
FROM public.admin_users
WHERE email = 'admin@sema.org.br';

-- 5. Mostrar instruções
SELECT 'REGISTRO CRIADO! Agora você precisa criar o usuário no Supabase Auth via API.' as status;
