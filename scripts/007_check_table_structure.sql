-- Script para verificar e corrigir a estrutura da tabela admin_users
-- Execute este script no SQL Editor do Neon

-- 1. Verificar se a coluna id tem DEFAULT gen_random_uuid()
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'admin_users' 
AND table_schema = 'public'
AND column_name = 'id';

-- 2. Se não tiver DEFAULT, adicionar
DO $$ 
BEGIN
    -- Verificar se a coluna id já tem DEFAULT gen_random_uuid()
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'admin_users' 
        AND table_schema = 'public'
        AND column_name = 'id'
        AND column_default LIKE '%gen_random_uuid%'
    ) THEN
        -- Adicionar DEFAULT gen_random_uuid() à coluna id
        ALTER TABLE public.admin_users 
        ALTER COLUMN id SET DEFAULT gen_random_uuid();
        
        RAISE NOTICE 'DEFAULT gen_random_uuid() adicionado à coluna id';
    ELSE
        RAISE NOTICE 'Coluna id já tem DEFAULT gen_random_uuid()';
    END IF;
END $$;

-- 3. Verificar novamente a estrutura
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'admin_users' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 4. Testar inserção sem especificar ID
INSERT INTO public.admin_users (
    email,
    full_name,
    role
) VALUES (
    'teste2@sema.org.br',
    'Usuário Teste 2',
    'admin'
) ON CONFLICT (email) DO NOTHING;

-- 5. Verificar se foi inserido com ID gerado automaticamente
SELECT 
    id,
    email,
    full_name,
    role,
    created_at
FROM public.admin_users
WHERE email = 'teste2@sema.org.br';

-- 6. Limpar o registro de teste
DELETE FROM public.admin_users WHERE email = 'teste2@sema.org.br';

-- 7. Confirmar que está funcionando
SELECT 'Estrutura da tabela admin_users verificada e corrigida!' as status;
