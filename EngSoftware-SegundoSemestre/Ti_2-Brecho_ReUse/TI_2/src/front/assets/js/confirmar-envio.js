// confirmar-envio.js

function confirmarEnvio() {
  const rastreamentoInput = document.getElementById('rastreamento');
  const code = rastreamentoInput.value.trim();

  // Validação
  if (!code) {
    Swal.fire({
      icon: 'warning',
      title: 'Campo vazio',
      text: 'Por favor, insira um número de rastreamento válido.',
      confirmButtonColor: '#394725'
    });
    rastreamentoInput.focus();
    return;
  }

  // Salvar código no localStorage
  localStorage.setItem('correiosCode', code);
  console.log(localStorage.getItem('correiosCode'));

  // Alerta de sucesso com redirecionamento
  Swal.fire({
    icon: 'success',
    title: 'Envio confirmado!',
    text: 'Número de rastreamento salvo com sucesso.',
    confirmButtonText: 'Voltar para a Home',
    confirmButtonColor: '#394725'
  }).then(() => {
    window.location.href = 'Home-Page.html';
  });
}
