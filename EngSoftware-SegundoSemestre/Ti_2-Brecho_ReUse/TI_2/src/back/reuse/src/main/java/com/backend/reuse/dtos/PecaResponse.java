// ====== PecaResponse.java ======
package com.backend.reuse.dtos;

import java.math.BigDecimal;

public class PecaResponse {

    private Long id;
    private String nome;
    private String categoria;
    private String descricao;
    private String modalidade;
    private String tamanho;
    private String condicao;
    private String genero;
    private BigDecimal preco;
    private String imagem;
    private String cidade;
    private Long usuarioId; // <-- ADICIONADO

    public PecaResponse(
            Long id,
            String nome,
            String categoria,
            String descricao,
            String modalidade,
            String tamanho,
            String condicao,
            String genero,
            BigDecimal preco,
            String imagem,
            String cidade,
            Long usuarioId
    ) {
        this.id = id;
        this.nome = nome;
        this.categoria = categoria;
        this.descricao = descricao;
        this.modalidade = modalidade;
        this.tamanho = tamanho;
        this.condicao = condicao;
        this.genero = genero;
        this.preco = preco;
        this.imagem = imagem;
        this.cidade = cidade;
        this.usuarioId = usuarioId;
    }

    // Getters
    public Long getUsuarioId() { return usuarioId; }
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getCategoria() { return categoria; }
    public String getDescricao() { return descricao; }
    public String getModalidade() { return modalidade; }
    public String getTamanho() { return tamanho; }
    public String getCondicao() { return condicao; }
    public String getGenero() { return genero; }
    public BigDecimal getPreco() { return preco; }
    public String getImagem() { return imagem; }
    public String getCidade() { return cidade; }

}
