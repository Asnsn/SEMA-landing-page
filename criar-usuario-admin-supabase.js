// Script para criar usuário admin no Supabase Auth
// Execute este script no console do navegador ou como função serverless

const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente do Supabase não configuradas!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function criarUsuarioAdmin() {
  try {
    console.log('🚀 Criando usuário admin no Supabase Auth...');
    
    // Criar usuário no sistema de autenticação do Supabase
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@sema.org.br',
      password: 'admin123',
      email_confirm: true, // Confirmar email automaticamente
      user_metadata: {
        full_name: 'Administrador SEMA',
        role: 'super_admin'
      }
    });

    if (authError) {
      console.error('❌ Erro ao criar usuário no Supabase Auth:', authError.message);
      return;
    }

    console.log('✅ Usuário criado no Supabase Auth:', {
      id: authData.user.id,
      email: authData.user.email,
      created_at: authData.user.created_at
    });

    // Agora criar/atualizar na tabela admin_users
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .upsert({
        email: 'admin@sema.org.br',
        full_name: 'Administrador SEMA',
        role: 'super_admin',
        auth_user_id: authData.user.id,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'email'
      })
      .select()
      .single();

    if (adminError) {
      console.error('❌ Erro ao criar usuário na tabela admin_users:', adminError.message);
      return;
    }

    console.log('✅ Usuário criado na tabela admin_users:', {
      id: adminData.id,
      email: adminData.email,
      role: adminData.role,
      auth_user_id: adminData.auth_user_id
    });

    console.log('🎉 USUÁRIO ADMIN CRIADO COM SUCESSO!');
    console.log('📧 Email: admin@sema.org.br');
    console.log('🔑 Senha: admin123');
    console.log('👤 Role: super_admin');

  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  }
}

// Executar a função
criarUsuarioAdmin();
