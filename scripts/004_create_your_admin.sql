-- INSTRUÇÕES: Substitua os valores abaixo pelos seus dados reais antes de executar

-- Primeiro, crie o usuário na tabela auth.users (isso simula o cadastro)
-- IMPORTANTE: Substitua 'seu-email@exemplo.com' e 'sua-senha-segura' pelos seus dados
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'arthuroasn@gmail.com', -- MUDE AQUI
  crypt('tutu153750TUTU@', gen_salt('bf')), -- MUDE AQUI
  now(),
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Depois, adicione o usuário como admin na nossa tabela
INSERT INTO public.admin_users (id, email, full_name, role)
SELECT id, email, 'Administrador SEMA', 'super_admin'
FROM auth.users 
WHERE email = 'arthuroasn@gmail.com' -- MUDE AQUI TAMBÉM
ON CONFLICT (id) DO NOTHING;
