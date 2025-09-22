-- Script para configurar o Supabase Storage
-- Execute este script no SQL Editor do Supabase

-- 1. Criar bucket para mídia (se não existir)
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Verificar se o bucket foi criado
SELECT 
    id,
    name,
    public,
    created_at
FROM storage.buckets 
WHERE id = 'media';

-- 3. Criar política para permitir upload de arquivos
CREATE POLICY "Permitir upload de arquivos para mídia" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'media');

-- 4. Criar política para permitir leitura pública de arquivos
CREATE POLICY "Permitir leitura pública de arquivos" ON storage.objects
FOR SELECT USING (bucket_id = 'media');

-- 5. Verificar políticas criadas
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage';

-- 6. Confirmar configuração
SELECT 
    '🎉 SUPABASE STORAGE CONFIGURADO COM SUCESSO!' as status,
    '📁 Bucket: media' as bucket,
    '🔓 Acesso: público' as acesso,
    '📤 Upload: permitido' as upload,
    '📥 Download: público' as download;
