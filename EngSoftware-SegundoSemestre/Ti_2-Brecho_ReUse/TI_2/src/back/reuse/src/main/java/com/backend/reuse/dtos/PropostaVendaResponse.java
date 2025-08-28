package com.backend.reuse.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PropostaVendaResponse {
    private Long pecaId;
    private String nomePeca;
    private String categoria;
    private BigDecimal valor;
    private String modalidade;
    private LocalDateTime dataConfirmacao;
    private String status;

    // Construtores
    public PropostaVendaResponse() {
    }

    public PropostaVendaResponse(Long pecaId, String nomePeca, String categoria, BigDecimal valor, 
                                String modalidade, LocalDateTime dataConfirmacao) {
        this.pecaId = pecaId;
        this.nomePeca = nomePeca;
        this.categoria = categoria;
        this.valor = valor;
        this.modalidade = modalidade;
        this.dataConfirmacao = dataConfirmacao;
        this.status = "Confirmada";
    }

    // Getters e Setters
    public Long getPecaId() {
        return pecaId;
    }

    public void setPecaId(Long pecaId) {
        this.pecaId = pecaId;
    }

    public String getNomePeca() {
        return nomePeca;
    }

    public void setNomePeca(String nomePeca) {
        this.nomePeca = nomePeca;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public String getModalidade() {
        return modalidade;
    }

    public void setModalidade(String modalidade) {
        this.modalidade = modalidade;
    }

    public LocalDateTime getDataConfirmacao() {
        return dataConfirmacao;
    }

    public void setDataConfirmacao(LocalDateTime dataConfirmacao) {
        this.dataConfirmacao = dataConfirmacao;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
