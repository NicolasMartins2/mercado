const express = require('express');
const bodyParser = require('body-parser');
const Stripe = require('stripe');
const path = require('path');
const { salvarProduto } = require('./produtoModel');
const conn = require('./conn'); // Pool de conexões MySQL
const { cadastrarUsuario } = require('./cadastro'); // Controlador para usuários
const stripe = Stripe('sk_test_51QDOmoHkxHLashFy55RFxo2mL2rtoerTwmNlEAHlXzgIKnqkL27DzQjH2Wg9B4gDcGtUixjhV1PjV6wvkWlPposO00BxUtGmP3'); // Substitua pela sua chave secreta
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use('/css', express.static(path.join(__dirname, 'css')));

app.use((req, res, next) => {
    console.log('Rota acessada:', req.url);
    next();
});

// Rotas

app.get('/usuarios-cadastrados', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'usuarios-cadastrados.html'));
});

app.get('/api/cadastro', async (req, res) => {
    try {
        const [rows] = await conn.query('SELECT * FROM cadastro'); // Altere conforme a sua tabela e conexão
        res.json(rows); // Retorna os dados em formato JSON
    } catch (error) {
        res.status(500).send('Erro ao buscar dados do cadastro');
    }
});

app.post('/cadastrar', async (req, res) => {
    const { nome, email } = req.body;
    try {
        await cadastrarUsuario(nome, email);
        if (email.endsWith('@adm.com')) {
            res.redirect('/views/dashboardAdmin.html');
        } else if (email.endsWith('@usuario.com')) {
            res.redirect('/views/dashboardUsuario.html');
        } else {
            res.redirect('/views/index.html');
        }
    } catch (error) {
        res.status(500).send('Erro ao cadastrar usuário: ' + error.message);
    }
});

app.post('/create-checkout-session', async (req, res) => {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).send({ error: 'Itens inválidos' });
    }

    const line_items = items.map(item => ({
        price_data: {
            currency: 'brl',
            product_data: { name: item.name },
            unit_amount: item.price * 100, // Preço em centavos
        },
        quantity: item.quantity,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Erro ao criar sessão de checkout:', error.message);
        res.status(500).send({ error: error.message });
    }
});





// Rota para listar os produtos  (LISTA DO ESTOQUE, NAO APAGAR!!)
app.get('/api/produtos', async (req, res) => {
    try {
        const query = 'SELECT * FROM produtos'; // Consulta para pegar todos os produtos
        const [rows] = await conn.execute(query); // Executa a consulta no banco
        res.status(200).json(rows); // Retorna os produtos em formato JSON
    } catch (error) {
        console.error('Erro ao buscar produtos:', error.message);
        res.status(500).send('Erro ao buscar produtos.');
    }
});

//salvar no banco teste
app.post('/salvar-produtos', async (req, res) => {
    const produtos = req.body.produtos; // Lista de produtos enviada
    try {
        for (const produto of produtos) {
            await salvarProduto(produto); // Chama a função que salva cada produto
        }
        res.status(200).send('Produtos salvos com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar produtos:', error);
        res.status(500).send('Erro ao salvar produtos no banco de dados.');
    }
});



//fimm

  



// Rotas para páginas
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/success', (req, res) => res.sendFile(path.join(__dirname, 'views', 'success.html')));
app.get('/cancel', (req, res) => res.sendFile(path.join(__dirname, 'views', 'cancel.html')));
app.get('/testedados', (req, res) => res.sendFile(path.join(__dirname, 'views', 'testedados.html')));
app.get('/form', (req, res) => res.sendFile(path.join(__dirname, 'views', 'form.html')));

// Inicia o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

