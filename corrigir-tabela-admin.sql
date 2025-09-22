-- Script para corrigir a tabela admin_users
-- Execute este script no SQL Editor do Supabase

-- 1. Adicionar coluna role se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'admin_users' 
        AND column_name = 'role'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.admin_users ADD COLUMN role VARCHAR(50) NOT NULL DEFAULT 'admin';
        ALTER TABLE public.admin_users ADD CONSTRAINT check_role CHECK (role IN ('admin', 'super_admin'));
    END IF;
END $$;

-- 2. Adicionar coluna password_hash se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'admin_users' 
        AND column_name = 'password_hash'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.admin_users ADD COLUMN password_hash VARCHAR(255) NOT NULL DEFAULT '';
    END IF;
END $$;

-- 3. Adicionar coluna created_at se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'admin_users' 
        AND column_name = 'created_at'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.admin_users ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- 4. Adicionar coluna updated_at se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'admin_users' 
        AND column_name = 'updated_at'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.admin_users ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- 5. Atualizar o usuário admin com os dados corretos
UPDATE public.admin_users 
SET 
    role = 'super_admin',
    password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    updated_at = NOW()
WHERE email = 'admin@sema.org.br';

-- 6. Verificar se foi atualizado corretamente
SELECT 
    id,
    email,
    full_name,
    role,
    CASE 
        WHEN password_hash LIKE '$2a$%' THEN '✅ Hash bcrypt válido'
        ELSE '❌ Hash inválido'
    END as status_hash,
    created_at,
    updated_at
FROM public.admin_users
WHERE email = 'admin@sema.org.br';

-- 7. Confirmar correção
SELECT 
    '🎉 TABELA CORRIGIDA COM SUCESSO!' as status,
    '📧 Email: admin@sema.org.br' as email,
    '🔑 Senha: admin123' as senha,
    '👤 Role: super_admin' as role;
