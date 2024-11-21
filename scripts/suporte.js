// Selecionar todas as setas
const toggles = document.querySelectorAll('.faq-toggle');

// Adicionar evento de clique
toggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    // Pegar o item do FAQ correspondente
    const faqItem = toggle.closest('.faq-item');

    // Alternar a classe "active"
    faqItem.classList.toggle('active');

    // Atualizar o estado do botão para acessibilidade
    const isExpanded = faqItem.classList.contains('active');
    toggle.setAttribute('aria-expanded', isExpanded);
  });
});

  
  
  