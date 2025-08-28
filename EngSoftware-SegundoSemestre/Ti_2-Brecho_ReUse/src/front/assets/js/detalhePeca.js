const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
const params = new URLSearchParams(window.location.search);
const pecaId = params.get("id");
const origem = params.get("origem");
const precoUrl = parseFloat(params.get("preco")); // Novo: preço vindo da Home

fetch(`http://localhost:8080/pecas/${pecaId}`)
  .then(res => res.json())
  .then(peca => {
    const carrinho = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemNoCarrinho = carrinho.find(item => item.id === peca.id);

    const precoFinal = itemNoCarrinho
      ? itemNoCarrinho.preco
      : !isNaN(precoUrl)
        ? precoUrl
        : peca.preco;

    document.getElementById("imagem-peca").src = peca.imagem;
    document.getElementById("nome-peca").textContent = peca.nome;
    document.getElementById("descricao-peca").textContent = peca.descricao;
    document.getElementById("categoria-peca").textContent = peca.categoria;
    document.getElementById("tamanho-peca").textContent = peca.tamanho;
    document.getElementById("condicao-peca").textContent = peca.condicao;
    document.getElementById("cor-peca").textContent = peca.genero;
    document.getElementById("preco-peca").textContent = precoFinal.toFixed(2).replace(".", ",");

    const botao = document.getElementById("add-carrinho-btn");
    const aviso = document.getElementById("mensagem-propria");

    if (peca.usuarioId === usuario?.id) {
      botao.style.display = "none";
      aviso.style.display = "block";
    } else if (origem === "carrinho" || itemNoCarrinho) {
      botao.textContent = "Remover do Carrinho";
      botao.addEventListener("click", () => {
        const novoCarrinho = carrinho.filter(item => item.id !== peca.id);
        localStorage.setItem("cartItems", JSON.stringify(novoCarrinho));
        Swal.fire("Removido!", "Peça removida do carrinho.", "success").then(() => {
          window.location.href = "Home-Page.html";
        });
      });
    } else {
      botao.textContent = "Adicionar ao Carrinho";
      botao.addEventListener("click", () => {
        carrinho.push({
          id: peca.id,
          nome: peca.nome,
          preco: precoFinal,
          imagem: peca.imagem,
          categoria: peca.categoria,
          tamanho: peca.tamanho,
          condicao: peca.condicao,
          genero: peca.genero
        });
        localStorage.setItem("cartItems", JSON.stringify(carrinho));
        window.location.href = "gerenciar_carrinho.html";
      });
    }
  })
  .catch(err => {
    console.error(err);
    alert("Erro ao carregar os detalhes.");
  });
