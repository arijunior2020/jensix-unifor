const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors'); // Importe o middleware CORS
const pessoaRoutes = require('./routes/pessoaRoutes');

const app = express();
const PORT = 3000;

// Adicione o middleware CORS à sua aplicação
app.use(cors());

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

  // Adicionar o middleware bodyParser para interpretar o corpo da requisição como JSON
app.use(bodyParser.json());

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

// Rota para incluir uma nova pessoa
app.post('/pessoas', (req, res) => {
  const { nome, telefone, endereco, email } = req.body;

  // Inserir a nova pessoa no banco de dados
  client.query('INSERT INTO pessoas (nome, telefone, endereco, email) VALUES ($1, $2, $3, $4) RETURNING *', [nome, telefone, endereco, email], (err, result) => {
    if (err) {
      console.error('Erro ao inserir pessoa no banco de dados:', err);
      res.status(500).send('Erro ao incluir pessoa');
      return;
    }

    const novaPessoa = result.rows[0];
    res.status(201).json(novaPessoa); // Retorna os dados da nova pessoa incluída
  });
});

// Rota para excluir uma pessoa por ID
app.delete('/pessoas/:id', (req, res) => {
  const pessoaId = req.params.id;

  // Excluir a pessoa do banco de dados
  client.query('DELETE FROM pessoas WHERE id = $1', [pessoaId], (err, result) => {
    if (err) {
      console.error('Erro ao excluir pessoa do banco de dados:', err);
      res.status(500).send('Erro ao excluir pessoa');
      return;
    }

    res.status(204).send(); // Retorna uma resposta de sucesso sem conteúdo
  });
});

// Rota para atualizar os dados de uma pessoa por ID
app.put('/pessoas/:id', (req, res) => {
  const pessoaId = req.params.id;
  const { nome, telefone, endereco, email } = req.body;

  // Atualizar os dados da pessoa no banco de dados
  client.query('UPDATE pessoas SET nome = $1, telefone = $2, endereco = $3, email = $4 WHERE id = $5 RETURNING *', [nome, telefone, endereco, email, pessoaId], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar os dados da pessoa no banco de dados:', err);
      res.status(500).send('Erro ao atualizar pessoa');
      return;
    }

    if (result.rows.length === 0) {
      res.status(404).send('Pessoa não encontrada');
      return;
    }

    const pessoaAtualizada = result.rows[0];
    res.json(pessoaAtualizada); // Retorna os dados da pessoa atualizada
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
