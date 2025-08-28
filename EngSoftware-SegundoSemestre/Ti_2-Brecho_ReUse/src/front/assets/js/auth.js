// Salva o token
function saveToken(token) {
    localStorage.setItem("token", token);
  }
  
  // Recupera o token
  function getToken() {
    return localStorage.getItem("token");
  }
  
  // Remove token (logout)
  function logout() {
    localStorage.removeItem("token");
    window.location.href = "cadastro-usuario.html"; // tela de login
  }
  
  // Verifica se usuário está autenticado
  function isAuthenticated() {
    return !!getToken();
  }
  