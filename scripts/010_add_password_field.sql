-- Script para adicionar campo de senha na tabela admin_users
-- Execute este script no SQL Editor do Neon

-- 1. Adicionar campo password_hash na tabela admin_users
ALTER TABLE public.admin_users 
ADD COLUMN IF NOT EXISTS password_hash text;

-- 2. Verificar se a coluna foi adicionada
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'admin_users' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Atualizar registros existentes com senha padrão (se houver)
UPDATE public.admin_users 
SET password_hash = 'YWRtaW4xMjM=' -- Base64 de "admin123"
WHERE password_hash IS NULL;

-- 4. Verificar registros atualizados
SELECT 
    id,
    email,
    full_name,
    role,
    password_hash,
    created_at
FROM public.admin_users;

-- 5. Confirmar sucesso
SELECT 'Campo password_hash adicionado com sucesso!' as status;
