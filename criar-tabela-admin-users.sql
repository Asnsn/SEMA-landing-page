-- Script para criar a tabela admin_users no Supabase
-- Execute este script no SQL Editor do Supabase

-- 1. Criar a tabela admin_users
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'super_admin')),
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON public.admin_users(role);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 4. Criar política de segurança (apenas para service role)
CREATE POLICY "Service role can manage admin users" ON public.admin_users
    FOR ALL USING (auth.role() = 'service_role');

-- 5. Verificar se a tabela foi criada
SELECT 
    '✅ Tabela admin_users criada com sucesso!' as status,
    COUNT(*) as total_usuarios
FROM public.admin_users;

-- 6. Mostrar estrutura da tabela
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'admin_users' 
AND table_schema = 'public'
ORDER BY ordinal_position;
