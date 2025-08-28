function preencherDadosEmpresa(empresa) {
    document.getElementById('empresaNome').textContent = empresa.nome;
    document.getElementById('empresaLogo').src = empresa.logo;
    document.getElementById('empresaDescricao').textContent = empresa.descricao;
    document.getElementById('nomeUsuario').textContent = empresa.usuario.nome;
}

function preencherCashback(cashback) {
    const condicoesList = document.getElementById('cashbackCondicoes');
    condicoesList.innerHTML = ''; 

    document.getElementById('cashbackValorTotal').textContent = cashback.valorTotal.toFixed(2);
    document.getElementById('cashbackPercentual').textContent = cashback.percentual;
    document.getElementById('cashbackDataExpiracao').textContent = cashback.dataExpiracao;

    cashback.condicoes.forEach(condicao => {
        const li = document.createElement('li');
        li.textContent = condicao;
        condicoesList.appendChild(li);
    });
}

function preencherCupons(cupons) {
    const cuponsList = document.getElementById('cuponsList');
    cuponsList.innerHTML = ''; 

    cupons.forEach(cupom => {
        const div = document.createElement('div');
        div.classList.add('coupon');
        div.innerHTML = `
            <p><strong>Código:</strong> ${cupom.codigo}</p>
            <p><strong>Descrição:</strong> ${cupom.descricao}</p>
            <p><strong>Data de Validade:</strong> ${cupom.validade}</p>
            <p><strong>Dias para Usar:</strong> ${cupom.diasParaUsar} dias</p>
            <p><strong>Condições:</strong></p>
            <ul>
                ${cupom.condicoes.map(cond => `<li>${cond}</li>`).join('')}
            </ul>
            <button class="button">Usar ${cupom.codigo}</button>
        `;
        cuponsList.appendChild(div);
    });
}

function preencherProdutos(produtos) {
    const produtosList = document.getElementById('produtosList');
    produtosList.innerHTML = ''; 

    produtos.forEach(produto => {
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
            <p><strong>Nome:</strong> ${produto.nome}</p>
            <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}</p>
            <p><strong>Cashback Aplicável:</strong> R$ ${produto.cashbackAplicavel.toFixed(2)}</p>
        `;
        produtosList.appendChild(div);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const empresa = data.empresas[0];
    const cashback = empresa.cashbacks[0];
    preencherDadosEmpresa(empresa);
    preencherCashback(cashback);
    preencherCupons(empresa.cupons);
    preencherProdutos(empresa.produtos);
});
