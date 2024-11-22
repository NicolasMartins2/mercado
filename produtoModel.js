const db = require('./conn'); // Conexão com o banco de dados

const salvarProduto = async (produto) => {
    try {
        const sql = `
            INSERT INTO produtos (nome, categoria, preco, estoque)
            VALUES (?, ?, ?, ?)
        `;
        const params = [
            produto.nomeProduto,
            produto.categoria,
            produto.preco,
            produto.estoque,
            
        ];
        await db.query(sql, params);
        console.log(`Produto "${produto.nomeProduto}" salvo com sucesso!`);
    } catch (error) {
        console.error('Erro ao salvar produto no banco:', error);
        throw error;
    }
};

module.exports = { salvarProduto };
