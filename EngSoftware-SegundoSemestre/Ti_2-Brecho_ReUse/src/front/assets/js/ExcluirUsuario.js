const API_URL = "http://localhost:8080";
const token = localStorage.getItem("token");
const usuarioId = localStorage.getItem("usuarioId");

if (!token) {
  alert("Você precisa estar logado.");
  window.location.href = "login.html";
}

document.querySelector(".submit").addEventListener("click", async () => {
  const senha = document.querySelectorAll("input")[0].value;
  const confirmarSenha = document.querySelectorAll("input")[1].value;

  if (!senha || !confirmarSenha) {
    alert("Preencha todos os campos.");
    return;
  }

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  const email = getEmailFromToken(token);

  try {
    // Verifica se a senha está correta fazendo login
    const loginRes = await fetch(`${API_URL}/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    if (!loginRes.ok) {
      alert("Senha incorreta.");
      return;
    }

    // Se ok, realiza exclusão
    const deleteRes = await fetch(`${API_URL}/usuarios/${usuarioId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (deleteRes.ok) {
      localStorage.clear();
      window.location.href = "ConfirmarExclusaoRoupa.html";
    } else {
      const msg = await deleteRes.text();
      alert("Erro ao excluir: " + msg);
    }
  } catch (error) {
    alert("Erro ao excluir. Tente novamente.");
  }
});

function getEmailFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub;
  } catch {
    return null;
  }
}
