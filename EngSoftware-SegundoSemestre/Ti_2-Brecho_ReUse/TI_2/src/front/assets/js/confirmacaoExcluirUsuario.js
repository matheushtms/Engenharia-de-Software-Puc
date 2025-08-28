document.addEventListener("DOMContentLoaded", () => {
  // Redireciona automaticamente para a página Cadastro-Usuario.html após 1,5 segundos
  setTimeout(() => {
    window.location.href = "Cadastro-Usuario.html";
  }, 1500);

  // Função para redirecionar ao clicar no botão de voltar
  const backButton = document.querySelector(".back-button");
  backButton.addEventListener("click", () => {
    window.location.href = "Cadastro-Usuario.html";
  });
});
