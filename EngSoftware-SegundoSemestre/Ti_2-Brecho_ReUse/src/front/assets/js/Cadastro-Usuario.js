const API_URL = "http://localhost:8080";

// Trocar abas ao carregar
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("registerTab").click();

  document.getElementById('loginTab').addEventListener('click', () => {
    document.getElementById('loginTab').classList.add('active');
    document.getElementById('registerTab').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('registerForm').classList.remove('active');
  });

  document.getElementById('registerTab').addEventListener('click', () => {
    document.getElementById('registerTab').classList.add('active');
    document.getElementById('loginTab').classList.remove('active');
    document.getElementById('registerForm').classList.add('active');
    document.getElementById('loginForm').classList.remove('active');
  });

  const aba = localStorage.getItem("aba");
  if (aba === "login") document.getElementById("loginTab").click();
  else if (aba === "cadastro") document.getElementById("registerTab").click();
  localStorage.removeItem("aba");

  if (localStorage.getItem("termosAceitos") === "true") {
    document.getElementById("terms").checked = true;
  }

  const dadosCadastro = JSON.parse(localStorage.getItem("dadosCadastro"));
  if (dadosCadastro) {
    document.getElementById("email").value = dadosCadastro.email;
    document.getElementById("nome").value = dadosCadastro.nome;
    document.getElementById("cpf").value = dadosCadastro.cpf;
    document.getElementById("birthdate").value = dadosCadastro.dataNascimento;
  }
});

// Mostrar/esconder senha
function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  input.type = input.type === 'password' ? 'text' : 'password';
}

// Ativar botão com os termos
document.getElementById('terms').addEventListener('change', () => {
  document.getElementById('confirmBtn').disabled = !document.getElementById('terms').checked;
});

// Alternar entre Pix e Cartão
document.getElementById('pixOption').addEventListener('change', () => {
  document.getElementById('pixFields').classList.add('show');
  document.getElementById('cardFields').classList.remove('show');
});
document.getElementById('cardOption').addEventListener('change', () => {
  document.getElementById('cardFields').classList.add('show');
  document.getElementById('pixFields').classList.remove('show');
});

// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;

  try {
    const response = await fetch(`${API_URL}/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) throw new Error("E-mail ou senha inválidos");

const data = await response.json();

if (!data.usuario.role && data.role) {
  data.usuario.role = data.role;
}

localStorage.setItem("token", data.token);
localStorage.setItem("usuarioLogado", JSON.stringify(data.usuario));
localStorage.setItem("usuarioId", data.usuario.id);


    Swal.fire({
      title: "Login realizado com sucesso!",
      icon: "success",
      confirmButtonText: "Ir para a Home",
      confirmButtonColor: "#394725"
    }).then(() => {
      window.location.href = "Home-Page.html";
    });

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erro no login',
      text: error.message || "Erro ao realizar login.",
      confirmButtonColor: '#394725'
    });
  }
});

// CADASTRO
document.getElementById("registerForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();

  const senha = document.getElementById("senha").value;
  const confirmSenha = document.getElementById("confirmSenha").value;

  if (senha !== confirmSenha) {
    return Swal.fire({
      icon: 'error',
      title: 'Senhas diferentes',
      text: 'As senhas precisam ser iguais.',
      confirmButtonColor: '#394725'
    });
  }

  if (!document.getElementById("terms").checked) {
    return Swal.fire({
      icon: 'warning',
      title: 'Termos obrigatórios',
      text: 'Você precisa aceitar os termos para continuar.',
      confirmButtonColor: '#394725'
    });
  }

  const validade = document.getElementById("cardExpiry")?.value || "";
  const [validadeAno, validadeMes] = validade.split("-");

  const usuario = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    senha,
    cpf: document.getElementById("cpf").value,
    dataNascimento: document.getElementById("birthdate").value,
    tipoChavePix: document.getElementById("pixKeyType")?.value || null,
    chavePix: document.getElementById("pixKey")?.value || null,
    numeroCartao: document.getElementById("cardNumber")?.value || null,
    nomeNoCartao: document.getElementById("cardName")?.value || null,
    validadeMes: validadeMes || null,
    validadeAno: validadeAno || null,
    codigoSeguranca: document.getElementById("cardCVC")?.value || null
  };

  try {
    const resposta = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario)
    });

    if (resposta.ok) {
      Swal.fire({
        title: "Cadastro realizado com sucesso!",
        icon: "success",
        confirmButtonText: "Fazer login",
        confirmButtonColor: "#394725"
      }).then(() => {
        document.getElementById("confirmBtn").disabled = true;
        document.getElementById("registerForm").reset();
        document.getElementById("loginTab").click();
        document.getElementById("pixFields").classList.remove("show");
        document.getElementById("cardFields").classList.remove("show");
      });
    } else {
      const erro = await resposta.text();
      Swal.fire({
        icon: 'error',
        title: 'Erro no cadastro',
        text: erro || "Erro desconhecido.",
        confirmButtonColor: '#394725'
      });
    }

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erro de conexão',
      text: 'Não foi possível se conectar ao servidor.',
      confirmButtonColor: '#394725'
    });
  }
});