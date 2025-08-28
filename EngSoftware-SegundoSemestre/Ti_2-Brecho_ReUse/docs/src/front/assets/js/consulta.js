const API_URL = "http://localhost:8080";

async function consultarCliente() {
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;

  const params = new URLSearchParams();
  if (nome) params.append("nome", nome);
  if (cpf) params.append("cpf", cpf);
  if (email) params.append("email", email);

  try {
    const response = await fetch(`${API_URL}/usuarios/verificar?${params.toString()}`);

    if (response.ok) {
      await Swal.fire({
        title: 'Cliente encontrado',
        text: 'Você será redirecionado para login.',
        icon: 'success',
        confirmButtonText: 'Ok',
        background: '#f9f7f2',
        color: '#394527',
        confirmButtonColor: '#394725',
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          content: 'custom-swal-content',
          confirmButton: 'custom-swal-confirm-button'
        },
        buttonsStyling: false,
      });
      localStorage.setItem("aba", "login");
      window.location.href = "Cadastro-Usuario.html";

    } else {
      await Swal.fire({
        title: 'Cliente não encontrado',
        text: 'Você será redirecionado para cadastro.',
        icon: 'warning',
        confirmButtonText: 'Ok',
        background: '#f9f7f2',
        color: '#394527',
        confirmButtonColor: '#394725',
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          content: 'custom-swal-content',
          confirmButton: 'custom-swal-confirm-button'
        },
        buttonsStyling: false,
      });
      localStorage.setItem("aba", "cadastro");
      window.location.href = "Cadastro-Usuario.html";
    }
  } catch (error) {
    await Swal.fire({
      title: 'Erro',
      text: `Erro ao consultar cliente: ${error.message}`,
      icon: 'error',
      confirmButtonText: 'Ok',
      background: '#f9f7f2',
      color: '#394527',
      confirmButtonColor: '#394725',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        content: 'custom-swal-content',
        confirmButton: 'custom-swal-confirm-button'
      },
      buttonsStyling: false,
    });
    console.error("Erro na consulta:", error);
  }
}
