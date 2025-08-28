const API_URL = "http://localhost:8080";
const PLATFORM_MARGIN = 1.10;

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const idPeca = params.get("id");
  if (!idPeca) {
    Swal.fire({
      title: 'Erro!',
      text: 'Peça não especificada.',
      icon: 'error',
      confirmButtonColor: '#394725',
      background: '#f8f6f0',
      color: '#2e2e2e',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        content: 'custom-swal-content',
        confirmButton: 'custom-swal-confirm-button'
      },
      buttonsStyling: false
    });
    return;
  }

  // Busca dados da peça
  fetch(`${API_URL}/pecas/${idPeca}`)
    .then(res => {
      if (!res.ok) throw new Error("Erro ao buscar a peça");
      return res.json();
    })
    .then(peca => {
      document.getElementById("nomePeca").textContent = peca.nome || "Sem nome";
      document.getElementById("imagemPeca").src = peca.imagem
        || "https://via.placeholder.com/300x300?text=Imagem+indisponível";

      const valorSugerido = calcularValorSugerido(peca);
      const precoFinal = valorSugerido * PLATFORM_MARGIN;
      document.getElementById("valorPeca").textContent = `R$ ${precoFinal.toFixed(2).replace('.', ',')}`;

      const userId = peca.usuarioId;
      const formaElem = document.getElementById("formaPagamento");

      fetch(`${API_URL}/pix/usuario/${userId}`)
        .then(r => r.ok ? r.json() : Promise.resolve([]))
        .then(pixList => {
          if (pixList.length > 0) {
            formaElem.textContent = `PIX: ${pixList[0].chave}`;
          } else {
            return fetch(`${API_URL}/cartoes/usuario/${userId}`)
              .then(r => r.ok ? r.json() : Promise.resolve([]))
              .then(cartaoList => {
                if (cartaoList.length > 0) {
                  formaElem.textContent = `Cartão: ${cartaoList[0].numero}`;
                } else {
                  formaElem.textContent = "Não informado";
                }
              });
          }
        })
        .catch(err => {
          console.error("Erro ao buscar forma de pagamento:", err);
          formaElem.textContent = "Não informado";
        });
    })
    .catch(err => {
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao carregar dados da peça.',
        icon: 'error',
        confirmButtonColor: '#394725',
        background: '#f8f6f0',
        color: '#2e2e2e',
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          content: 'custom-swal-content',
          confirmButton: 'custom-swal-confirm-button'
        },
        buttonsStyling: false
      });
    });

  // Confirmar venda — só faz PATCH, sem adicionar no carrinho
  // Confirmar venda
document.querySelector(".confirm").addEventListener("click", async () => {
  const confirmacao = await Swal.fire({
    title: 'Confirmar venda?',
    text: 'Tem certeza que deseja confirmar esta venda?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#394725',  // Mantém a cor do confirmar
    // REMOVIDO cancelButtonColor para usar CSS customizado
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    background: '#f8f6f0',
    color: '#2e2e2e',
    customClass: {
      popup: 'custom-swal-popup',
      title: 'custom-swal-title',
      content: 'custom-swal-content',
      confirmButton: 'custom-swal-confirm-button',
      cancelButton: 'custom-swal-cancel-button'  // Classe customizada para cancelar
    },
    buttonsStyling: false
  });

  if (!confirmacao.isConfirmed) return;

  try {
    const res = await fetch(`${API_URL}/pecas/${idPeca}/modalidade`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modalidade: "VENDER" })
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);

    await Swal.fire({
      title: 'Venda confirmada!',
      text: 'Agora siga as instruções para envio.',
      icon: 'success',
      confirmButtonColor: '#394725',
      background: '#f8f6f0',
      color: '#2e2e2e',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        content: 'custom-swal-content',
        confirmButton: 'custom-swal-confirm-button'
      },
      buttonsStyling: false
    });

    window.location.href = `instrucoes-envio.html?id=${idPeca}`;
  } catch (err) {
    Swal.fire({
      title: 'Erro!',
      text: 'Não foi possível confirmar a venda.',
      icon: 'error',
      confirmButtonColor: '#394725',
      background: '#f8f6f0',
      color: '#2e2e2e',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        content: 'custom-swal-content',
        confirmButton: 'custom-swal-confirm-button'
      },
      buttonsStyling: false
    });
  }
});

  // Recusar proposta
document.querySelector(".decline").addEventListener("click", async () => {
  const confirmacao = await Swal.fire({
    title: 'Recusar proposta?',
    text: 'Tem certeza que deseja recusar esta proposta?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#394725',  // cor do confirmar
    // REMOVIDO cancelButtonColor para usar CSS customizado
    confirmButtonText: 'Recusar',
    cancelButtonText: 'Cancelar',
    background: '#f8f6f0',
    color: '#2e2e2e',
    customClass: {
      popup: 'custom-swal-popup',
      title: 'custom-swal-title',
      content: 'custom-swal-content',
      confirmButton: 'custom-swal-confirm-button',
      cancelButton: 'custom-swal-cancel-button'  // Classe para cancelar estilizado
    },
    buttonsStyling: false
  });

  if (confirmacao.isConfirmed) {
    await Swal.fire({
      title: 'Proposta recusada',
      icon: 'info',
      confirmButtonColor: '#394725',
      background: '#f8f6f0',
      color: '#2e2e2e',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        content: 'custom-swal-content',
        confirmButton: 'custom-swal-confirm-button'
      },
      buttonsStyling: false
    });
    window.location.href = "consultaPeca.html";
  }
});
});

// Mesma função de cálculo do preço que você já conhece
function calcularValorSugerido(peca) {
  const basePorTipo = {
    camisa: 20,
    calça: 30,
    jaqueta: 40,
    vestido: 35,
    acessorio: 15
  };

  const corValor = [
    "preto", "branco", "azul", "vermelho", "verde", "amarelo", "rosa", "multicolorido"
  ];

  const condicaoMultiplicador = {
    "novo": 1.5,
    "semi-novo": 1.2,
    "usado": 1.0
  };

  const tipo = (peca.categoria || "").toLowerCase().trim();
  const cor = (peca.genero || "").toLowerCase().trim();
  const condicao = (peca.condicao || "").toLowerCase().trim();

  const valorBase = basePorTipo[tipo] || 20;
  const corIndex = corValor.indexOf(cor);
  const corMultiplicador = corIndex >= 0 ? 1 + ((corValor.length - corIndex) * 0.05) : 1;
  const multCondic = condicaoMultiplicador[condicao] || 1;

  return valorBase * corMultiplicador * multCondic;
}
