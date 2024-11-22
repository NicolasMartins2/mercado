
    document.addEventListener('DOMContentLoaded', function() {
        const menuToggle = document.querySelector('.menu-toggle');
        const headerBottom = document.querySelector('.header-bottom');

        menuToggle.addEventListener('click', function() {
            headerBottom.style.display = headerBottom.style.display === 'flex' ? 'none' : 'flex';
        });
    });






    const products = [
        // Bebidas
        "Cerveja Skol",
        "Vinho Tinto",
        "Vodka",
        "Whisky",
        "Suco de Laranja",
        "Suco de Uva",
        "Refrigerante Cola",
        "Água Mineral",
    
        // Derivados de Leite
        "Leite Integral",
        "Queijo Muçarela",
        "Iogurte Natural",
        "Manteiga com Sal",
    
        // Alimentos
        "Arroz",
        "Feijão",
        "Macarrão Espaguete",
        "Farinha de Mandioca",
    
        // Produtos de Limpeza
        "Detergente Líquido",
        "Sabão em Pó",
        "Desinfetante de Limão",
        "Esponja de Limpeza",
    
        // Produtos de Beleza
        "Shampoo",
        "Condicionador",
        "Creme Hidratante",
        "Sabonete Líquido",
    
        // Infantis
        "Fralda Descartável",
        "Lenço Umedecido",
        "Shampoo Infantil",
        "Talco para Bebê",
    
        // Essenciais em Pó
        "Farinha de Trigo",
        "Café Solúvel",
        "Leite em Pó",
        "Chocolate em Pó"
    ];
    
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');
    
    // Função para exibir resultados conforme a digitação
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        resultsDiv.innerHTML = '';
        if (query) {
            const filteredProducts = products.filter(product => 
                product.toLowerCase().includes(query)
            );
    
            if (filteredProducts.length > 0) {
                resultsDiv.style.display = 'block';
                filteredProducts.forEach(product => {
                    const div = document.createElement('div');
                    div.textContent = product;
                    div.onclick = () => alert(`Você clicou em: ${product}`);
                    resultsDiv.appendChild(div);
                });
            } else {
                resultsDiv.innerHTML = '<div>Nenhum resultado encontrado</div>';
            }
        } else {
            resultsDiv.style.display = 'none';
        }
    });
    
    // Função para pesquisar clicando no botão
    function searchItems() {
        searchInput.dispatchEvent(new Event('input'));
    }
    
    // Fechar os resultados ao clicar fora
    document.addEventListener('click', (event) => {
        const isClickInsideSearch = searchInput.contains(event.target);
        const isClickInsideResults = resultsDiv.contains(event.target);
    
        if (!isClickInsideSearch && !isClickInsideResults) {
            resultsDiv.style.display = 'none';
        }
    });
    
