const API_URL = "http://localhost:8080";
const token = localStorage.getItem("token");

if (!token) {
  Swal.fire({
    title: 'Acesso negado!',
    text: 'Você precisa estar logado.',
    icon: 'warning',
    confirmButtonColor: '#394725',
    background: '#f8f6f0',
    color: '#2e2e2e'
  }).then(() => {
    window.location.href = "login.html";
  });
}

async function carregarPerfil() {
  try {
    const id = localStorage.getItem("usuarioId");

    if (!id) throw new Error("ID do usuário não encontrado.");

    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("Erro ao buscar dados do usuário.");

    const usuario = await response.json();

    document.getElementById("nome").value = usuario.nome || "";
    document.getElementById("email").value = usuario.email || "";
    document.getElementById("cpf").value = usuario.cpf || "";
    document.getElementById("dataNascimento").value = usuario.dataNascimento || "";
    document.getElementById("telefone").value = usuario.telefone || "";
    document.getElementById("cep").value = usuario.cep || "";
    document.getElementById("rua").value = usuario.rua || "";
    document.getElementById("numero").value = usuario.numero || "";
    document.getElementById("complemento").value = usuario.complemento || "";
    document.getElementById("bairro").value = usuario.bairro || "";
    document.getElementById("cidade").value = usuario.cidade || "";
    document.getElementById("estado").value = usuario.estado || "";

    const foto = usuario.fotoUrl;
    const img = document.getElementById("fotoPerfil");
    if (foto && img) {
      img.src = foto;
    }

    if (usuario.id) {
      localStorage.setItem("usuarioId", usuario.id);
    }

  } catch (error) {
    Swal.fire({
      title: 'Erro!',
      text: error.message || "Erro ao carregar o perfil.",
      icon: 'error',
      confirmButtonColor: '#394725',
      background: '#f8f6f0',
      color: '#2e2e2e'
    });
  }
}

function exibirBotaoDashboard() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload?.role;

    const btn = document.getElementById("adminDashboardBtn");
    if (btn) {
      btn.style.display = (role === "ROLE_ADMIN") ? "inline-block" : "none";
    }
  } catch (error) {
    console.error("Erro ao verificar role do token:", error);
  }
}

function irParaEdicao() {
  window.location.href = "editar-perfil.html";
}

async function excluirUsuario() {
  const confirmacao = await Swal.fire({
    title: 'Tem certeza?',
    text: 'Essa ação não poderá ser desfeita!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#394725',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar',
    background: '#f8f6f0',
    color: '#2e2e2e'
  });

  if (!confirmacao.isConfirmed) return;

  const id = localStorage.getItem("usuarioId");

  try {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.ok) {
      Swal.fire({
        title: 'Conta excluída!',
        text: 'Sentiremos sua falta na ReUse!',
        icon: 'success',
        confirmButtonColor: '#394725',
        background: '#f8f6f0',
        color: '#2e2e2e'
      }).then(() => {
        localStorage.clear();
        window.location.href = "Cadastro-Usuario.html";
      });
    } else {
      const erro = await response.text();
      throw new Error(erro);
    }

  } catch (error) {
    Swal.fire({
      title: 'Erro!',
      text: error.message || 'Erro ao excluir a conta.',
      icon: 'error',
      confirmButtonColor: '#394725',
      background: '#f8f6f0',
      color: '#2e2e2e'
    });
  }
}

function logoutUsuario() {
  Swal.fire({
    title: 'Sair da conta?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#394725',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sair',
    cancelButtonText: 'Cancelar',
    background: '#f8f6f0',
    color: '#2e2e2e'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      window.location.href = "Cadastro-Usuario.html";
    }
  });
}

carregarPerfil();
exibirBotaoDashboard();
