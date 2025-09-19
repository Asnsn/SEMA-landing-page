-- Script para testar o sistema de login
-- Execute este script no Neon para verificar se tudo está funcionando

-- 1. Verificar se a tabela admin_users existe e tem a estrutura correta
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'admin_users' 
ORDER BY ordinal_position;

-- 2. Verificar se existem usuários na tabela
SELECT 
    id,
    email,
    full_name,
    role,
    created_at,
    CASE 
        WHEN password_hash IS NOT NULL THEN 'Senha definida'
        ELSE 'Sem senha'
    END as password_status
FROM admin_users
ORDER BY created_at DESC;

-- 3. Testar a busca por email específico
SELECT 
    id,
    email,
    full_name,
    role,
    password_hash,
    created_at
FROM admin_users 
WHERE email = 'admin@sema.org.br';

-- 4. Verificar se a senha está sendo hashada corretamente
-- A senha 'admin123' em base64 deve ser: YWRtaW4xMjM=
SELECT 
    'admin123' as senha_original,
    encode('admin123'::bytea, 'base64') as senha_base64,
    password_hash as senha_armazenada,
    CASE 
        WHEN password_hash = encode('admin123'::bytea, 'base64') THEN 'Senha correta'
        ELSE 'Senha incorreta'
    END as status_senha
FROM admin_users 
WHERE email = 'admin@sema.org.br';

-- 5. Verificar conexão e permissões
SELECT 
    current_database() as database_atual,
    current_user as usuario_atual,
    version() as versao_postgres;

-- 6. Testar inserção de um usuário de teste (se necessário)
-- Descomente as linhas abaixo se precisar criar um usuário de teste
/*
INSERT INTO admin_users (email, full_name, role, password_hash)
VALUES (
    'teste@sema.org.br',
    'Usuário Teste',
    'admin',
    encode('teste123'::bytea, 'base64')
)
ON CONFLICT (email) DO NOTHING;

SELECT 'Usuário de teste criado' as resultado;
*/
