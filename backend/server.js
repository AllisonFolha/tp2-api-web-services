const express = require('express');
const cors = require('cors');
const { validationResult, body, param } = require('express-validator');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Função para ler o conteúdo de um arquivo JSON
function lerArquivoJson(nomeArquivo) {
  // Constrói o caminho para o arquivo utilizando o nome do arquivo fornecido
  const filePath = path.join(__dirname, nomeArquivo);
  try {
    // Tenta ler e obter os dados brutos do arquivo
    const rawData = fs.readFileSync(filePath);
    // Analisa os dados brutos em formato JSON e os retorna
    return JSON.parse(rawData);
  } catch (error) {
    // Em caso de erro ao ler o arquivo, imprime a mensagem de erro e retorna um array vazio
    console.error(`Erro ao ler o arquivo ${nomeArquivo}:`, error.message);
    return [];
  }
}

// Função para escrever dados em um arquivo JSON
function escreverArquivoJson(nomeArquivo, dados) {
  // Constrói o caminho para o arquivo utilizando o nome do arquivo fornecido
  const filePath = path.join(__dirname, nomeArquivo);
  // Escreve os dados formatados como JSON no arquivo
  fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));
}
const validateCreateUser = [
  body('nome_usuario').notEmpty().withMessage('O nome de usuário é obrigatório'),
  body('email').isEmail().withMessage('O email deve ser válido'),
];
// Validação do token de auth
//TODO Adicionar nas rotas para validação funcionar.
const verificarToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (token !== 'meuToken123') {
    return res.status(401).json({ mensagem: 'Acesso não autorizado' });
  }
  next();
};
// Rota para obter todos os usuários
app.get('/usuarios',  (req, res) => {
  try {
    const usuarios = lerArquivoJson('db.json');
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});

// Rota para obter um usuário específico
app.get('/usuarios/:id',  (req, res) => {
  try {
    const usuarios = lerArquivoJson('db.json');
    console.log(usuarios)
    const usuarioId = parseInt(req.params.id);
    console.log('parseInt', usuarioId)
    const usuario = usuarios.find(u => u.id === usuarioId);
    console.log('find', usuario)


    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});

// Rota para atualizar usuário
app.post('/usuarios',  validateCreateUser, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const usuarios = lerArquivoJson('db.json');
    const novoUsuario = { id: usuarios.length + 1, nome_usuario: req.body.nome_usuario, email: req.body.email, playlists: [] };
    usuarios.push(novoUsuario);
    escreverArquivoJson('db.json', usuarios);
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});

const validateUpdateUser = [
  param('id').isInt().withMessage('O ID do usuário deve ser um número inteiro'),
  body('nome_usuario').notEmpty().withMessage('O nome de usuário é obrigatório'),
];

app.put('/usuarios/:id',  validateUpdateUser, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const usuarios = lerArquivoJson('db.json');
    const usuarioId = parseInt(req.params.id);
    const usuarioIndex = usuarios.findIndex(u => u.id === usuarioId);

    if (usuarioIndex !== -1) {
      usuarios[usuarioIndex].nome_usuario = req.body.nome_usuario;
      escreverArquivoJson('db.json', usuarios);
      res.json({ mensagem: 'Usuário atualizado com sucesso', usuario: usuarios[usuarioIndex] });
    } else {
      res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});

app.delete('/usuarios/:id',  (req, res) => {
  try {
    const usuarios = lerArquivoJson('db.json');
    const usuarioId = parseInt(req.params.id);
    const usuarioIndex = usuarios.findIndex(u => u.id === usuarioId);

    if (usuarioIndex !== -1) {
      usuarios.splice(usuarioIndex, 1);
      escreverArquivoJson('db.json', usuarios);
      res.status(204).send();
    } else {
      res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});

// Configuração swagger
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

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(openapiSpecification));

// Tratamento de erros 404 (Rota não encontrada)
app.use((req, res, next) => {
  res.status(404).json({ mensagem: 'Rota não encontrada' });
});

// Tratamento de erros internos do servidor
app.use((err, req, res, next) => {
  console.error('Erro interno do servidor:', err);
  res.status(500).json({ mensagem: 'Erro interno do servidor' });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
