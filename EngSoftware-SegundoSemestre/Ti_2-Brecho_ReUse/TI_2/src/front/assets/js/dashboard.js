const API_URL = "http://localhost:8080";
const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", () => {
  protegerAcessoDashboard();
  carregarDashboard();
});

// Função para proteger o acesso ao painel, garantindo que o usuário esteja autenticado e tenha a permissão de ADMIN
function protegerAcessoDashboard() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "login.html";
      return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload?.role;

    if (role !== "ROLE_ADMIN") {
      Swal.fire({
        title: "Acesso negado!",
        text: "Você não tem permissão para acessar o painel de administrador.",
        icon: "error",
        confirmButtonColor: "#394725"
      }).then(() => {
        window.location.href = "Home-Page.html";
      });
    }
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    window.location.href = "Home-Page.html";
  }
}

// Função para carregar os dados da dashboard
function carregarDashboard() {
  if (!token) {
    alert("Token ausente. Faça login.");
    window.location.href = "Cadastro-Usuario.html";
    return;
  }

  // Exibe a mensagem de atualização enquanto os dados são carregados
  exibirMensagemDeAtualizacao("Carregando...");

  fetch(`${API_URL}/dashboard/estatisticas`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.status);
      }
      return response.json();
    })
    .then(dados => {
      atualizarIndicadores(dados);
      exibirMensagemDeAtualizacao("Última atualização: " + obterDataAtual());
    })
    .catch(erro => {
      console.error("Erro ao carregar estatísticas:", erro);
      mostrarErroNaTela();
      exibirMensagemDeAtualizacao("Falha ao carregar dados.");
    });
}

// Função para atualizar os indicadores na dashboard
function atualizarIndicadores(dados) {
  const totalVendidas = dados.totalVendidas ?? 0;
  const totalArrecadado = dados.totalArrecadado ?? 0;
  const percentualVendidas = dados.percentualVendidas ?? 0;
  const percentualDoadas = dados.percentualDoadas ?? 0;
  const ticketMedio = dados.ticketMedio ?? 0;
  const taxaConversao = dados.taxaConversao ?? 0;

  // 🧺 Total vendidas
  document.getElementById("totalVendidas").innerText = totalVendidas;

  // 💰 Total arrecadado
  document.getElementById("totalArrecadado").innerText = formatarReal(totalArrecadado);

  // 📈 Percentual vendido
  const barraV = document.getElementById("barraPercentual");
  const textoV = document.getElementById("textoPercentual");
  textoV.innerText = percentualVendidas.toFixed(1) + "%";
  barraV.style.width = percentualVendidas.toFixed(0) + "%";
  barraV.style.backgroundColor = getCorPorPercentual(percentualVendidas);

  // 🎁 Percentual doado
  const barraD = document.getElementById("barraDoado");
  const textoD = document.getElementById("textoDoado");
  textoD.innerText = percentualDoadas.toFixed(1) + "%";
  barraD.style.width = percentualDoadas.toFixed(0) + "%";
  barraD.style.backgroundColor = getCorPorPercentual(percentualDoadas);

  // 💳 Ticket médio
  document.getElementById("ticketMedio").innerText = formatarReal(ticketMedio);

  // 📊 Taxa de Conversão
  document.getElementById("taxaConversao").innerText = taxaConversao.toFixed(2) + "%"; // Exibe a taxa de conversão
}

// Função para formatar valores em Real (R$)
function formatarReal(valor) {
  return "R$ " + Number(valor).toFixed(2).replace(".", ",");
}

// Função para obter a cor dependendo do percentual
function getCorPorPercentual(valor) {
  if (valor <= 30) return "#d9534f";    // vermelho
  if (valor < 70) return "#f0ad4e";      // amarelo
  return "#5b7c5d";                      // verde
}

// Função para exibir mensagem de atualização (ex: "Carregando...", "Última atualização: ...")
function exibirMensagemDeAtualizacao(texto) {
  const elemento = document.getElementById("atualizacao");
  if (elemento) {
    elemento.innerText = texto;
  }
}

// Função para mostrar um erro caso não consiga carregar os dados
function mostrarErroNaTela() {
  document.getElementById("totalVendidas").innerText = "Erro";
  document.getElementById("totalArrecadado").innerText = "Erro";
  document.getElementById("textoPercentual").innerText = "Erro";
  document.getElementById("textoDoado").innerText = "Erro";
  document.getElementById("ticketMedio").innerText = "Erro";
  document.getElementById("taxaConversao").innerText = "Erro";
}

// Função para obter a data e hora atual
function obterDataAtual() {
  const agora = new Date();
  const dia = String(agora.getDate()).padStart(2, "0");
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const ano = agora.getFullYear();
  const hora = String(agora.getHours()).padStart(2, "0");
  const minuto = String(agora.getMinutes()).padStart(2, "0");
  return `${dia}/${mes}/${ano} às ${hora}:${minuto}`;
}
