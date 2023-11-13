const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const app = express();
const port = 3000;

/**
 * @openapi
 * /:
 *   get:
 *     summary: Retorna uma mensagem de boas-vindas
 *     responses:
 *       '200':
 *         description: OK
 */
app.get('/', (req, res) => {
  res.send('Bem-vindo à sua API Node.js!');
});

/**
 * @openapi
 * /produtos:
 *   get:
 *     summary: Retorna uma lista de produtos
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 nome: 'Produto 1'
 *                 categoria: 'Eletrônicos'
 *               - id: 2
 *                 nome: 'Produto 2'
 *                 categoria: 'Eletrônicos'
 *   post:
 *     summary: Cria um novo produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nome: 'Novo Produto'
 *             categoria: 'Eletrônicos'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             example:
 *               id: 3
 *               nome: 'Novo Produto'
 *               categoria: 'Eletrônicos'
 */

/**
 * @openapi
 * /produtos/{id}:
 *   get:
 *     summary: Retorna detalhes de um produto pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nome: 'Produto 1'
 *               categoria: 'Eletrônicos'
 *   put:
 *     summary: Atualiza os detalhes de um produto pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nome: 'Produto Atualizado'
 *             categoria: 'Eletrônicos'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nome: 'Produto Atualizado'
 *               categoria: 'Eletrônicos'
 *   delete:
 *     summary: Exclui um produto pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: No Content
 */
app.get('/produtos', (req, res) => {
  const produtos = [
    { id: 1, nome: 'Produto 1', categoria: 'Eletrônicos' },
    { id: 2, nome: 'Produto 2', categoria: 'Eletrônicos' },
  ];
  res.json(produtos);
});

app.post('/produtos', (req, res) => {
  // Lógica para criar um novo produto
  res.status(201).json({ id: 3, nome: 'Novo Produto', categoria: 'Eletrônicos' });
});

app.get('/produtos/:id', (req, res) => {
  const { id } = req.params;
  // Lógica para obter detalhes do produto pelo ID
  res.json({ id, nome: `Produto ${id}`, categoria: 'Eletrônicos' });
});

app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  // Lógica para atualizar detalhes do produto pelo ID
  res.json({ id, nome: 'Produto Atualizado', categoria: 'Eletrônicos' });
});

app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  // Lógica para excluir um produto pelo ID
  res.sendStatus(204);
});

/**
 * @openapi
 * /categorias:
 *   get:
 *     summary: Retorna uma lista de categorias
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 nome: 'Eletrônicos'
 *               - id: 2
 *                 nome: 'Acessórios'
 *   post:
 *     summary: Cria uma nova categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nome: 'Nova Categoria'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             example:
 *               id: 3
 *               nome: 'Nova Categoria'
 */

/**
 * @openapi
 * /categorias/{id}:
 *   get:
 *     summary: Retorna detalhes de uma categoria pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nome: 'Eletrônicos'
 *   put:
 *     summary: Atualiza os detalhes de uma categoria pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nome: 'Categoria Atualizada'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nome: 'Categoria Atualizada'
 *   delete:
 *     summary: Exclui uma categoria pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: No Content
 */
app.get('/categorias', (req, res) => {
  const categorias = [
    { id: 1, nome: 'Eletrônicos' },
    { id: 2, nome: 'Acessórios' },
  ];
  res.json(categorias);
});

app.post('/categorias', (req, res) => {
  // Lógica para criar uma nova categoria
  res.status(201).json({ id: 3, nome: 'Nova Categoria' });
});

app.get('/categorias/:id', (req, res) => {
  const { id } = req.params;
  // Lógica para obter detalhes da categoria pelo ID
  res.json({ id, nome: 'Eletrônicos' });
});

app.put('/categorias/:id', (req, res) => {
  const { id } = req.params;
  // Lógica para atualizar detalhes da categoria pelo ID
  res.json({ id, nome: 'Categoria Atualizada' });
});

app.delete('/categorias/:id', (req, res) => {
  const { id } = req.params;
  // Lógica para excluir uma categoria pelo ID
  res.sendStatus(204);
});

/**
 * @openapi
 * /avaliacoes:
 *   get:
 *     summary: Retorna uma lista de avaliações de clientes
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 produto_id: 1
 *                 comentario: 'Ótimo produto!'
 *                 avaliacao: 5
 *               - id: 2
 *                 produto_id: 2
 *                 comentario: 'Produto satisfatório'
 *                 avaliacao: 4
 *   post:
 *     summary: Cria uma nova avaliação de cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             produto_id: 1
 *             comentario: 'Excelente produto!'
 *             avaliacao: 5
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             example:
 *               id: 3
 *               produto_id: 1
 *               comentario: 'Excelente produto!'
 *               avaliacao: 5
 */

/**
 * @openapi
 * /avaliacoes/{id}:
 *   get:
 *     summary: Retorna detalhes de uma avaliação de cliente pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da avaliação
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               produto_id: 1
 *               comentario: 'Ótimo produto!'
 *               avaliacao: 5
 *   put:
 *     summary: Atualiza os detalhes de uma avaliação de cliente pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da avaliação
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             comentario: 'Avaliação atualizada'
 *             avaliacao: 4
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               produto_id: 1
 *               comentario: 'Avaliação atualizada'
 *               avaliacao: 4
 *   delete:
 *     summary: Exclui uma avaliação de cliente pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da avaliação
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: No Content
 */
app.get('/avaliacoes', (req, res) => {
  const avaliacoes = [
    { id: 1, produto_id: 1, comentario: 'Ótimo produto!', avaliacao: 5 },
    { id: 2, produto_id: 2, comentario: 'Produto satisfatório', avaliacao: 4 },
  ];
  res.json(avaliacoes);
});

app.post('/avaliacoes', (req, res) => {
  // Lógica para criar uma nova avaliação de cliente
  res.status(201).json({ id: 3, produto_id: 1, comentario: 'Excelente produto!', avaliacao: 5 });
});

app.get('/avaliacoes/:id', (req, res) => {
  const { id } = req.params;
  // Lógica para obter detalhes da avaliação pelo ID
  res.json({ id, produto_id: 1, comentario: 'Ótimo produto!', avaliacao: 5 });
});

app.put('/avaliacoes/:id', (req, res) => {
  const { id } = req.params;
  // Lógica para atualizar detalhes da avaliação pelo ID
  res.json({ id, produto_id: 1, comentario: 'Avaliação atualizada', avaliacao: 4 });
});

app.delete('/avaliacoes/:id', (req, res) => {
  const { id } = req.params;
  // Lógica para excluir uma avaliação de cliente pelo ID
  res.sendStatus(204);
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

// Configuração do Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sua API Node.js',
      version: '1.0.0',
      description: 'Descrição da sua API',
    },
  },
  apis: ['server.js'],
};

const openapiSpecification = swaggerJsdoc(options);

// Middleware para servir a documentação Swagger
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(openapiSpecification));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
