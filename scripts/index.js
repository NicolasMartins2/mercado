
    document.addEventListener('DOMContentLoaded', function() {
        const menuToggle = document.querySelector('.menu-toggle');
        const headerBottom = document.querySelector('.header-bottom');

        menuToggle.addEventListener('click', function() {
            headerBottom.style.display = headerBottom.style.display === 'flex' ? 'none' : 'flex';
        });
    });






    const products = [
        "Cerveja Skol",
        "Vinho Tinto",
        "Vodka",
        "Whisky",
        "Suco de Laranja",
        "Suco de Uva",
        "Refrigerante Cola"
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

