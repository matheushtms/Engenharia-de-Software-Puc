const API_URL = "http://localhost:8080";
const token = localStorage.getItem("token");
const id = localStorage.getItem("usuarioId");

document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalElement = document.getElementById('total');

  function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems.length === 0) {
      Swal.fire({
        title: 'Carrinho vazio!',
        text: 'Que tal escolher algumas peças incríveis?',
        icon: 'info',
        confirmButtonText: 'Explorar',
        confirmButtonColor: '#394725',
        background: '#f8f6f0',
        color: '#2e2e2e'
      }).then(() => {
        window.location.href = 'Home-Page.html';
      });
      return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cartItems.forEach((item, index) => {
      total += item.preco * (item.quantidade || 1);

      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}">
        <div class="item-info">
          <h4>${item.nome}</h4>
          <p>Categoria: ${item.categoria || 'Não informada'}</p>
          <p>Tamanho: ${item.tamanho || 'Não informado'}</p>
          <p>Conservação: ${item.condicao || 'Não informada'}</p>
          <p>Cor: ${item.genero || 'Não informada'}</p>
        </div>
        <div class="item-price">R$ ${(item.preco * (item.quantidade || 1)).toFixed(2).replace('.', ',')}</div>
        <button class="remove-btn" onclick="removeItem(${index})">✕</button>
      `;

      itemElement.style.cursor = "pointer";
      itemElement.addEventListener("click", (e) => {
        if (!e.target.classList.contains("remove-btn")) {
          window.location.href = `detalhePeca.html?id=${item.id}&origem=carrinho`;
        }
      });

      cartItemsContainer.appendChild(itemElement);
    });

    totalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  }

  // Fora da função
  document.querySelector('.btn-finalizar button').addEventListener('click', async () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems.length === 0) {
      Swal.fire("Carrinho vazio!", "Adicione itens antes de finalizar.", "warning");
      return;
    }

    const pecasIds = cartItems.map(item => item.id);

    try {
      const response = await fetch(`${API_URL}/usuarios/${id}/carrinho`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(pecasIds)
      });

      if (!response.ok) throw new Error("Erro ao sincronizar o carrinho com o servidor.");

      Swal.fire({
        title: 'Carrinho pronto!',
        text: 'Você será redirecionado para finalizar sua compra.',
        icon: 'success',
        confirmButtonColor: '#394725',
        background: '#f8f6f0',
        color: '#2e2e2e'
      }).then(() => {
        window.location.href = 'preencher_endereco.html';
      });

    } catch (error) {
      console.error("Erro ao sincronizar carrinho:", error);
      Swal.fire("Erro!", "Não foi possível preparar sua compra. Tente novamente.", "error");
    }
  });

  loadCartItems();
});

// Função global de remoção
function removeItem(index) {
  Swal.fire({
    title: 'Tem certeza?',
    text: 'Deseja remover este item do carrinho?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#394725',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, remover',
    cancelButtonText: 'Cancelar',
    background: '#f8f6f0',
    color: '#2e2e2e'
  }).then((result) => {
    if (result.isConfirmed) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      Swal.fire({
        title: 'Removido!',
        text: 'O item foi removido do carrinho.',
        icon: 'success',
        confirmButtonColor: '#394725',
        background: '#f8f6f0',
        color: '#2e2e2e'
      }).then(() => {
        location.reload();
      });
    }
  });
}
