document.getElementById("calcularSimulacao").addEventListener("click", function () {
    const valorCompra = parseFloat(document.getElementById("valorCompra").value);
    const parcelas = parseInt(document.getElementById("parcelas").value);
    const juros = parseFloat(document.getElementById("juros").value);
    const semJuros = document.getElementById("semJuros").checked;

    if (isNaN(valorCompra) || isNaN(parcelas) || (isNaN(juros) && !semJuros) || valorCompra <= 0 || parcelas <= 0) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const taxaJurosMensal = semJuros ? 0 : juros / 100;
    const valorParcela = calcularParcela(valorCompra, parcelas, taxaJurosMensal);
    const valorTotal = valorParcela * parcelas;

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <p><strong>Valor da Compra:</strong> R$ ${valorCompra.toFixed(2)}</p>
        <p><strong>Parcelas:</strong> ${parcelas}x de R$ ${valorParcela.toFixed(2)}</p>
        <p><strong>Taxa de Juros:</strong> ${semJuros ? "0%" : juros + "% ao mês"}</p>
        <p><strong>Valor Total a Pagar:</strong> R$ ${valorTotal.toFixed(2)}</p>
    `;

    const tabelaBody = document.querySelector("#tabelaParcelas tbody");
    tabelaBody.innerHTML = "";
    let saldoDevedor = valorCompra;

    for (let i = 1; i <= parcelas; i++) {
        const jurosParcela = saldoDevedor * taxaJurosMensal;
        const amortizacao = semJuros ? valorParcela : valorParcela - jurosParcela; 
        saldoDevedor -= amortizacao;
        const linha = `
            <tr>
                <td>${i}</td>
                <td>R$ ${valorParcela.toFixed(2)}</td>
                <td>R$ ${jurosParcela.toFixed(2)}</td>
            </tr>
        `;
        tabelaBody.innerHTML += linha;
    }

    const btnLimpar = document.getElementById("limparInformacoes");
    btnLimpar.style.visibility = "visible";

    const compras = JSON.parse(localStorage.getItem("compras")) || [];
    compras.push({
        valorCompra: valorCompra.toFixed(2),
        parcelas: parcelas,
        taxaJuros: semJuros ? "0%" : `${juros}% ao mês`,
        valorTotal: valorTotal.toFixed(2),
    });
    localStorage.setItem("compras", JSON.stringify(compras));
});

document.getElementById("limparInformacoes").addEventListener("click", function () {
    document.getElementById("resultado").innerHTML = "";
    document.querySelector("#tabelaParcelas tbody").innerHTML = "";
    document.getElementById("valorCompra").value = "";
    document.getElementById("parcelas").value = "";
    document.getElementById("juros").value = "";
    document.getElementById("semJuros").checked = false;

    this.style.visibility = "hidden";
});

function calcularParcela(valorCompra, parcelas, taxaJuros) {
    if (taxaJuros === 0) {
        return valorCompra / parcelas;
    }
    return (valorCompra * taxaJuros * Math.pow(1 + taxaJuros, parcelas)) / (Math.pow(1 + taxaJuros, parcelas) - 1);
}