-- Script para debugar a tabela admin_users
-- Execute este script no SQL Editor do Neon

-- 1. Verificar estrutura da tabela
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'admin_users' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Verificar se existe o campo password_hash
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'admin_users' 
            AND column_name = 'password_hash'
            AND table_schema = 'public'
        ) 
        THEN 'Campo password_hash EXISTE' 
        ELSE 'Campo password_hash NÃO EXISTE' 
    END as status_campo;

-- 3. Listar todos os registros na tabela
SELECT 
    id,
    email,
    full_name,
    role,
    password_hash,
    created_at
FROM public.admin_users
ORDER BY created_at DESC;

-- 4. Verificar se existe o usuário admin@sema.org.br
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE email = 'admin@sema.org.br'
        ) 
        THEN 'Usuário admin@sema.org.br EXISTE' 
        ELSE 'Usuário admin@sema.org.br NÃO EXISTE' 
    END as status_usuario;

-- 5. Se o campo não existir, criar
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'admin_users' 
        AND column_name = 'password_hash'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.admin_users ADD COLUMN password_hash text;
        RAISE NOTICE 'Campo password_hash adicionado!';
    ELSE
        RAISE NOTICE 'Campo password_hash já existe!';
    END IF;
END $$;

-- 6. Verificar novamente a estrutura
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'admin_users' 
AND table_schema = 'public'
ORDER BY ordinal_position;
