const API_URL = "http://localhost:8080";

// Verificação de e-mail e CPF
document.getElementById("formVerificacao").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const cpf = document.getElementById("cpf").value.trim();

  if (!email || !cpf) {
    return Swal.fire({
      icon: 'warning',
      title: 'Campos obrigatórios',
      text: 'Preencha todos os campos.',
      confirmButtonColor: '#394725'
    });
  }

  try {
    const response = await fetch(`${API_URL}/usuarios/verificar?email=${email}&cpf=${cpf}`);
    const msg = await response.text();

    if (!response.ok) {
      return Swal.fire({
        icon: 'error',
        title: 'Erro na verificação',
        text: msg,
        confirmButtonColor: '#394725'
      });
    }

    await Swal.fire({
      icon: 'success',
      title: 'Verificação concluída',
      text: msg,
      confirmButtonColor: '#394725'
    });

    // Exibe o formulário de nova senha
    document.getElementById("formVerificacao").style.display = "none";
    document.getElementById("formAtualizarSenha").style.display = "flex";
    localStorage.setItem("emailRecuperacao", email);

  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Erro de conexão',
      text: 'Verifique sua conexão ou tente novamente.',
      confirmButtonColor: '#394725'
    });
  }
});

// Atualização da nova senha
document.getElementById("formAtualizarSenha").addEventListener("submit", async (e) => {
  e.preventDefault();

  const senha = document.getElementById("password").value;
  const confirmacao = document.getElementById("password-confirmation").value;
  const email = localStorage.getItem("emailRecuperacao");

  if (!senha || senha.length < 6) {
    return Swal.fire({
      icon: 'warning',
      title: 'Senha inválida',
      text: 'A senha deve ter no mínimo 6 caracteres.',
      confirmButtonColor: '#394725'
    });
  }

  if (senha !== confirmacao) {
    return Swal.fire({
      icon: 'error',
      title: 'Senhas diferentes',
      text: 'As senhas precisam ser iguais.',
      confirmButtonColor: '#394725'
    });
  }

  try {
    const response = await fetch(`${API_URL}/usuarios/redefinir-senha`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    const msg = await response.text();

    if (response.ok) {
      await Swal.fire({
        icon: 'success',
        title: 'Senha atualizada!',
        text: msg,
        confirmButtonText: 'Ir para o Login',
        confirmButtonColor: '#394725'
      });

      localStorage.removeItem("emailRecuperacao");
      window.location.href = "Cadastro-Usuario.html";
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: msg,
        confirmButtonColor: '#394725'
      });
    }

  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Erro de conexão',
      text: 'Erro ao atualizar a senha. Tente novamente.',
      confirmButtonColor: '#394725'
    });
  }
});
