-- Script para criar um usuário administrador de teste
-- Execute este script no SQL Editor do Neon

-- 1. Inserir um usuário administrador de teste
-- NOTA: Você precisará substituir o UUID por um ID real de usuário do Supabase Auth
INSERT INTO public.admin_users (
  id,
  email,
  full_name,
  role,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(), -- Substitua por um UUID real do Supabase Auth
  'admin@sema.org.br',
  'Administrador SEMA',
  'super_admin',
  timezone('utc'::text, now()),
  timezone('utc'::text, now())
) ON CONFLICT (id) DO NOTHING;

-- 2. Verificar se o usuário foi criado
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.admin_users
WHERE email = 'admin@sema.org.br';

-- 3. Listar todos os administradores
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.admin_users
ORDER BY created_at DESC;
