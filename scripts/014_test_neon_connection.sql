-- Script para testar a conexão com o Neon
-- Execute este script no SQL Editor do Neon

-- 1. Verificar se a tabela admin_users existe
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_name = 'admin_users' 
            AND table_schema = 'public'
        ) 
        THEN 'Tabela admin_users EXISTE' 
        ELSE 'Tabela admin_users NÃO EXISTE' 
    END as status_tabela;

-- 2. Verificar estrutura da tabela
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'admin_users' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Verificar se existe o usuário admin@sema.org.br
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE email = 'admin@sema.org.br'
        ) 
        THEN 'Usuário admin@sema.org.br EXISTE' 
        ELSE 'Usuário admin@sema.org.br NÃO EXISTE' 
    END as status_usuario;

-- 4. Listar todos os usuários (se existirem)
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
ORDER BY created_at DESC;

-- 5. Testar inserção de um usuário de teste (se não existir)
INSERT INTO public.admin_users (
    email,
    full_name,
    role,
    password_hash
) VALUES (
    'teste@exemplo.com',
    'Usuário Teste',
    'admin',
    'dGVzdGUxMjM=' -- Base64 de "teste123"
) ON CONFLICT (email) DO NOTHING;

-- 6. Verificar se o usuário de teste foi inserido
SELECT 
    id,
    email,
    full_name,
    role,
    created_at
FROM public.admin_users
WHERE email = 'teste@exemplo.com';

-- 7. Limpar o usuário de teste
DELETE FROM public.admin_users WHERE email = 'teste@exemplo.com';

-- 8. Confirmar que está funcionando
SELECT 'CONEXÃO COM NEON FUNCIONANDO PERFEITAMENTE!' as status;
