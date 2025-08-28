document.getElementById("metasForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const dataInicio = document.getElementById("dataInicio").value;
    const dataConclusao = document.getElementById("dataConclusao").value;
    const categoria = document.getElementById("categoria").value;
    const valorObjetivo = document.getElementById("valorObjetivo").value;
    const iconeMeta = document.getElementById("iconeMeta").files[0];
    const ignorarIcone = document.getElementById("ignorarIcone").checked;

    const meta = {
        nome,
        descricao,
        dataInicio,
        dataConclusao,
        categoria,
        valorObjetivo,
        iconeMeta: (iconeMeta && !ignorarIcone) ? URL.createObjectURL(iconeMeta) : null
    };

    sessionStorage.setItem('metaFinanceira', JSON.stringify(meta));
    
    exibirCard(meta);
});

function exibirCard(meta) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const card = document.createElement("div");
    card.classList.add("card");

    const icone = meta.iconeMeta ? `<img src="${meta.iconeMeta}" alt="Ícone da Meta">` : "<p><em>Sem ícone</em></p>";
    card.innerHTML = `
        <h2>${meta.nome}</h2>
        <p><strong>Descrição:</strong> ${meta.descricao}</p>
        <p><strong>Data Início:</strong> ${meta.dataInicio}</p>
        <p><strong>Data Conclusão:</strong> ${meta.dataConclusao}</p>
        <p><strong>Categoria:</strong> ${meta.categoria}</p>
        <p><strong>Valor do Objetivo:</strong> R$${meta.valorObjetivo}</p>
        ${icone}
    `;

    cardContainer.appendChild(card);
}

window.onload = function() {
    const metaSalva = sessionStorage.getItem('metaFinanceira');
    if (metaSalva) {
        const meta = JSON.parse(metaSalva);
        exibirCard(meta);
    }
};
