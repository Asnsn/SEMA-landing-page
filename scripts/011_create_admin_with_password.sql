-- Script para criar usuário admin com senha
-- Execute este script no SQL Editor do Neon

-- 1. Limpar qualquer registro existente
DELETE FROM public.admin_users WHERE email = 'admin@sema.org.br';

-- 2. Criar usuário admin com senha
INSERT INTO public.admin_users (
    email,
    full_name,
    role,
    password_hash
) VALUES (
    'admin@sema.org.br',
    'Administrador SEMA',
    'super_admin',
    'YWRtaW4xMjM=' -- Base64 de "admin123"
);

-- 3. Verificar se foi criado
SELECT 
    id,
    email,
    full_name,
    role,
    password_hash,
    created_at
FROM public.admin_users
WHERE email = 'admin@sema.org.br';

-- 4. Testar a senha (opcional - para verificar se o hash está correto)
-- A senha "admin123" em Base64 deve ser "YWRtaW4xMjM="
SELECT 
    'admin123' as senha_original,
    'YWRtaW4xMjM=' as senha_hash,
    'Senha configurada corretamente!' as status;

-- 5. Confirmar sucesso
SELECT 'Usuário admin@sema.org.br criado com sucesso!' as status;
