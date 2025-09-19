-- Script para corrigir a tabela admin_users
-- Execute este script no SQL Editor do Neon

-- 1. Verificar a estrutura atual da tabela
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'admin_users' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Verificar constraints existentes
SELECT 
    tc.constraint_name, 
    tc.constraint_type,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.table_name = 'admin_users' 
AND tc.table_schema = 'public';

-- 3. Remover a foreign key constraint se existir
DO $$ 
BEGIN
    -- Tentar remover a constraint se ela existir
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'admin_users_id_fkey' 
        AND table_name = 'admin_users'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.admin_users DROP CONSTRAINT admin_users_id_fkey;
        RAISE NOTICE 'Foreign key constraint admin_users_id_fkey removida';
    ELSE
        RAISE NOTICE 'Foreign key constraint admin_users_id_fkey não encontrada';
    END IF;
END $$;

-- 4. Verificar se a constraint foi removida
SELECT 
    tc.constraint_name, 
    tc.constraint_type
FROM information_schema.table_constraints AS tc 
WHERE tc.table_name = 'admin_users' 
AND tc.table_schema = 'public'
AND tc.constraint_type = 'FOREIGN KEY';

-- 5. Testar inserção de um registro
INSERT INTO public.admin_users (
    id,
    email,
    full_name,
    role,
    created_at,
    updated_at
) VALUES (
    gen_random_uuid(),
    'teste@sema.org.br',
    'Usuário Teste',
    'admin',
    timezone('utc'::text, now()),
    timezone('utc'::text, now())
) ON CONFLICT (id) DO NOTHING;

-- 6. Verificar se o registro foi inserido
SELECT 
    id,
    email,
    full_name,
    role,
    created_at
FROM public.admin_users
WHERE email = 'teste@sema.org.br';

-- 7. Limpar o registro de teste
DELETE FROM public.admin_users WHERE email = 'teste@sema.org.br';

-- 8. Confirmar que a tabela está funcionando
SELECT 'Tabela admin_users corrigida com sucesso!' as status;
