const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const pessoaRoutes = require('./routes/pessoaRoutes');

const app = express();
const PORT = 3000;

// Configurar conexão com o banco de dados PostgreSQL
const client = new Client({
  user: 'postgres', // Nome do usuário
  host: 'db', // Nome do serviço do PostgreSQL no Docker Compose
  database: 'db-jensix',
  password: 'jensix123',
  port: 5432, // Porta padrão do PostgreSQL
});

// Conectar ao banco de dados
client.connect()
  .then(() => console.log('Conexão bem-sucedida ao banco de dados PostgreSQL'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err.message));

// Rota padrão para lidar com requisições para a raiz
app.get('/', (req, res) => {
  res.send('Bem-vindo à aplicação Cadastro de pessoas!');
});

// Rota para acessar os dados de uma pessoa por ID
app.get('/pessoas/:id', (req, res) => {
  const pessoaId = req.params.id;

  // Consultar o banco de dados para obter os dados da pessoa com o ID fornecido
  client.query('SELECT * FROM pessoas WHERE id = $1', [pessoaId], (err, result) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      res.status(500).send('Erro ao buscar os dados da pessoa');
      return;
    }

    if (result.rows.length === 0) {
      res.status(404).send('Pessoa não encontrada');
      return;
    }

    const pessoa = result.rows[0];
    res.json(pessoa); // Retorna os dados da pessoa em formato JSON
  });
});

// Middleware para adicionar a conexão com o banco de dados à requisição
app.use((req, res, next) => {
  req.db = client;
  next();
});

// Adicionar rotas para manipular operações CRUD de pessoas
app.use('/pessoas', pessoaRoutes);

// Lidar com erros de conexão com o banco de dados
client.on('error', err => console.error('Erro de conexão com o banco de dados:', err.message));

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
