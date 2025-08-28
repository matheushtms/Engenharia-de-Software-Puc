package com.backend.reuse.dtos;

import java.time.LocalDate;

public class UsuarioResponse {

    private Long id;
    private String nome;
    private String email;
    private String cpf;
    private LocalDate dataNascimento;
    private String genero;
    private String telefone;
    private String cep;
    private String rua;
    private String numero;
    private String complemento;
    private String bairro;
    private String cidade;
    private String estado;

    public UsuarioResponse(com.backend.reuse.models.Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        this.cpf = usuario.getCpf();
        this.dataNascimento = usuario.getDataNascimento();
        this.genero = usuario.getGenero();
        this.telefone = usuario.getTelefone();
        this.cep = usuario.getCep();
        this.rua = usuario.getRua();
        this.numero = usuario.getNumero();
        this.complemento = usuario.getComplemento();
        this.bairro = usuario.getBairro();
        this.cidade = usuario.getCidade();
        this.estado = usuario.getEstado();
    }

    // Getters
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getEmail() { return email; }
    public String getCpf() { return cpf; }
    public LocalDate getDataNascimento() { return dataNascimento; }
    public String getGenero() { return genero; }
    public String getTelefone() { return telefone; }
    public String getCep() { return cep; }
    public String getRua() { return rua; }
    public String getNumero() { return numero; }
    public String getComplemento() { return complemento; }
    public String getBairro() { return bairro; }
    public String getCidade() { return cidade; }
    public String getEstado() { return estado; }
}
