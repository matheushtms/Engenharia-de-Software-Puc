let selectedIcon = ""; // Variável para armazenar o ícone selecionado

// Função para selecionar um ícone
document.querySelectorAll('#icon-selection button').forEach(button => {
    button.addEventListener('click', function() {
        selectedIcon = this.getAttribute('data-icon'); // Armazena o ícone selecionado
        document.querySelectorAll('#icon-selection button').forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected'); // Marca o botão atual como selecionado
    });
});

// Função para salvar metas no localStorage
document.querySelector('.save-button')?.addEventListener('click', function(event) {
    event.preventDefault();

    const nomeObjetivo = document.getElementById('nome-objetivo').value;
    const dataObjetivo = document.getElementById('data-objetivo').value;
    const descricao = document.getElementById('descricao').value;
    const valorObjetivo = document.getElementById('valor-objetivo').value;
    const valorInicial = document.getElementById('valor-inicial').value;

    if (!nomeObjetivo || !dataObjetivo || !valorObjetivo || !selectedIcon) {
        alert('Por favor, preencha todos os campos e selecione um ícone!');
        return;
    }

    const meta = {
        nome: nomeObjetivo,
        data: dataObjetivo,
        descricao: descricao,
        valor: valorObjetivo,
        valorInicial: valorInicial,
        icone: selectedIcon // Armazena o ícone selecionado
    };

    let metasSalvas = JSON.parse(localStorage.getItem('metas')) || [];
    metasSalvas.push(meta);
    localStorage.setItem('metas', JSON.stringify(metasSalvas));

    alert('Objetivo salvo com sucesso!');
    window.location.href = 'metas-salvas.html';
});

// Função para carregar as metas salvas
window.onload = function() {
    const metasSalvas = JSON.parse(localStorage.getItem('metas')) || [];
    const cardsContainer = document.getElementById('cards');

    if (metasSalvas.length === 0) {
        cardsContainer.innerHTML = '<p>Nenhuma meta salva ainda.</p>';
        return;
    }

    metasSalvas.forEach((meta, index) => {
        const card = `
            <div class="card">
                <img src="${meta.icone}" alt="Ícone" class="icon-img" />
                <h3>${meta.nome}</h3>
                <p>Data: ${meta.data}</p>
                <p>Descrição: ${meta.descricao}</p>
                <p>Valor do Objetivo: ${meta.valor}</p>
                <p>Valor Inicial: ${meta.valorInicial}</p>
                <button class="edit-button" data-index="${index}">Editar</button>
                <button class="delete-button" data-index="${index}">Excluir</button>
            </div>
        `;
        cardsContainer.insertAdjacentHTML('beforeend', card);
    });

    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            editarMeta(index);
        });
    });

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            excluirMeta(index);
        });
    });
};

// Função para preparar meta para edição
function editarMeta(index) {
    const metasSalvas = JSON.parse(localStorage.getItem('metas')) || [];
    const metaParaEditar = metasSalvas[index];
    localStorage.setItem('metaEditando', JSON.stringify({ ...metaParaEditar, index }));
    window.location.href = 'index.html';
}

// Função para excluir uma meta
function excluirMeta(index) {
    let metasSalvas = JSON.parse(localStorage.getItem('metas')) || [];
    metasSalvas.splice(index, 1);
    localStorage.setItem('metas', JSON.stringify(metasSalvas));
    window.location.reload();
}

// Carregar meta em edição ao abrir o formulário
window.addEventListener('DOMContentLoaded', () => {
    const metaEditando = JSON.parse(localStorage.getItem('metaEditando'));
    if (metaEditando) {
        document.getElementById('nome-objetivo').value = metaEditando.nome;
        document.getElementById('data-objetivo').value = metaEditando.data;
        document.getElementById('descricao').value = metaEditando.descricao;
        document.getElementById('valor-objetivo').value = metaEditando.valor;
        document.getElementById('valor-inicial').value = metaEditando.valorInicial;
        selectedIcon = metaEditando.icone;

        document.querySelectorAll('#icon-selection button').forEach(btn => {
            btn.classList.toggle('selected', btn.getAttribute('data-icon') === selectedIcon);
        });

        document.querySelector('.save-button').textContent = 'Atualizar Meta';
    }
});
