package com.backend.reuse.models;

import jakarta.persistence.*;

@Entity
public class ItemCarrinho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "carrinho_id")
    private Carrinho carrinho;

    @ManyToOne
    @JoinColumn(name = "peca_id")
    private Peca peca;

    // ✅ Construtor que corrige o erro no Controller
    public ItemCarrinho(Carrinho carrinho, Peca peca) {
        this.carrinho = carrinho;
        this.peca = peca;
    }

    public ItemCarrinho() {} // necessário para o JPA

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Carrinho getCarrinho() {
        return carrinho;
    }

    public void setCarrinho(Carrinho carrinho) {
        this.carrinho = carrinho;
    }

    public Peca getPeca() {
        return peca;
    }

    public void setPeca(Peca peca) {
        this.peca = peca;
    }
}
