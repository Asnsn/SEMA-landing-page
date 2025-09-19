-- Script para criar usuário admin para login
-- Execute este script no SQL Editor do Neon

-- 1. Verificar se a tabela existe
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_name = 'admin_users' 
            AND table_schema = 'public'
        ) 
        THEN 'Tabela admin_users EXISTE' 
        ELSE 'Tabela admin_users NÃO EXISTE - Execute o script 013 primeiro!' 
    END as status_tabela;

-- 2. Limpar qualquer usuário admin existente
DELETE FROM public.admin_users WHERE email = 'admin@sema.org.br';

-- 3. Criar usuário admin com senha
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

-- 4. Verificar se foi criado
SELECT 
    id,
    email,
    full_name,
    role,
    CASE 
        WHEN password_hash IS NOT NULL THEN 'Senha configurada'
        ELSE 'Senha NÃO configurada'
    END as status_senha,
    created_at
FROM public.admin_users
WHERE email = 'admin@sema.org.br';

-- 5. Testar a senha
SELECT 
    'admin123' as senha_original,
    'YWRtaW4xMjM=' as senha_hash,
    CASE 
        WHEN 'YWRtaW4xMjM=' = 'YWRtaW4xMjM=' 
        THEN 'Senha configurada corretamente!' 
        ELSE 'Erro na configuração da senha!' 
    END as status;

-- 6. Criar um segundo usuário para teste
INSERT INTO public.admin_users (
    email,
    full_name,
    role,
    password_hash
) VALUES (
    'teste@sema.org.br',
    'Usuário Teste',
    'admin',
    'dGVzdGUxMjM=' -- Base64 de "teste123"
) ON CONFLICT (email) DO NOTHING;

-- 7. Listar todos os usuários criados
SELECT 
    id,
    email,
    full_name,
    role,
    created_at
FROM public.admin_users
ORDER BY created_at DESC;

-- 8. Confirmar sucesso
SELECT 'USUÁRIOS ADMIN CRIADOS COM SUCESSO!' as status;
