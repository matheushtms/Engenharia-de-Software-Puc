document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-cadastro-peca");
  const imageUploadDiv = document.querySelector(".image-upload");

  // Campo hidden com URL da imagem
  let imagemUrlInput = document.createElement("input");
  imagemUrlInput.type = "hidden";
  imagemUrlInput.name = "imagemUrl";
  form.appendChild(imagemUrlInput);

  // Modal
  const modal = document.getElementById("modal-url-imagem");
  const inputUrl = document.getElementById("input-url-imagem");
  const confirmarBtn = document.getElementById("confirmar-url");
  const cancelarBtn = document.getElementById("cancelar-url");

  imageUploadDiv.addEventListener("click", (event) => {
    event.preventDefault();
    inputUrl.value = "";
    modal.style.display = "flex";
  });

  confirmarBtn.onclick = () => {
    const url = inputUrl.value.trim();
    if (url) {
      imagemUrlInput.value = url;

      let previewImg = imageUploadDiv.querySelector("img.preview");
      if (!previewImg) {
        previewImg = document.createElement("img");
        previewImg.classList.add("preview");
        previewImg.style.display = "block";
        previewImg.style.marginTop = "10px";
        previewImg.style.maxWidth = "150px";
        previewImg.style.maxHeight = "150px";
        imageUploadDiv.appendChild(previewImg);
      }
      previewImg.src = url;
    }
    modal.style.display = "none";
  };

  cancelarBtn.onclick = () => {
    modal.style.display = "none";
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuario || !usuario.id) {
      return Swal.fire({
        icon: "error",
        title: "Usuário não identificado",
        text: "Faça login novamente para cadastrar uma peça.",
        confirmButtonColor: "#394725",
      });
    }

    const formData = new FormData(form);
    const imagemUrl = imagemUrlInput.value;

    if (!imagemUrl || !/^https?:\/\//i.test(imagemUrl)) {
      return Swal.fire({
        icon: "warning",
        title: "Imagem inválida",
        text: "Insira uma URL válida clicando no ícone de imagem.",
        confirmButtonColor: "#394725",
      });
    }

    const data = {
      nome: formData.get("nome"),
      categoria: formData.get("categoria"),
      descricao: formData.get("descricao"),
      preco: 2,
      tamanho: formData.get("tamanho"),
      condicao: formData.get("condicao"),
      genero: formData.get("cor"),
      imagem: imagemUrl,
      usuarioId: usuario.id,
      modalidade: formData.get("modalidade") || "Não especificado",
    };

    if (!data.nome || !data.categoria || !data.descricao || !data.tamanho || !data.condicao || !data.genero) {
      return Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios",
        text: "Todos os campos devem ser preenchidos.",
        confirmButtonColor: "#394725",
      });
    }

    try {
      const response = await fetch("http://localhost:8080/pecas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "Peça cadastrada!",
          text: "Sua peça foi registrada com sucesso.",
          confirmButtonColor: "#394725",
        });
        window.location.href = "consultaPeca.html";
      } else {
        const erro = await response.text();
        Swal.fire({
          icon: "error",
          title: "Erro ao cadastrar",
          text: erro || "Verifique os dados e tente novamente.",
          confirmButtonColor: "#394725",
        });
      }
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
      Swal.fire({
        icon: "error",
        title: "Erro de conexão",
        text: "Não foi possível conectar ao servidor.",
        confirmButtonColor: "#394725",
      });
    }
  });
});
