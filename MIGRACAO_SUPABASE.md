# Migração do Neon para Supabase - SEMA Landing Page

## ✅ O que foi feito

### 1. Criação do arquivo de configuração Supabase
- **Arquivo**: `lib/database/supabase.ts`
- **Funções criadas**:
  - `getUserByEmail()` - Buscar usuário por email
  - `createUser()` - Criar novo usuário
  - `getAllUsers()` - Listar todos os usuários
  - `updateUser()` - Atualizar usuário
  - `deleteUser()` - Deletar usuário
  - `getNewsPosts()` - Buscar posts de notícias
  - `createNewsPost()` - Criar novo post
  - `updateNewsPost()` - Atualizar post
  - `deleteNewsPost()` - Deletar post
  - `getSiteSettings()` - Buscar configurações
  - `updateSiteSetting()` - Atualizar configuração
  - `testConnection()` - Testar conexão

### 2. Script SQL para criar tabelas
- **Arquivo**: `supabase-setup.sql`
- **Tabelas criadas**:
  - `admin_users` - Usuários administradores
  - `news_posts` - Posts/notícias do blog
  - `site_settings` - Configurações do site
- **Recursos incluídos**:
  - Triggers para `updated_at`
  - Índices para performance
  - Row Level Security (RLS)
  - Políticas de segurança
  - Dados padrão inseridos
  - Usuário admin criado automaticamente

### 3. APIs atualizadas
- ✅ `app/api/admin/settings/route.ts`
- ✅ `app/api/auth/login/route.ts`
- ✅ `app/api/admin/users/route.ts`
- ✅ `app/api/admin/users/[id]/route.ts`
- ✅ `app/api/admin/news/route.ts`
- ✅ `app/api/admin/news/[id]/route.ts`

## 🚀 Próximos passos

### 1. Configurar variáveis de ambiente no Netlify

No painel do Netlify, vá em **Site settings > Environment variables** e adicione:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-publica
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role

# JWT (mantenha o mesmo)
JWT_SECRET=seu-jwt-secret
```

### 2. Executar o script SQL no Supabase

1. Acesse o painel do Supabase
2. Vá em **SQL Editor**
3. Cole o conteúdo do arquivo `supabase-setup.sql`
4. Execute o script

### 3. Testar a aplicação

Após configurar as variáveis de ambiente:

1. Faça deploy no Netlify
2. Teste o login admin:
   - **Email**: `admin@sema.org.br`
   - **Senha**: `admin123`
3. Verifique se todas as funcionalidades estão funcionando

## 📋 Credenciais padrão

### Usuário Admin
- **Email**: `admin@sema.org.br`
- **Senha**: `admin123`
- **Role**: `super_admin`

### Configurações padrão
O script já insere todas as configurações padrão do site, incluindo:
- Informações da organização
- Dados de contato
- Configurações do site
- SEO e redes sociais

## 🔧 Estrutura do banco

### Tabela `admin_users`
```sql
- id (uuid, primary key)
- email (text, unique)
- full_name (text)
- role (text: 'admin' | 'super_admin')
- password_hash (text)
- created_at (timestamp)
- updated_at (timestamp)
```

### Tabela `news_posts`
```sql
- id (uuid, primary key)
- title (text)
- content (text)
- excerpt (text)
- featured_image (text)
- slug (text, unique)
- status (text: 'draft' | 'published' | 'archived')
- author_id (uuid, foreign key)
- created_at (timestamp)
- updated_at (timestamp)
- published_at (timestamp)
```

### Tabela `site_settings`
```sql
- id (uuid, primary key)
- setting_key (text, unique)
- setting_value (text)
- setting_type (text: 'text' | 'boolean' | 'json')
- description (text)
- category (text)
- created_at (timestamp)
- updated_at (timestamp)
```

## 🧹 Limpeza (após confirmar que tudo funciona)

Após testar e confirmar que tudo está funcionando, você pode:

1. **Deletar arquivos do Neon**:
   - `lib/database/neon.ts`
   - `scripts/` (todos os arquivos .sql)
   - `create_settings_table.sql`
   - `update_database_media.sql`

2. **Atualizar imports** (se houver algum restante):
   - Procurar por `@/lib/database/neon` e substituir por `@/lib/database/supabase`

## ⚠️ Importante

- **Backup**: Certifique-se de que não há dados importantes no Neon antes de deletar
- **Testes**: Teste todas as funcionalidades antes de fazer a limpeza
- **Variáveis**: Mantenha as variáveis de ambiente seguras
- **RLS**: O Supabase usa Row Level Security, que é mais seguro que o Neon

## 🆘 Suporte

Se encontrar algum problema:

1. Verifique as variáveis de ambiente
2. Confirme que o script SQL foi executado completamente
3. Verifique os logs do Netlify
4. Teste a conexão com o Supabase no painel

---

**Status**: ✅ Migração concluída - Pronto para configuração e testes
