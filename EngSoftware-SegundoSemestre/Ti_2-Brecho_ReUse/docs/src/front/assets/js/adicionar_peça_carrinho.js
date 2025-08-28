// Dados simulados (você pode substituir por dados vindos de um banco/API)
const dadosPeca = {
    titulo: "Camisa Vintage",
    categoria: "Camisa",
    tamanho: "M",
    conservacao: "Semi-novo",
    cor: "Azul",
    descricao: "Camisa retrô dos anos 90, muito bem conservada.",
    imagem: "https://via.placeholder.com/300x300"
  };
  
  window.onload = () => {
    document.getElementById("titulo").value = dadosPeca.titulo;
    document.getElementById("categoria").value = dadosPeca.categoria;
    document.getElementById("tamanho").value = dadosPeca.tamanho;
    document.getElementById("conservacao").value = dadosPeca.conservacao;
    document.getElementById("cor").value = dadosPeca.cor;
    document.getElementById("descricao").value = dadosPeca.descricao;
    document.getElementById("imgVisualizacao").src = dadosPeca.imagem;
  };
  
  function adicionarAoCarrinho() {
    alert("Peça adicionada ao carrinho!");
  }
  
  // Navegação fake (pode adaptar conforme seu app)
  function irPara(tela) {
    alert("Indo para: " + tela);
  }
  