
const fixedCashbackData = [
    { categoria: "sapatos", banco: "Banco Inter", cashback: "5%", imagem: "./fotos/inter.jpg" },
    { categoria: "sapatos", banco: "PicPay", cashback: "4%", imagem: "./fotos/PicPay.png" },
    { categoria: "sapatos", banco: "C6 Bank", cashback: "2%", imagem: "./fotos/c6-bank.png" },
    { categoria: "sapatos", banco: "Nubank", cashback: "3%", imagem: "./fotos/nubank.png" },
    { categoria: "roupas", banco: "Banco Inter", cashback: "3%", imagem: "./fotos/inter.jpg" },
    { categoria: "roupas", banco: "PicPay", cashback: "7%", imagem: "./fotos/PicPay.png" },
    { categoria: "roupas", banco: "C6 Bank", cashback: "6%", imagem: "./fotos/c6-bank.png" },
    { categoria: "roupas", banco: "Nubank", cashback: "1%", imagem: "./fotos/nubank.png" }
];

let cashbackData = JSON.parse(localStorage.getItem('cashbackData')) || [];

function salvarNoLocalStorage() {
    localStorage.setItem('cashbackData', JSON.stringify(cashbackData));
}

function renderCashbackData() {
    
    document.querySelectorAll('.cashback-info').forEach(div => div.innerHTML = '');

    
    const combinedData = [...fixedCashbackData, ...cashbackData];

    
    combinedData.forEach(oferta => {
        const cashbackDiv = document.getElementById(`${oferta.categoria}-cashback-info`);
        if (cashbackDiv) {
            const bankCard = document.createElement('div');
            bankCard.className = 'bank-card';
            bankCard.setAttribute('data-bank', oferta.banco.toLowerCase().replace(/\s/g, ''));
            bankCard.innerHTML = `
                <img src="${oferta.imagem}" alt="${oferta.banco}">
                <p>${oferta.banco}</p>
                <span class="cashback">${oferta.cashback}</span>
            `;
            cashbackDiv.appendChild(bankCard);
        }
    });
}

function cadastrarCashback(event) {
    event.preventDefault();

    const categoria = document.getElementById('categoria').value;
    const banco = document.getElementById('banco').value;
    const cashback = document.getElementById('cashback').value;
    const imagem = document.getElementById('imagem').value;

    const novaOferta = {
        categoria,
        banco,
        cashback: `${cashback}%`,
        imagem
    };

    cashbackData.push(novaOferta);
    salvarNoLocalStorage(); 
    renderCashbackData(); 
    alert('Oferta cadastrada com sucesso!');

    document.getElementById('cadastro-form').reset(); 
    console.log('Dados de cashback:', cashbackData);
}

function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.querySelectorAll('.tab-botao').forEach(button => button.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add('active');
}

function filterBanks(tabId) {
    const selectElement = document.getElementById(`bancos-${tabId}`);
    const selectedBank = selectElement.value;
    const cashbackInfo = document.getElementById(`${tabId}-cashback-info`);
    const bankCards = cashbackInfo.querySelectorAll('.bank-card');

    bankCards.forEach(card => {
        if (selectedBank === "all" || card.getAttribute('data-bank') === selectedBank) {
            card.style.display = "inline-block";
        } else {
            card.style.display = "none";
        }
    });
}


document.addEventListener('DOMContentLoaded', renderCashbackData);
