const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
 * /users:
 *   get:
 *     summary: Retorna uma lista de usuários
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: 'Usuário 1'
 *               - id: 2
 *                 name: 'Usuário 2'
 */
app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'Usuário 1' },
    { id: 2, name: 'Usuário 2' },
  ];
  res.json(users);
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
