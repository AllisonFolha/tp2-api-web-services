const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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

// Função para escrever no arquivo JSON
function escreverArquivoJson(nomeArquivo, dados) {
  const filePath = path.join(__dirname, nomeArquivo);
  fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));
}

// Rota para obter a lista de usuários
app.get('/usuarios', (req, res) => {
  const usuarios = lerArquivoJson('db.json');
  res.json(usuarios);
});

// Rota para obter um usuário específico
app.get('/usuarios/:id', (req, res) => {
  const usuarios = lerArquivoJson('db.json');
  const usuarioId = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === usuarioId);

  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }
});

// Rota para criar um novo usuário
app.post('/usuarios', (req, res) => {
  const usuarios = lerArquivoJson('db.json');

  // Lógica para criar um novo usuário (ajuste conforme necessário)
  const novoUsuario = { id: usuarios.length + 1, nome_usuario: req.body.nome_usuario, email: req.body.email, playlists: [] };
  usuarios.push(novoUsuario);

  // Escreve os usuários atualizados de volta no arquivo db.json
  escreverArquivoJson('db.json', usuarios);

  res.status(201).json(novoUsuario);
});

// Rota para atualizar um usuário existente
app.put('/usuarios/:id', (req, res) => {
  const usuarios = lerArquivoJson('db.json');
  const usuarioId = parseInt(req.params.id);
  const usuarioIndex = usuarios.findIndex(u => u.id === usuarioId);

  if (usuarioIndex !== -1) {
    // Lógica para atualizar um usuário (ajuste conforme necessário)
    usuarios[usuarioIndex].nome_usuario = req.body.nome_usuario;

    // Escreve os usuários atualizados de volta no arquivo db.json
    escreverArquivoJson('db.json', usuarios);

    res.json({ mensagem: 'Usuário atualizado com sucesso', usuario: usuarios[usuarioIndex] });
  } else {
    res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }
});

// Rota para excluir um usuário
app.delete('/usuarios/:id', (req, res) => {
  const usuarios = lerArquivoJson('db.json');
  const usuarioId = parseInt(req.params.id);
  const usuarioIndex = usuarios.findIndex(u => u.id === usuarioId);

  if (usuarioIndex !== -1) {
    // Lógica para excluir um usuário (ajuste conforme necessário)
    usuarios.splice(usuarioIndex, 1);

    // Escreve os usuários atualizados de volta no arquivo db.json
    escreverArquivoJson('db.json', usuarios);

    res.status(204).send();
  } else {
    res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }
});

// Configuração do Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Plataforma de Streaming de Música API',
      version: '1.0.0',
      description: 'Uma API para gerenciar músicas, playlists, artistas e usuários.',
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
