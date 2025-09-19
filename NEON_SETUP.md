# Configuração do Neon Database

## Variáveis de Ambiente Necessárias

Para conectar com o banco Neon, você precisa configurar a seguinte variável:

### 1. Variável do Banco de Dados
```env
DATABASE_URL=postgresql://username:password@ep-xxxxx.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## Como Obter a Connection String

1. **Acesse o Dashboard do Neon**
2. **Vá para o seu projeto**
3. **Clique em "Connection Details"**
4. **Copie a "Connection String"**
5. **Adicione no seu arquivo `.env.local`**

## Configuração no Netlify

1. **Vá para Site Settings > Environment Variables**
2. **Adicione a variável:**
   - **Key:** `DATABASE_URL`
   - **Value:** sua connection string do Neon
3. **Redeploy o site**

## Exemplo de Connection String

```
postgresql://neondb_owner:abc123@ep-cool-name-123456.us-east-1.aws.neon.tech/neondb?sslmode=require
```

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

```sql
CREATE TABLE admin_users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL UNIQUE,
    full_name text,
    role text DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    password_hash text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
```
