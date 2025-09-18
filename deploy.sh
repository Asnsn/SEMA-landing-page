#!/bin/bash

# Script de Deploy para VPS
# Uso: ./deploy.sh

echo "🚀 Iniciando deploy do SEMA Landing Page..."

# Parar aplicação
pm2 stop sema-landing

# Ir para diretório do projeto
cd /var/www/sema

# Atualizar código
git pull origin main

# Instalar dependências
pnpm install

# Fazer build
pnpm run build

# Reiniciar aplicação
pm2 restart sema-landing

echo "✅ Deploy concluído!"
echo "📊 Status da aplicação:"
pm2 status
