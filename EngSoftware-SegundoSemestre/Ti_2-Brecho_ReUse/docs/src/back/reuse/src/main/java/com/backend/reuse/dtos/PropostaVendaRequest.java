package com.backend.reuse.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class PropostaVendaRequest {
    @NotNull(message = "ID da peça é obrigatório")
    private Long pecaId;
    
    @NotNull(message = "ID do usuário é obrigatório")
    private Long usuarioId;
    
    @NotBlank(message = "Modalidade é obrigatória")
    private String modalidade; // "Venda" ou "Doação"
    
    private BigDecimal valorProposto;
    
    private String observacoes;

    // Construtores
    public PropostaVendaRequest() {
    }

    public PropostaVendaRequest(Long pecaId, Long usuarioId, String modalidade, BigDecimal valorProposto, String observacoes) {
        this.pecaId = pecaId;
        this.usuarioId = usuarioId;
        this.modalidade = modalidade;
        this.valorProposto = valorProposto;
        this.observacoes = observacoes;
    }

    // Getters e Setters
    public Long getPecaId() {
        return pecaId;
    }

    public void setPecaId(Long pecaId) {
        this.pecaId = pecaId;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getModalidade() {
        return modalidade;
    }

    public void setModalidade(String modalidade) {
        this.modalidade = modalidade;
    }

    public BigDecimal getValorProposto() {
        return valorProposto;
    }

    public void setValorProposto(BigDecimal valorProposto) {
        this.valorProposto = valorProposto;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}
