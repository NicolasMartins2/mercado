-- Criar o banco de dados
CREATE DATABASE mercado;

-- Usar o banco de dados criado
USE mercado;

-- Criar a tabela cadastro
CREATE TABLE cadastro (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada cadastro
    nome VARCHAR(255) NOT NULL,        -- Nome completo do usuário
    email VARCHAR(255) NOT NULL UNIQUE, -- E-mail do usuário (deve ser único)
    senha VARCHAR(255) NOT NULL,       -- Senha do usuário (hash recomendado para produção)
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data e hora do cadastro
);

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada produto
    nome VARCHAR(255) NOT NULL,        -- Nome do produto
    categoria VARCHAR(255) NOT NULL,   -- Categoria do produto
    preco DECIMAL(10, 2) NOT NULL,     -- Preço do produto
    estoque INT NOT NULL               -- Quantidade em estoque
);

-- Inserir 10 itens na tabela produtos
INSERT INTO produtos (nome, categoria, preco, estoque) VALUES
('Arroz', 'Alimentos', 20.50, 100),
('Feijão', 'Alimentos', 10.00, 200),
('Açúcar', 'Alimentos', 5.50, 150),
('Leite', 'Bebidas', 4.80, 300),
('Café', 'Bebidas', 15.00, 120),
('Refrigerante', 'Bebidas', 7.00, 250),
('Detergente', 'Limpeza', 3.20, 400),
('Sabão em Pó', 'Limpeza', 18.90, 180),
('Papel Higiênico', 'Higiene', 25.00, 75),
('Shampoo', 'Higiene', 12.50, 60);
