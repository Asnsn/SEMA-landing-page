# Configuração de Variáveis de Ambiente

## Variáveis Necessárias

Para que o sistema de gerenciamento de administradores funcione corretamente, você precisa configurar as seguintes variáveis de ambiente:

### 1. Variáveis Básicas do Supabase
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
\`\`\`

### 2. Chave de Serviço do Supabase (NOVA)
\`\`\`env
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
\`\`\`

## Como Obter a Service Role Key

1. **Acesse o Dashboard do Supabase**
2. **Vá para Settings > API**
3. **Copie a "service_role" key** (não a "anon" key)
4. **Adicione no seu arquivo .env.local**

## ⚠️ IMPORTANTE

- **A Service Role Key é sensível** - nunca a exponha no frontend
- **Use apenas em operações server-side** ou com o cliente admin
- **Mantenha-a segura** - ela tem acesso total ao seu banco

## Configuração no Netlify

1. **Vá para Site Settings > Environment Variables**
2. **Adicione as variáveis:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. **Redeploy o site**

## Teste

Após configurar as variáveis, você poderá:
- ✅ Criar novos administradores com senha
- ✅ Fazer login com as credenciais criadas
- ✅ Gerenciar usuários administrativos
