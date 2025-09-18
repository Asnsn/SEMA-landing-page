-- Script para corrigir notícias existentes que não têm slug
-- Execute este script no SQL Editor do Neon

-- 1. Verificar notícias sem slug
SELECT id, title, slug 
FROM public.news_posts 
WHERE slug IS NULL OR slug = '';

-- 2. Atualizar notícias sem slug (gerar slug baseado no título)
UPDATE public.news_posts 
SET slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(
      REGEXP_REPLACE(title, '[áàâãä]', 'a', 'g'),
      '[éèêë]', 'e', 'g'
    ),
    '[^a-z0-9\s-]', '', 'g'
  )
)
WHERE slug IS NULL OR slug = '';

-- 3. Substituir espaços por hífens e remover hífens duplicados
UPDATE public.news_posts 
SET slug = REGEXP_REPLACE(
  REGEXP_REPLACE(TRIM(slug), '\s+', '-', 'g'),
  '-+', '-', 'g'
)
WHERE slug IS NOT NULL;

-- 4. Verificar se todas as notícias agora têm slug
SELECT id, title, slug 
FROM public.news_posts 
ORDER BY created_at DESC;
