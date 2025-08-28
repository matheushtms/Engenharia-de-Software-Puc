document.addEventListener("DOMContentLoaded", () => {
  const pecaId = new URLSearchParams(window.location.search).get("id");

  // Confirmar exclusão
  document.querySelector(".confirm-button").addEventListener("click", async () => {
    if (!pecaId) {
      alert("ID da peça não encontrado na URL.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/pecas/${pecaId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert("Peça excluída com sucesso.");
        window.location.href = "consultaPeca.html"; // Redireciona para a página de consulta
      } else {
        alert('Erro ao excluir a peça.');
      }
    } catch (error) {
      alert('Erro ao excluir a peça.');
      console.error(error);
    }
  });

  // Botão de Cancelar - redireciona para a página de consulta
  document.querySelector(".btn-cancel").addEventListener("click", () => {
    window.location.href = "consultaPeca.html";
  });

  // Navegação do footer
  document.getElementById("homeBtn").addEventListener("click", () => {
    window.location.href = "Home-Page.html";  // Redireciona para a página inicial
  });

  document.getElementById("addPecaBtn").addEventListener("click", () => {
    window.location.href = "consultaPeca.html";  // Redireciona para a página de adicionar peça
  });

  document.getElementById("carrinhoBtn").addEventListener("click", () => {
    window.location.href = "gerenciar_carrinho.html";  // Redireciona para o carrinho
  });

  document.getElementById("perfilBtn").addEventListener("click", () => {
    window.location.href = "perfil.html";  // Redireciona para o perfil
  });
});
