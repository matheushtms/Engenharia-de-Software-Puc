package com.backend.reuse.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class EnvioRequest {
    @NotNull(message = "ID da peça é obrigatório")
    private Long pecaId;
    
    @NotNull(message = "ID do usuário é obrigatório")
    private Long usuarioId;
    
    @NotBlank(message = "Código de rastreio é obrigatório")
    private String codigoRastreio;
    
    @NotBlank(message = "Transportadora é obrigatória")
    private String transportadora;
    
    private String observacoes;

    // Construtores
    public EnvioRequest() {
    }

    public EnvioRequest(Long pecaId, Long usuarioId, String codigoRastreio, String transportadora, String observacoes) {
        this.pecaId = pecaId;
        this.usuarioId = usuarioId;
        this.codigoRastreio = codigoRastreio;
        this.transportadora = transportadora;
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

    public String getCodigoRastreio() {
        return codigoRastreio;
    }

    public void setCodigoRastreio(String codigoRastreio) {
        this.codigoRastreio = codigoRastreio;
    }

    public String getTransportadora() {
        return transportadora;
    }

    public void setTransportadora(String transportadora) {
        this.transportadora = transportadora;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}