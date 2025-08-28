package com.backend.reuse.dtos;

import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDate;

public class UsuarioCadastroRequest {

    @NotBlank
    private String nome;

    @NotBlank
    @CPF
    private String cpf;

    @NotNull
    private LocalDate dataNascimento;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Size(min = 6)
    private String senha;

    // === Dados complementares ===
    private String genero;
    private String telefone;
    private String cep;
    private String rua;
    private String numero;
    private String complemento;
    private String bairro;
    private String cidade;
    private String estado;

    // === Dados Pix (opcionais) ===
    private String tipoChavePix;
    private String chavePix;

    // === Dados Cartão (opcionais) ===
    private String numeroCartao;
    private String nomeNoCartao;
    private String validadeMes;
    private String validadeAno;
    private String codigoSeguranca;

    // Getters e Setters

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public LocalDate getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(LocalDate dataNascimento) { this.dataNascimento = dataNascimento; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public String getGenero() { return genero; }
    public void setGenero(String genero) { this.genero = genero; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getCep() { return cep; }
    public void setCep(String cep) { this.cep = cep; }

    public String getRua() { return rua; }
    public void setRua(String rua) { this.rua = rua; }

    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }

    public String getComplemento() { return complemento; }
    public void setComplemento(String complemento) { this.complemento = complemento; }

    public String getBairro() { return bairro; }
    public void setBairro(String bairro) { this.bairro = bairro; }

    public String getCidade() { return cidade; }
    public void setCidade(String cidade) { this.cidade = cidade; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getTipoChavePix() { return tipoChavePix; }
    public void setTipoChavePix(String tipoChavePix) { this.tipoChavePix = tipoChavePix; }

    public String getChavePix() { return chavePix; }
    public void setChavePix(String chavePix) { this.chavePix = chavePix; }

    public String getNumeroCartao() { return numeroCartao; }
    public void setNumeroCartao(String numeroCartao) { this.numeroCartao = numeroCartao; }

    public String getNomeNoCartao() { return nomeNoCartao; }
    public void setNomeNoCartao(String nomeNoCartao) { this.nomeNoCartao = nomeNoCartao; }

    public String getValidadeMes() { return validadeMes; }
    public void setValidadeMes(String validadeMes) { this.validadeMes = validadeMes; }

    public String getValidadeAno() { return validadeAno; }
    public void setValidadeAno(String validadeAno) { this.validadeAno = validadeAno; }

    public String getCodigoSeguranca() { return codigoSeguranca; }
    public void setCodigoSeguranca(String codigoSeguranca) { this.codigoSeguranca = codigoSeguranca; }
}
