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
    const { filename, mimeType } = JSON.parse(event.body)

    // Simular upload bem-sucedido
    // Em produção, você implementaria upload real para Cloudinary, AWS S3, etc.
    const mockUrl = `https://via.placeholder.com/800x600/cccccc/666666?text=${encodeURIComponent(filename || 'imagem')}`
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        url: mockUrl,
        filename: filename || 'imagem.jpg',
        mimeType: mimeType || 'image/jpeg',
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
