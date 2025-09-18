const { createClient } = require('@supabase/supabase-js')

exports.handler = async (event, context) => {
  // Configurar CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const { file, filename, mimeType } = JSON.parse(event.body)

    // Aqui você pode implementar upload para:
    // 1. Cloudinary
    // 2. AWS S3
    // 3. Netlify Large Media
    // 4. Outro serviço de storage

    // Por enquanto, vamos simular um upload bem-sucedido
    const mockUrl = `https://via.placeholder.com/800x600/cccccc/666666?text=${encodeURIComponent(filename)}`
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        url: mockUrl,
        filename,
        mimeType,
      }),
    }
  } catch (error) {
    console.error('Erro no upload:', error)
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Erro interno do servidor',
        details: error.message 
      }),
    }
  }
}
