document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  const form = document.getElementById("form-cadastro-peca");

  if (!id || !usuario) {
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: 'Peça ou usuário não identificados.',
      confirmButtonColor: '#394725'
    }).then(() => {
      window.location.href = "consultaPeca.html";
    });
    return;
  }

  // Preenche os campos com os dados da peça
  fetch(`http://localhost:8080/pecas/${id}`)
    .then((res) => res.json())
    .then((data) => {
      form.nome.value = data.nome;
      form.categoria.value = data.categoria;
      form.tamanho.value = data.tamanho;
      form.condicao.value = data.condicao;
      form.cor.value = data.genero;
      form.descricao.value = data.descricao;
      form.usuarioId.value = usuario.id;
    })
    .catch((err) => {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao carregar a peça.',
        confirmButtonColor: '#394725'
      });
    });

  // Excluir com SweetAlert
  document.querySelector(".lixeira-btn").addEventListener("click", async () => {
    const confirmacao = await Swal.fire({
      title: 'Deseja excluir esta peça?',
      text: 'Essa ação não poderá ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#394725',
      cancelButtonColor: '#aaa'
    });

    if (!confirmacao.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:8080/pecas/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Erro ao excluir.");

      await Swal.fire({
        icon: 'success',
        title: 'Peça excluída!',
        text: 'A peça foi removida com sucesso.',
        confirmButtonColor: '#394725'
      });

      window.location.href = "consultaPeca.html";

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Não foi possível excluir a peça.',
        confirmButtonColor: '#394725'
      });
    }
  });

  // Editar
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
      nome: form.nome.value,
      categoria: form.categoria.value,
      descricao: form.descricao.value,
      preco: 10.0,
      tamanho: form.tamanho.value,
      condicao: form.condicao.value,
      genero: form.cor.value,
      modalidade: "Não especificado",
      imagem: "imagem_default.png",
      usuarioId: parseInt(form.usuarioId.value)
    };

    try {
      const res = await fetch(`http://localhost:8080/pecas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Peça atualizada!',
          text: 'As informações foram salvas com sucesso.',
          confirmButtonColor: '#394725'
        });

        window.location.href = "consultaPeca.html";

      } else {
        const erro = await res.text();
        Swal.fire({
          icon: 'error',
          title: 'Erro ao atualizar',
          text: erro || 'Verifique os dados e tente novamente.',
          confirmButtonColor: '#394725'
        });
      }

    } catch (err) {
      console.error("Erro:", err);
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao conectar com o servidor.',
        confirmButtonColor: '#394725'
      });
    }
  });
});
