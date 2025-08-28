const API_URL = "http://localhost:8080";
const token = localStorage.getItem("token");
const id = localStorage.getItem("usuarioId");

if (!token || !id) {
  Swal.fire({
    title: 'Acesso negado!',
    text: 'Você precisa estar logado.',
    icon: 'warning',
    confirmButtonColor: '#394725'
  }).then(() => window.location.href = "Cadastro-Usuario.html");
}

let dadosUsuario = {}; // será preenchido com dados reais depois

function mostrarCamposPagamento(tipo) {
  document.getElementById("pix-fields").classList.add("hidden");
  document.getElementById("cartao-fields").classList.add("hidden");
  document.getElementById("tipo-pagamento-selecionado").value = tipo;

  if (tipo === "pix") document.getElementById("pix-fields").classList.remove("hidden");
  if (tipo === "cartao") document.getElementById("cartao-fields").classList.remove("hidden");
}

async function carregarDadosUsuario() {
  try {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error("Erro ao buscar dados do usuário");

    const usuario = await response.json();
    dadosUsuario = usuario;

    // Endereço
    document.getElementById("cep").value = usuario.cep || "";
    document.getElementById("rua").value = usuario.rua || "";
    document.getElementById("numero").value = usuario.numero || "";
    document.getElementById("complemento").value = usuario.complemento || "";
    document.getElementById("bairro").value = usuario.bairro || "";
    document.getElementById("cidade").value = usuario.cidade || "";
    document.getElementById("estado").value = usuario.estado || "";

    // Pagamento
    if (usuario.pix) {
      document.getElementById("tipo-chave").value = usuario.pix.tipo || "";
      document.getElementById("chave-pix").value = usuario.pix.chave || "";
      mostrarCamposPagamento("pix");
    } else if (usuario.cartaoCredito) {
      document.getElementById("numero-cartao").value = usuario.cartaoCredito.numero || "";
      document.getElementById("vencimento-cartao").value =
        `${usuario.cartaoCredito.validadeMes}/${usuario.cartaoCredito.validadeAno}`;
      document.getElementById("nome-cartao").value = usuario.cartaoCredito.nomeNoCartao || "";
      document.getElementById("cvv-cartao").value = usuario.cartaoCredito.codigoSeguranca || "";
      mostrarCamposPagamento("cartao");
    }

  } catch (error) {
    Swal.fire("Erro!", error.message, "error");
  }
}

function validarFormulario() {
  const obrigatorios = ["cep", "rua", "numero", "bairro", "cidade", "estado"];
  for (let campo of obrigatorios) {
    if (!document.getElementById(campo).value.trim()) {
      Swal.fire("Atenção", "Preencha todos os campos de endereço!", "warning");
      return false;
    }
  }

  const metodo = document.getElementById("tipo-pagamento-selecionado").value;
  if (!metodo) {
    Swal.fire("Atenção", "Escolha um método de pagamento!", "warning");
    return false;
  }

  if (metodo === "pix") {
    if (!document.getElementById("tipo-chave").value || !document.getElementById("chave-pix").value.trim()) {
      Swal.fire("Atenção", "Informe uma chave Pix válida!", "warning");
      return false;
    }
  } else if (metodo === "cartao") {
    const campos = ["numero-cartao", "vencimento-cartao", "nome-cartao", "cvv-cartao"];
    for (let c of campos) {
      if (!document.getElementById(c).value.trim()) {
        Swal.fire("Atenção", "Preencha todos os campos do cartão!", "warning");
        return false;
      }
    }
  }

  return true;
}

async function finalizarCompra(event) {
  event.preventDefault();
  if (!validarFormulario()) return;

  const endereco = {
    cep: document.getElementById("cep").value,
    rua: document.getElementById("rua").value,
    numero: document.getElementById("numero").value,
    complemento: document.getElementById("complemento").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    estado: document.getElementById("estado").value,
  };

  const metodo = document.getElementById("tipo-pagamento-selecionado").value;

  const pagamento = metodo === "pix"
    ? {
        tipoChavePix: document.getElementById("tipo-chave").value,
        chavePix: document.getElementById("chave-pix").value
      }
    : {
        numeroCartao: document.getElementById("numero-cartao").value,
        validadeMes: document.getElementById("vencimento-cartao").value.split("/")[0],
        validadeAno: document.getElementById("vencimento-cartao").value.split("/")[1],
        nomeNoCartao: document.getElementById("nome-cartao").value,
        codigoSeguranca: document.getElementById("cvv-cartao").value
      };

 const dadosAtualizados = {
  nome: dadosUsuario.nome,
  cpf: dadosUsuario.cpf,
  email: dadosUsuario.email,
  dataNascimento: dadosUsuario.dataNascimento,
  // não inclua a senha aqui se não for alterada
  ...endereco,
  ...pagamento
};

  try {
    const res = await fetch(`${API_URL}/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(dadosAtualizados)
    });

    if (!res.ok) throw new Error("Erro ao atualizar dados do usuário");

    const finalizar = await fetch(`${API_URL}/compras/finalizar/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!finalizar.ok) throw new Error("Erro ao finalizar compra");

    // 🧹 Limpa o carrinho local após a finalização bem-sucedida
    localStorage.removeItem("cartItems");

    Swal.fire({
      title: "Compra finalizada!",
      text: "Seu pedido foi concluído com sucesso.",
      icon: "success",
      confirmButtonColor: "#394725"
    }).then(() => window.location.href = "Home-Page.html");

  } catch (error) {
    Swal.fire("Erro!", error.message, "error");
  }
}

document.getElementById("formEnderecoPagamento").addEventListener("submit", finalizarCompra);
carregarDadosUsuario();
