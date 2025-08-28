package com.backend.reuse.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import com.backend.reuse.models.Usuario;  // <<— este import é obrigatório

@Entity
public class Peca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome;

    @NotBlank
    private String categoria;

    @NotBlank
    private String descricao;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal preco;

    @NotBlank
    private String tamanho;

    @NotBlank
    private String condicao;

    @NotBlank
    private String genero;

    @NotBlank
    private String modalidade;

    @NotBlank
    private String imagem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    public Peca() {}

    public Peca(String nome,
                String categoria,
                String descricao,
                BigDecimal preco,
                String tamanho,
                String condicao,
                String genero,
                String modalidade,
                String imagem,
                Usuario usuario) {
        this.nome       = nome;
        this.categoria  = categoria;
        this.descricao  = descricao;
        this.preco      = preco;
        this.tamanho    = tamanho;
        this.condicao   = condicao;
        this.genero     = genero;
        this.modalidade = modalidade;
        this.imagem     = imagem;
        this.usuario    = usuario;
    }

    public Long getId() { return id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public BigDecimal getPreco() { return preco; }
    public void setPreco(BigDecimal preco) { this.preco = preco; }

    public String getTamanho() { return tamanho; }
    public void setTamanho(String tamanho) { this.tamanho = tamanho; }

    public String getCondicao() { return condicao; }
    public void setCondicao(String condicao) { this.condicao = condicao; }

    public String getGenero() { return genero; }
    public void setGenero(String genero) { this.genero = genero; }

    public String getModalidade() { return modalidade; }
    public void setModalidade(String modalidade) { this.modalidade = modalidade; }

    public String getImagem() { return imagem; }
    public void setImagem(String imagem) { this.imagem = imagem; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
}
