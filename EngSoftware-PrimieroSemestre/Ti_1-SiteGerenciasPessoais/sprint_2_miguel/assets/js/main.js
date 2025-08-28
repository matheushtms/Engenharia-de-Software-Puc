let valorDescontado = 0;
let valorTotal = 0;

document.addEventListener('DOMContentLoaded', () => {
    const parcelasForm = document.getElementById('parcelasForm');
    const parcelasList = document.getElementById('parcelasList');
    const valorTotalInput = document.getElementById('valorTotal');
    const valorDescontadoElement = document.getElementById('valorDescontado');
    const valorRestanteElement = document.getElementById('valorRestante');

    // Restaurar estado do localStorage
    restaurarEstado();

    parcelasForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const descricao = document.getElementById('descricao').value;
        const valor = parseFloat(document.getElementById('valor').value).toFixed(2);
        const data = document.getElementById('data').value;

        if (descricao && valor && data) {
            if (valor > valorTotal) {
                alert('O valor da parcela não pode ser maior que o montante disponível!');
                return;
            }

            const parcela = { descricao, valor: parseFloat(valor), data };
            adicionarParcelaNaLista(parcela);
            atualizarLocalStorage(parcela, 'adicionar');
        }
    });
});

function adicionarParcelaNaLista(parcela) {
    const parcelasList = document.getElementById('parcelasList');

    const li = document.createElement('li');
    li.innerHTML = `<span>${parcela.descricao} - R$ ${parcela.valor.toFixed(2)} - ${parcela.data}</span> 
                    <button onclick="removerParcela(this, ${parcela.valor})">Remover</button>`;
    parcelasList.appendChild(li);

    valorDescontado += parcela.valor;
    valorTotal -= parcela.valor;
    atualizarMiniCards(valorDescontado, valorTotal);

    document.getElementById('parcelasForm').reset();
}

function removerParcela(button, valor) {
    valorDescontado -= parseFloat(valor);
    valorTotal += parseFloat(valor);

    atualizarMiniCards(valorDescontado, valorTotal);
    atualizarLocalStorage({ valor: parseFloat(valor) }, 'remover');

    button.parentElement.remove(); // Remove o elemento <li>
}

function atualizarMiniCards(descontado, restante) {
    const valorDescontadoElement = document.getElementById('valorDescontado');
    const valorRestanteElement = document.getElementById('valorRestante');

    valorDescontadoElement.textContent = `R$ ${descontado.toFixed(2)}`;
    valorRestanteElement.textContent = `R$ ${restante.toFixed(2)}`;
}

function atualizarLocalStorage(parcela, acao) {
    const parcelas = JSON.parse(localStorage.getItem('parcelas')) || [];
    if (acao === 'adicionar') {
        parcelas.push(parcela);
    } else if (acao === 'remover') {
        const index = parcelas.findIndex(p => p.valor === parcela.valor);
        if (index !== -1) parcelas.splice(index, 1);
    }
    localStorage.setItem('parcelas', JSON.stringify(parcelas));
    localStorage.setItem('valorTotal', valorTotal.toFixed(2));
    localStorage.setItem('valorDescontado', valorDescontado.toFixed(2));
}

function restaurarEstado() {
    const parcelas = JSON.parse(localStorage.getItem('parcelas')) || [];
    valorTotal = parseFloat(localStorage.getItem('valorTotal')) || parseFloat(document.getElementById('valorTotal').value);
    valorDescontado = parseFloat(localStorage.getItem('valorDescontado')) || 0;

    parcelas.forEach(parcela => adicionarParcelaNaLista(parcela));
    atualizarMiniCards(valorDescontado, valorTotal);
}
