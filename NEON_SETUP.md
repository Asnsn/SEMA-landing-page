# Configuração do Neon Database

## ✅ Neon Conectado via Netlify

Se você já conectou o Neon via Netlify (como mostrado na imagem), as variáveis de ambiente já estão configuradas automaticamente:

- `NETLIFY_DATABASE_URL` - Connection string principal
- `NETLIFY_DATABASE_URL_UNPOOLED` - Connection string sem pool

## Configuração Local (Desenvolvimento)

Para desenvolvimento local, você pode configurar:

### 1. Variável do Banco de Dados (Opcional)
\`\`\`env
DATABASE_URL=postgresql://username:password@ep-xxxxx.us-east-1.aws.neon.tech/neondb?sslmode=require
\`\`\`

## Como Obter a Connection String (se necessário)

1. **Acesse o Dashboard do Neon**
2. **Vá para o seu projeto**
3. **Clique em "Connection Details"**
4. **Copie a "Connection String"**
5. **Adicione no seu arquivo `.env.local`**

## ✅ Configuração no Netlify (Já Feita)

Se você conectou o Neon via Netlify, as variáveis já estão configuradas:
- ✅ `NETLIFY_DATABASE_URL` - Configurada automaticamente
- ✅ `NETLIFY_DATABASE_URL_UNPOOLED` - Configurada automaticamente

## Exemplo de Connection String

\`\`\`
postgresql://neondb_owner:abc123@ep-cool-name-123456.us-east-1.aws.neon.tech/neondb?sslmode=require
\`\`\`

## ⚠️ IMPORTANTE

- **Mantenha a connection string segura** - nunca a exponha publicamente
- **Use SSL** - sempre inclua `?sslmode=require` na URL
- **Teste a conexão** após configurar

## Teste da Conexão

Após configurar, você pode testar a conexão acessando:
- `/api/auth/login` - para testar login
- `/admin/usuarios/novo` - para criar usuários

## Estrutura da Tabela

Certifique-se de que a tabela `admin_users` existe com a estrutura:

\`\`\`sql
CREATE TABLE admin_users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL UNIQUE,
    full_name text,
    role text DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    password_hash text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
\`\`\`
