const API_URL = "http://localhost:8080";
const token = localStorage.getItem("token");
const id = localStorage.getItem("usuarioId");

if (!token || !id) {
  Swal.fire({
    title: 'Acesso negado!',
    text: 'Você precisa estar logado.',
    icon: 'warning',
    confirmButtonColor: '#394725',
    background: '#f8f6f0',
    color: '#2e2e2e'
  }).then(() => {
    window.location.href = "Cadastro-Usuario.html";
  });
}

async function carregarDados() {
  try {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) throw new Error("Erro ao buscar dados.");

    const usuario = await response.json();
    localStorage.setItem("usuarioId", usuario.id);

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

    if (usuario.fotoUrl) {
      document.getElementById("fotoPerfil").src = usuario.fotoUrl;
    }
  } catch (error) {
    Swal.fire({
      title: 'Erro!',
      text: error.message,
      icon: 'error',
      confirmButtonColor: '#394725',
      background: '#f8f6f0',
      color: '#2e2e2e'
    });
  }
}

// 🔄 Busca automática ao digitar o CEP
document.getElementById("cep").addEventListener("blur", async () => {
  const cep = document.getElementById("cep").value.replace(/\D/g, "");

  if (cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) throw new Error("Erro ao buscar CEP.");

      const data = await response.json();
      if (data.erro) throw new Error("CEP não encontrado.");

      document.getElementById("rua").value = data.logradouro || "";
      document.getElementById("bairro").value = data.bairro || "";
      document.getElementById("cidade").value = data.localidade || "";
      document.getElementById("estado").value = data.uf || "";

    } catch (error) {
      Swal.fire({
        title: 'Erro no CEP!',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#394725'
      });
    }
  }
});

document.getElementById("uploadFoto").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("fotoPerfil").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("formEdicao").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    cpf: document.getElementById("cpf").value,
    dataNascimento: document.getElementById("dataNascimento").value,
    telefone: document.getElementById("telefone").value,
    cep: document.getElementById("cep").value,
    rua: document.getElementById("rua").value,
    numero: document.getElementById("numero").value,
    complemento: document.getElementById("complemento").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    estado: document.getElementById("estado").value,
  };

  try {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const erro = await response.text();
      throw new Error(erro);
    }

    const fileInput = document.getElementById("uploadFoto");
    if (fileInput.files.length > 0) {
      const formImage = new FormData();
      formImage.append("arquivo", fileInput.files[0]);

      const fotoResponse = await fetch(`${API_URL}/usuarios/${id}/foto`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formImage
      });

      if (!fotoResponse.ok) {
        const erro = await fotoResponse.text();
        throw new Error("Erro ao enviar foto: " + erro);
      }
    }

    Swal.fire({
      title: 'Perfil atualizado!',
      text: 'Seus dados foram salvos com sucesso.',
      icon: 'success',
      confirmButtonColor: '#394725',
      background: '#f8f6f0',
      color: '#2e2e2e'
    }).then(() => {
      window.location.href = "perfil.html";
    });

  } catch (error) {
    Swal.fire({
      title: 'Erro!',
      text: "Erro ao atualizar: " + error.message,
      icon: 'error',
      confirmButtonColor: '#394725',
      background: '#f8f6f0',
      color: '#2e2e2e'
    });
  }
});

carregarDados();
