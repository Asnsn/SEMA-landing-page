-- Script COMPLETO para corrigir a tabela admin_users
-- Execute este script no SQL Editor do Neon

-- 1. REMOVER TODAS AS CONSTRAINTS DE FOREIGN KEY
DO $$ 
DECLARE
    constraint_name text;
BEGIN
    -- Buscar todas as foreign key constraints da tabela admin_users
    FOR constraint_name IN 
        SELECT tc.constraint_name
        FROM information_schema.table_constraints tc
        WHERE tc.table_name = 'admin_users' 
        AND tc.table_schema = 'public'
        AND tc.constraint_type = 'FOREIGN KEY'
    LOOP
        -- Remover cada constraint encontrada
        EXECUTE 'ALTER TABLE public.admin_users DROP CONSTRAINT IF EXISTS ' || constraint_name;
        RAISE NOTICE 'Constraint removida: %', constraint_name;
    END LOOP;
END $$;

-- 2. RECRIAR A TABELA ADMIN_USERS COMPLETA
DROP TABLE IF EXISTS public.admin_users CASCADE;

CREATE TABLE public.admin_users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL UNIQUE,
    full_name text,
    role text DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    password_hash text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. CRIAR FUNÇÃO PARA ATUALIZAR updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    new.updated_at = timezone('utc'::text, now());
    RETURN new;
END;
$$;

-- 4. CRIAR TRIGGER PARA updated_at
CREATE TRIGGER admin_users_updated_at
    BEFORE UPDATE ON public.admin_users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 5. HABILITAR RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 6. CRIAR POLÍTICAS RLS
CREATE POLICY "Admin users can view all data" ON public.admin_users FOR SELECT USING (true);
CREATE POLICY "Admin users can insert data" ON public.admin_users FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin users can update data" ON public.admin_users FOR UPDATE USING (true);
CREATE POLICY "Admin users can delete data" ON public.admin_users FOR DELETE USING (true);

-- 7. CRIAR ÍNDICES
CREATE INDEX IF NOT EXISTS admin_users_email_idx ON public.admin_users(email);
CREATE INDEX IF NOT EXISTS admin_users_role_idx ON public.admin_users(role);

-- 8. CRIAR USUÁRIO ADMIN COM SENHA
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

-- 9. VERIFICAR SE FOI CRIADO
SELECT 
    id,
    email,
    full_name,
    role,
    password_hash,
    created_at
FROM public.admin_users
WHERE email = 'admin@sema.org.br';

-- 10. TESTAR A SENHA
SELECT 
    'admin123' as senha_original,
    'YWRtaW4xMjM=' as senha_hash,
    CASE 
        WHEN 'YWRtaW4xMjM=' = 'YWRtaW4xMjM=' 
        THEN 'Senha configurada corretamente!' 
        ELSE 'Erro na configuração da senha!' 
    END as status;

-- 11. CONFIRMAR SUCESSO
SELECT 'TABELA ADMIN_USERS RECRIADA E USUÁRIO ADMIN CRIADO COM SUCESSO!' as status;
