const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Função para ler o arquivo JSON
function lerArquivoJson(nomeArquivo) {
  const filePath = path.join(__dirname, nomeArquivo);
  try {
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Erro ao ler o arquivo ${nomeArquivo}:`, error.message);
    return [];
  }
}
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Função para escrever no arquivo JSON
function escreverArquivoJson(nomeArquivo, dados) {
  const filePath = path.join(__dirname, nomeArquivo);
  fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));
}

// Função para obter a lista de produtos
app.get('/produtos', (req, res) => {
  const produtos = lerArquivoJson('db.json');
  res.json(produtos);
});

// Função para adicionar um novo produto
app.post('/produtos', (req, res) => {
  const produtos = lerArquivoJson('db.json');

  // Lógica para criar um novo produto
  const novoProduto = { id: produtos.length + 1, nome: 'Novo Produto', categoria: 'Eletrônicos' };
  produtos.push(novoProduto);

  // Escreve os produtos atualizados de volta no arquivo db.json
  escreverArquivoJson('db.json', produtos);

  res.status(201).json(novoProduto);
});

// Função para configurar o Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sua API Node.js',
      version: '1.0.0',
      description: 'Descrição da sua API',
    },
  },
  apis: ['openapi.yaml'],
};

const openapiSpecification = swaggerJsdoc(options);

// Middleware para servir a documentação Swagger
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(openapiSpecification));

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
