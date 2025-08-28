const API_URL = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuario || !usuario.id) {
    alert("Usuário não autenticado.");
    return;
  }

  const inputNome = document.getElementById("filtro-nome");
  const selectCategoria = document.getElementById("filter-categoria");
  const selectTamanho = document.getElementById("filter-tamanho");
  const selectCondicao = document.getElementById("filter-condicao");
  const selectCor = document.getElementById("filter-cor");
  const btnBuscar = document.getElementById("botao-buscar");
  const container = document.getElementById("lista-pecas");

  btnBuscar.addEventListener("click", buscarPecas);
  buscarPecas();

  async function buscarPecas() {
    try {
      const res = await fetch(`${API_URL}/pecas/usuario/${usuario.id}`);
      if (!res.ok) throw new Error("Erro ao buscar peças.");
      const pecas = await res.json();

      const filtros = {
        nome: inputNome.value.trim().toLowerCase(),
        categoria: selectCategoria.value.toLowerCase(),
        tamanho: selectTamanho.value.toLowerCase(),
        condicao: selectCondicao.value.toLowerCase(),
        cor: selectCor.value.toLowerCase(),
      };

      const filtradas = pecas.filter(p => {
        const nome = (p.nome || "").toLowerCase();
        const categoria = (p.categoria || "").toLowerCase();
        const tamanho = (p.tamanho || "").toLowerCase();
        const condicao = (p.condicao || "").toLowerCase();
        const cor = (p.genero || "").toLowerCase();

        return (!filtros.nome || nome.includes(filtros.nome)) &&
               (!filtros.categoria || categoria === filtros.categoria) &&
               (!filtros.tamanho || tamanho === filtros.tamanho) &&
               (!filtros.condicao || condicao === filtros.condicao) &&
               (!filtros.cor || cor === filtros.cor);
      });

      exibirPecas(filtradas);

    } catch (error) {
      console.error(error);
      container.innerHTML = `<p style="text-align:center; color:red;">Erro ao carregar peças.</p>`;
    }
  }

  function exibirPecas(pecas) {
    container.innerHTML = "";
    if (pecas.length === 0) {
      container.innerHTML = "<p style='text-align:center;'>Nenhuma peça encontrada.</p>";
      return;
    }

    pecas.forEach(p => {
      const jaProcessada = p.modalidade === "vendida" || p.modalidade === "DOAR" || p.modalidade === "VENDER";

      let statusLabel = "";
      if (p.modalidade === "vendida") {
        statusLabel = `<span class="status-label vendida">Peça vendida</span>`;
      } else if (p.modalidade === "VENDER") {
        statusLabel = `<span class="status-label vender">À venda</span>`;
      } else if (p.modalidade === "DOAR") {
        statusLabel = `<span class="status-label doar">Peça doada</span>`;
      }

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <div class="card-img">
          <img src="${p.imagem || 'assets/img/imagem_default.png'}" alt="${p.nome}">
          <div class="card-actions">
            ${statusLabel || `
              <div class="ordem-wrapper">
                <button class="ordenar-btn">
                  <img src="assets/icons/icone-opcao-de-ordenacao.png" alt="Ordenar" width="20">
                </button>
                <div class="ordem-menu" style="display:none">
                  <button class="vender-btn">Vender Peça</button>
                  <button class="doar-btn">Doar Peça</button>
                </div>
              </div>
            `}
            ${!jaProcessada ? `
              <button class="edit-btn">
                <img src="assets/icons/icone-editar-preto.png" alt="Editar" width="20">
              </button>
            ` : ''}
          </div>
        </div>
        <div class="card-body">
          <h3>${p.nome}</h3>
          <p><strong>Categoria:</strong> ${p.categoria || "N/A"}</p>
          <p><strong>Tamanho:</strong> ${p.tamanho || "N/A"}</p>
          <p><strong>Conservação:</strong> ${p.condicao || "N/A"}</p>
          <p><strong>Cor:</strong> ${p.genero || "N/A"}</p>
          <button class="delete-btn">
            <img src="assets/icons/icone-lixeira-preta.png" alt="Excluir" width="20">
          </button>
        </div>
      `;

      container.appendChild(card);

      if (!jaProcessada) {
        const ordenarBtn = card.querySelector(".ordenar-btn");
        const ordemMenu = card.querySelector(".ordem-menu");
        const venderBtn = card.querySelector(".vender-btn");
        const doarBtn = card.querySelector(".doar-btn");
        const editBtn = card.querySelector(".edit-btn");

        ordenarBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          document.querySelectorAll(".ordem-menu").forEach(menu => {
            if (menu !== ordemMenu) menu.style.display = "none";
          });
          ordemMenu.style.display = ordemMenu.style.display === "flex" ? "none" : "flex";
        });

        venderBtn.addEventListener("click", () => {
          ordemMenu.style.display = "none";
          ordenarPor("venda", p.id);
        });

        doarBtn.addEventListener("click", () => {
          ordemMenu.style.display = "none";
          ordenarPor("doacao", p.id);
        });

        if (editBtn) {
          editBtn.addEventListener("click", () => {
            editarPeca(p.id);
          });
        }
      }

      const deleteBtn = card.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => {
        excluirPeca(p.id);
      });
    });
  }
});

function ordenarPor(tipo, idPeca) {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (tipo === "venda") {
    window.location.href = `confirmar-proposta.html?id=${idPeca}`;
    return;
  }

  if (tipo === "doacao") {
    // 1. Enviar para RegistroInicialDaPeca
    fetch(`${API_URL}/registro-inicial`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuarioId: usuario.id,
        pecaId: idPeca,
        modalidade: "DOACAO"
      }),
    })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao registrar histórico de doação.");

      // 2. Atualizar a peça
      return fetch(`${API_URL}/pecas/${idPeca}/modalidade`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modalidade: "DOAR" }),
      });
    })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao atualizar a peça.");
      window.location.href = `instrucoes-envio.html?id=${idPeca}`;
    })
    .catch(err => {
      console.error(err);
      alert("Não foi possível registrar a doação. Tente novamente.");
    });
  }
}

function editarPeca(id) {
  window.location.href = `editar-Peca.html?id=${id}`;
}

async function excluirPeca(id) {
  const confirmacao = await Swal.fire({
    title: "Excluir peça?",
    text: "Essa ação não pode ser desfeita.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#394725",
    cancelButtonColor: "#999",
    confirmButtonText: "Sim, excluir",
    cancelButtonText: "Cancelar",
  });

  if (!confirmacao.isConfirmed) return;

  try {
    const res = await fetch(`${API_URL}/pecas/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Falha ao excluir.");

    let carrinho = JSON.parse(localStorage.getItem("cartItems")) || [];
    carrinho = carrinho.filter(item => item.id !== id);
    localStorage.setItem("cartItems", JSON.stringify(carrinho));

    const contador = document.getElementById('cart-count');
    if (contador) contador.textContent = carrinho.length;

    await Swal.fire({
      icon: "success",
      title: "Peça excluída!",
      text: "A peça foi removida com sucesso.",
      confirmButtonColor: "#394725",
    });

    document.getElementById("botao-buscar").click();
  } catch {
    Swal.fire({
      icon: "error",
      title: "Erro ao excluir",
      text: "Não foi possível excluir a peça. Tente novamente.",
      confirmButtonColor: "#394725",
    });
  }
}
