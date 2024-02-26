// __tests__/app.test.js
const request = require('supertest');
const app = require('../index'); // Importe sua aplicação express

describe('Testes de integração para as rotas da aplicação', () => {
  // Teste para a rota '/'
  it('Deve retornar uma mensagem de boas-vindas ao acessar a rota raiz', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Bem-vindo à aplicação Cadastro de pessoas!');
  });

  // Teste para a rota '/pessoas/:id'
  it('Deve retornar os dados de uma pessoa ao acessar a rota /pessoas/:id', async () => {
    const pessoaIdExistente = 1; // Suponha que este seja um ID existente no seu banco de dados
    const response = await request(app).get(`/pessoas/${pessoaIdExistente}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('nome');
    // Adicione mais expectativas conforme necessário para verificar os dados retornados
  });

  // Teste para a rota '/pessoas'
  it('Deve incluir uma nova pessoa ao fazer uma requisição POST para a rota /pessoas', async () => {
    const novaPessoa = {
      nome: 'Teste',
      telefone: '123456789',
      endereco: 'Rua Teste',
      email: 'teste@example.com'
    };
    const response = await request(app).post('/pessoas').send(novaPessoa);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe(novaPessoa.nome);
    // Adicione mais expectativas conforme necessário para verificar os dados retornados
  });

  // Adicione mais testes para outras rotas conforme necessário
});
