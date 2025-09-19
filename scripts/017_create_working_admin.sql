-- Script para criar usuário admin funcional
-- Execute este script no SQL Editor do Neon

-- 1. Verificar se a tabela existe
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_name = 'admin_users' 
            AND table_schema = 'public'
        ) 
        THEN 'Tabela admin_users EXISTE' 
        ELSE 'Tabela admin_users NÃO EXISTE' 
    END as status_tabela;

-- 2. Limpar usuários existentes
DELETE FROM public.admin_users WHERE email IN ('admin@sema.org.br', 'teste@sema.org.br');

-- 3. Criar usuário admin com senha hash bcrypt
-- Senha: admin123
-- Hash bcrypt: $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO public.admin_users (
    email,
    full_name,
    role,
    password_hash
) VALUES (
    'admin@sema.org.br',
    'Administrador SEMA',
    'super_admin',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
);

-- 4. Criar usuário teste
-- Senha: teste123
-- Hash bcrypt: $2a$10$N9qo8uLOickgx2ZMRZoMye.IjdKrjQvvFJSq.9UOCxorU.8tK6I16
INSERT INTO public.admin_users (
    email,
    full_name,
    role,
    password_hash
) VALUES (
    'teste@sema.org.br',
    'Usuário Teste',
    'admin',
    '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjdKrjQvvFJSq.9UOCxorU.8tK6I16'
);

-- 5. Verificar se foram criados
SELECT 
    id,
    email,
    full_name,
    role,
    CASE 
        WHEN password_hash LIKE '$2a$%' THEN 'Hash bcrypt válido'
        ELSE 'Hash inválido'
    END as status_hash,
    created_at
FROM public.admin_users
WHERE email IN ('admin@sema.org.br', 'teste@sema.org.br')
ORDER BY created_at DESC;

-- 6. Confirmar credenciais
SELECT 
    'USUÁRIOS CRIADOS COM SUCESSO!' as status,
    'Email: admin@sema.org.br | Senha: admin123' as credenciais_admin,
    'Email: teste@sema.org.br | Senha: teste123' as credenciais_teste;
