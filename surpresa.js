// ================== EVENTO AO CARREGAR PÁGINA ==================
window.onload = () => {
  // Obter o botão e o texto extra
  const botaoVoltar = document.querySelector('.button-voltar');
  const mensagemExtra = document.getElementById('mensagem-extra');

  // Adicionar evento de clique no botão
  botaoVoltar.addEventListener('click', () => {
    // Exibir o texto romântico
    mensagemExtra.style.display = 'block';
  });
};
