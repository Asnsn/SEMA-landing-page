-- Script para testar a senha do usuário admin
-- Execute este script no SQL Editor do Supabase

-- 1. Buscar o hash da senha do usuário admin
SELECT 
    email,
    password_hash,
    'Hash armazenado no banco' as descricao
FROM public.admin_users 
WHERE email = 'admin@sema.org.br';

-- 2. Testar se conseguimos fazer login com bcrypt
-- (Este é apenas para verificar o formato do hash)
SELECT 
    email,
    CASE 
        WHEN password_hash LIKE '$2a$10$%' THEN '✅ Formato bcrypt correto ($2a$10$)'
        WHEN password_hash LIKE '$2b$%' THEN '✅ Formato bcrypt correto ($2b$)'
        WHEN password_hash LIKE '$2y$%' THEN '✅ Formato bcrypt correto ($2y$)'
        ELSE '❌ Formato de hash incorreto'
    END as formato_hash,
    LENGTH(password_hash) as tamanho_hash
FROM public.admin_users 
WHERE email = 'admin@sema.org.br';
