// Teste local de login - Execute com: node test-login-local.js
// Não precisa de deploy no Netlify

const https = require('https');

// Função para fazer requisição HTTPS
function makeRequest(url, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: 'institutosema.org.br',
      port: 443,
      path: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(responseData);
          resolve({
            status: res.statusCode,
            data: jsonData
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            data: responseData
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function testLogin() {
  console.log('🔍 Testando sistema de login...\n');
  
  const loginData = {
    email: 'admin@sema.org.br',
    password: 'admin123'
  };

  try {
    // Teste 1: API de conexão
    console.log('1️⃣ Testando conexão com banco...');
    const connectionTest = await makeRequest('/api/test-connection', {});
    console.log('Status:', connectionTest.status);
    console.log('Resposta:', JSON.stringify(connectionTest.data, null, 2));
    console.log('');

    // Teste 2: API de login real
    console.log('2️⃣ Testando API de login real...');
    const loginTest = await makeRequest('/api/auth/login', loginData);
    console.log('Status:', loginTest.status);
    console.log('Resposta:', JSON.stringify(loginTest.data, null, 2));
    console.log('');

    // Teste 3: API de debug
    console.log('3️⃣ Testando API de debug...');
    const debugTest = await makeRequest('/api/debug-login', loginData);
    console.log('Status:', debugTest.status);
    console.log('Resposta:', JSON.stringify(debugTest.data, null, 2));
    console.log('');

    // Análise dos resultados
    console.log('📊 ANÁLISE DOS RESULTADOS:');
    console.log('========================');
    
    if (connectionTest.status === 200 && connectionTest.data.success) {
      console.log('✅ Conexão com banco: OK');
    } else {
      console.log('❌ Conexão com banco: FALHOU');
    }

    if (loginTest.status === 200 && loginTest.data.success) {
      console.log('✅ API de login: OK');
    } else {
      console.log('❌ API de login: FALHOU');
      console.log('   Erro:', loginTest.data.error || 'Erro desconhecido');
    }

    if (debugTest.status === 200 && debugTest.data.success) {
      console.log('✅ API de debug: OK');
    } else {
      console.log('❌ API de debug: FALHOU');
      console.log('   Erro:', debugTest.data.error || 'Erro desconhecido');
    }

  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
  }
}

// Executar teste
testLogin();
