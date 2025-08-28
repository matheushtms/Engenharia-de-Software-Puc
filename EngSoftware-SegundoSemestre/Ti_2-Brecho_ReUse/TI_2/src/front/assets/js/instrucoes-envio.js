// só redireciona para a próxima página
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('button.confirm');
  btn.addEventListener('click', () => {
    window.location.href = 'confirmar-envio.html';
  });
});
