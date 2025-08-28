// Evento de clique no botão "Voltar"
document.getElementById('voltarBtn').addEventListener('click', function() {
    window.location.href = '../index.html';  // Redireciona para a página index.html
});

// Dados das categorias
const categoriasData = {
    "categorias": [
        {
            "nome": "Visão Geral",
            "valor": 1,
            "imagem": "images/icons8-gráfico-50.png"
        },
        {
            "nome": "Assinaturas",
            "valor": 120,
            "imagem": "images/monitor-de-tv.png"
        },
        {
            "nome": "Lazer",
            "valor": 250,
            "imagem": "images/icons8-cocktail-de-coco-50.png"
        },
        {
            "nome": "Alimentação",
            "valor": 80,
            "imagem": "images/icons8-talheres-50.png"
        },
        {
            "nome": "Cuidados Pessoais",
            "valor": 45,
            "imagem": "images/icons8-usuário-50.png"
        },
        {
            "nome": "Automóveis",
            "valor": 1,
            "imagem": "images/icons8-automóvel-50.png"
        },
        {
            "nome": "Compras",
            "valor": 300,
            "imagem": "images/icons8-sacola-de-compras-64.png"
        },
        {
            "nome": "Casa",
            "valor": 1,
            "imagem": "images/icons8-casa-64.png"
        },
        {
            "nome": "Dívidas",
            "valor": 150,
            "imagem": "images/perceber.png"
        },
        {
            "nome": "Estudos",
            "valor": 75,
            "imagem": "images/bone (1).png"
        }
    ]
};

// Função para carregar categorias
function carregarCategorias() {
    const listaCategorias = document.getElementById('listaCategorias');
    
    listaCategorias.innerHTML = '';

    // Carrega as categorias
    categoriasData.categorias.forEach(categoria => {
        if (categoria.valor > 0) {
            const divCategoria = document.createElement('div');
            divCategoria.className = 'categorias';
            divCategoria.setAttribute('data-valor', categoria.valor);
            divCategoria.innerHTML = `
                <img src="${categoria.imagem}" alt="${categoria.nome}">
                <button>${categoria.nome}</button>
            `;
            listaCategorias.appendChild(divCategoria);
        }
    });
}

// Chama a função para carregar as categorias
carregarCategorias();
