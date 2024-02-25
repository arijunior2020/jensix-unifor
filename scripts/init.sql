CREATE TABLE IF NOT EXISTS pessoas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    telefone VARCHAR(255),
    endereco VARCHAR(255),
    email VARCHAR(255)
);

INSERT INTO pessoas (nome, telefone, endereco, email) VALUES
('Arimateia Junior', '(85)987764016', 'Av. Pontes Vieira 1020', 'arimateia.junior@ejensix.com'),
('Karime Linhares', '(85)987744006', 'Av. Borges de Melo 5870', 'karime.linhares@ejensix.com'),
('Maria Elisa', '(85)987864106', 'Av. Pontes Vieira 1020', 'maria.elisa@ejensix.com'),
('Saynara Nabuco', '(85)987754003', 'Av. Pontes Vieira 1020', 'saynara.nabuco@ejensix.com'),
('Monique Pinheiro', '(85)987663006', 'Av. Pontes Vieira 1020', 'monique.pinheiro@ejensix.com'),
('Victor Elpidio', '(85)987762304', 'Av. Pontes Vieira 1020', 'victor.elpidio@ejensix.com');
