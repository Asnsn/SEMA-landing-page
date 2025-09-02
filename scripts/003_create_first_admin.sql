-- Este script deve ser executado após criar o primeiro usuário admin manualmente
-- Substitua 'seu-email@exemplo.com' pelo email do admin principal

-- Inserir primeiro admin (execute após criar conta via auth)
-- IMPORTANTE: Execute este script apenas após criar a conta de admin via interface de signup
-- e confirmar o email

-- Exemplo de como inserir o primeiro admin:
-- insert into public.admin_users (id, email, full_name, role)
-- select id, email, 'Administrador SEMA', 'super_admin'
-- from auth.users 
-- where email = 'seu-email@exemplo.com'
-- on conflict (id) do nothing;

-- Para usar este script, descomente as linhas acima e substitua o email
