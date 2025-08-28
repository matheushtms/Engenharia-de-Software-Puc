'use strict';

const openModal = () => document.getElementById('modal').classList.add('active');
const closeModal = () => document.getElementById('modal').classList.remove('active');

let bancos = JSON.parse(localStorage.getItem('bancos')) || [];
let bancoEditando = null;

// Atualiza a tabela com os dados dos bancos
const atualizarTabela = () => {
    const tabelaBancos = document.getElementById('tabelaBancos').getElementsByTagName('tbody')[0];
    tabelaBancos.innerHTML = '';

    bancos.forEach((banco, index) => {
        const tr = document.createElement('tr');
        
        // Verifica se o banco é um dos predefinidos para adicionar a logo
        let logoBanco = '';
        switch (banco.nome) {
            case 'Nubank':
                logoBanco = 'nubanklogo.png';
                break;
            case 'Mercado Pago':
                logoBanco = 'mercadopagologo.png';
                break;
            case 'Paypal':
                logoBanco = 'paypallogo.png';
                break;
            case 'Banco Inter':
                logoBanco = 'bancointerlogo.png';
                break;
            case 'Caixa':
                logoBanco = 'caixalogo.jpg';
                break;
            case 'Stone':
                logoBanco = 'stonelogo.png';
                break;
            case 'Bradesco':
                logoBanco = 'bradescologo.png';
                break;
            case 'Itaú Unibanco':
                logoBanco = 'itaulogo.png';
                break;
            case 'Santander':
                logoBanco = 'santanderlogo.png';
                break;
            case 'Banco do Brasil':
                logoBanco = 'bancodobrasil.png';
                break;
            case 'PicPay':
                logoBanco = 'picpaylogo.png';
                break;
            case 'PagBank':
                logoBanco = 'pagbanklogo.png';
                break;
            default:
                logoBanco = ''; // Caso o banco não tenha logo associada
        }

        // Verifica se existe logo e aplica o estilo
        const nomeBancoComLogo = logoBanco
            ? `<img src="img/${logoBanco}" alt="${banco.nome} Logo" style="width: 30px; height: 30px; margin-right: 10px; vertical-align: middle;">${banco.nome}`
            : banco.nome;

        tr.innerHTML = `
            <td>${nomeBancoComLogo}</td>
            <td>${banco.agencia}</td>
            <td>${formatarNumeroConta(banco.conta, banco.tipoConta)}</td>
            <td>${banco.tipoConta}</td>
            <td>${banco.cashBack}%</td>
            <td>
                <button type="button" class="button green" onclick="editarBanco(${index})">Editar</button>
                <button type="button" class="button red" onclick="excluirBanco(${index})">Excluir</button>
            </td>
        `;
        tabelaBancos.appendChild(tr);
    });
};

document.getElementById('cadastrarBanco').addEventListener('click', () => {
    bancoEditando = null;
    document.getElementById('formBanco').reset();
    openModal();
});

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('cancelarBanco').addEventListener('click', closeModal);

document.getElementById('salvarBanco').addEventListener('click', () => {
    const nomeBanco = document.getElementById('nomeBanco').value;
    const agencia = document.getElementById('agencia').value;
    let conta = document.getElementById('conta').value;
    const tipoConta = document.getElementById('tipoConta').value;
    const cashBack = document.getElementById('cashBack').value;

    if (!nomeBanco || !agencia || !conta || !tipoConta || !cashBack) {
        alert('Todos os campos são obrigatórios!');
        return;
    }

    if (!/^\d{4}$/.test(agencia)) {
        alert('A agência deve conter exatamente 4 números.');
        return;
    }

    if (!/^\d{5,9}$/.test(conta)) {
        alert('O número da conta deve conter entre 5 e 9 números.');
        return;
    }

    conta = formatarNumeroConta(conta, tipoConta);

    if (bancoEditando !== null) {
        bancos[bancoEditando] = { nome: nomeBanco, agencia, conta, tipoConta, cashBack }; // Edita banco existente
    } else {
        bancos.push({ nome: nomeBanco, agencia, conta, tipoConta, cashBack }); // Adiciona novo banco
    }

    localStorage.setItem('bancos', JSON.stringify(bancos));
    atualizarTabela();
    closeModal();
});

const editarBanco = (index) => {
    bancoEditando = index;
    const banco = bancos[index];
    document.getElementById('nomeBanco').value = banco.nome;
    document.getElementById('agencia').value = banco.agencia;
    document.getElementById('conta').value = banco.conta.replace('-', '').replace('/', '');
    document.getElementById('tipoConta').value = banco.tipoConta;
    document.getElementById('cashBack').value = banco.cashBack;
    openModal();
};

const excluirBanco = (index) => {
    if (confirm('Tem certeza que deseja excluir este banco?')) {
        bancos.splice(index, 1);
        localStorage.setItem('bancos', JSON.stringify(bancos));
        atualizarTabela();
    }
};

const formatarNumeroConta = (conta, tipoConta) => {
    if (/^\d{5,9}$/.test(conta)) {
        if (tipoConta === "Corrente") {
            return conta.slice(0, 5) + '-' + conta.slice(5);
        } else if (tipoConta === "Poupanca") {
            return conta.slice(0, 5) + '/' + conta.slice(5);
        }
    }
    return conta;
};

document.addEventListener('DOMContentLoaded', atualizarTabela);
