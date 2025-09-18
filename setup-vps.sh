#!/bin/bash

# Script de Configuração Inicial da VPS
# Execute como root: bash setup-vps.sh

echo "🔧 Configurando VPS para SEMA Landing Page..."

# Atualizar sistema
apt update && apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Instalar pnpm
npm install -g pnpm

# Instalar PM2
npm install -g pm2

# Instalar Nginx
apt install nginx -y

# Instalar Git
apt install git -y

# Instalar Certbot
apt install certbot python3-certbot-nginx -y

# Criar diretório do projeto
mkdir -p /var/www/sema
cd /var/www/sema

echo "✅ VPS configurada!"
echo "📝 Próximos passos:"
echo "1. Clone seu repositório: git clone SEU_REPOSITORIO ."
echo "2. Configure as variáveis de ambiente"
echo "3. Execute: pnpm install && pnpm run build"
echo "4. Configure PM2 e Nginx"
