const API_URL = "http://localhost:8080";
const PLATFORM_MARGIN = 1.10;

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('card-container');
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  const inputName = document.getElementById('filtro-nome');
  const selectCategoria = document.getElementById('filter-categoria');
  const selectTamanho = document.getElementById('filter-tamanho');
  const selectCondicao = document.getElementById('filter-condicao');
  const selectCor = document.getElementById('filter-cor');

  if (!container || !usuario) return;

  buscarPecas();

  [inputName, selectCategoria, selectTamanho, selectCondicao, selectCor].forEach(el => {
    el.addEventListener('input', buscarPecas);
    el.addEventListener('change', buscarPecas);
  });

  async function buscarPecas() {
    try {
      const res = await fetch(`${API_URL}/pecas/with-modalidade`);
      const pecas = await res.json();

      const carrinho = JSON.parse(localStorage.getItem('cartItems')) || [];
      const idsNoCarrinho = carrinho.map(item => item.id);

      const filtros = {
        nome: inputName.value.toLowerCase().trim(),
        categoria: selectCategoria.value.toLowerCase().trim(),
        tamanho: selectTamanho.value.toLowerCase().trim(),
        condicao: selectCondicao.value.toLowerCase().trim(),
        cor: selectCor.value.toLowerCase().trim(),
      };

      const filtradas = pecas.filter(peca => {
        if (idsNoCarrinho.includes(peca.id)) return false;
        if ((peca.modalidade || "").toLowerCase() === "vendida") return false;

        return (!filtros.nome || (peca.nome || "").toLowerCase().includes(filtros.nome)) &&
               (!filtros.categoria || (peca.categoria || "").toLowerCase() === filtros.categoria) &&
               (!filtros.tamanho || (peca.tamanho || "").toLowerCase() === filtros.tamanho) &&
               (!filtros.condicao || (peca.condicao || "").toLowerCase() === filtros.condicao) &&
               (!filtros.cor || (peca.genero || "").toLowerCase() === filtros.cor);
      });

      exibirPecas(filtradas);
    } catch (err) {
      console.error("Erro ao buscar peças:", err);
    }
  }

  function exibirPecas(pecas) {
    container.innerHTML = "";
    if (pecas.length === 0) {
      container.innerHTML = `<p style="text-align:center;">Nenhuma peça encontrada.</p>`;
      return;
    }

    pecas.forEach(peca => {
      const precoFinal = calcularValorSugerido(peca) * PLATFORM_MARGIN;

      // Atualiza o preço da peça no backend
      fetch(`${API_URL}/pecas/${peca.id}/preco`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ preco: precoFinal.toFixed(2) })
      }).catch(err => console.error(`Erro ao atualizar preço da peça ${peca.id}:`, err));

      const card = document.createElement('div');
      card.className = 'card';

      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'img-placeholder';

      const img = document.createElement('img');
      img.src = peca.imagem || 'https://via.placeholder.com/300x300?text=Imagem+Indisponível';
      img.alt = peca.nome || 'Peça';

      imgWrapper.appendChild(img);

      const info = document.createElement('div');
      info.className = 'info';

      info.innerHTML = `
        <h4>${peca.nome}</h4>
        <p>Categoria: ${peca.categoria}</p>
        <p>Tamanho: ${peca.tamanho}</p>
        <p>Conservação: ${peca.condicao}</p>
        <p>Cor: ${peca.genero}</p>
        <p class="price">R$ ${precoFinal.toFixed(2).replace('.', ',')}</p>
      `;

      const btn = document.createElement('button');
      btn.className = 'add-to-cart-btn';
      btn.textContent = 'Adicionar ao carrinho';
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        adicionarAoCarrinho(peca, precoFinal);
      });

      if (peca.usuarioId !== usuario.id) {
        info.appendChild(btn);
      } else {
        const aviso = document.createElement('p');
        aviso.textContent = 'Essa peça é sua';
        aviso.style.fontStyle = 'italic';
        aviso.style.color = '#888';
        info.appendChild(aviso);
      }

      card.append(imgWrapper, info);
      card.addEventListener('click', () => {
        const precoFinal = calcularValorSugerido(peca) * PLATFORM_MARGIN;
        window.location.href = `detalhePeca.html?id=${peca.id}&origem=home&preco=${precoFinal.toFixed(2)}`;
      });

      container.appendChild(card);
    });
  }

  function adicionarAoCarrinho(peca, preco) {
    const carrinho = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (carrinho.some(item => item.id === peca.id)) return;

    carrinho.push({
      id: peca.id,
      nome: peca.nome,
      preco: preco,
      imagem: peca.imagem,
      categoria: peca.categoria,
      tamanho: peca.tamanho,
      condicao: peca.condicao,
      genero: peca.genero
    });

    localStorage.setItem('cartItems', JSON.stringify(carrinho));
    buscarPecas();
  }

  function calcularValorSugerido(peca) {
    const base = { camisa: 22, calça: 32, jaqueta: 42, vestido: 38, acessorio: 18 };
    const corMultip = { preto: 1.3, branco: 1.25, azul: 1.2, vermelho: 1.15, verde: 1.1, amarelo: 1.05, rosa: 1.03, multicolorido: 1.0 };
    const condMult = { novo: 1.5, "semi-novo": 1.2, usado: 1.0 };

    const tipo = (peca.categoria || "").toLowerCase();
    const cor = (peca.genero || "").toLowerCase();
    const cond = (peca.condicao || "").toLowerCase();

    return (base[tipo] || 20) * (corMultip[cor] || 1) * (condMult[cond] || 1);
  }
});
