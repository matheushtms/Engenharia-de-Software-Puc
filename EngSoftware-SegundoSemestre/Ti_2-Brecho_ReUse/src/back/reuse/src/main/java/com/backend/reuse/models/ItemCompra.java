package com.backend.reuse.models;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
public class ItemCompra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "peca_id")
    private Peca peca;

    @ManyToOne
    @JoinColumn(name = "compra_id")
    private Compra compra;

    private BigDecimal precoNoMomento;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Peca getPeca() {
        return peca;
    }

    public void setPeca(Peca peca) {
        this.peca = peca;
    }

    public Compra getCompra() {
        return compra;
    }

    public void setCompra(Compra compra) {
        this.compra = compra;
    }

    public BigDecimal getPrecoNoMomento() {
        return precoNoMomento;
    }

    public void setPrecoNoMomento(BigDecimal precoNoMomento) {
        this.precoNoMomento = precoNoMomento;
    }
}
