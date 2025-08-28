function voltarParaCadastro() {
    // Salvar estado de aceitação dos termos no localStorage
    localStorage.setItem("termosAceitos", "true");

    // Salvar os dados do formulário, caso o usuário tenha preenchido algo
    const formData = {
        nome: document.getElementById("nome") ? document.getElementById("nome").value : "",
        email: document.getElementById("email") ? document.getElementById("email").value : "",
        cpf: document.getElementById("cpf") ? document.getElementById("cpf").value : "",
        dataNascimento: document.getElementById("birthdate") ? document.getElementById("birthdate").value : "",
    };
    localStorage.setItem("dadosCadastro", JSON.stringify(formData));

    // Redirecionar para a página de Cadastro de Usuário
    window.location.href = "Cadastro-Usuario.html"; // Ajuste o caminho conforme necessário
}
