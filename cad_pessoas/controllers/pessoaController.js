let pessoas = [];

exports.listarPessoas = (req, res) => {
  res.json(pessoas);
};

exports.adicionarPessoa = (req, res) => {
  const { nome, telefone, endereco, email } = req.body;
  const pessoa = { nome, telefone, endereco, email };
  pessoas.push(pessoa);
  res.status(201).json(pessoa);
};
