package com.backend.reuse.dtos;

import java.time.LocalDateTime;

public class EnvioResponse {
    private Long pecaId;
    private String nomePeca;
    private String codigoRastreio;
    private String transportadora;
    private LocalDateTime dataEnvio;
    private String mensagem;
    private String status;

    // Construtores
    public EnvioResponse() {
    }

    public EnvioResponse(Long pecaId, String nomePeca, String codigoRastreio, 
                        String transportadora, LocalDateTime dataEnvio, String mensagem) {
        this.pecaId = pecaId;
        this.nomePeca = nomePeca;
        this.codigoRastreio = codigoRastreio;
        this.transportadora = transportadora;
        this.dataEnvio = dataEnvio;
        this.mensagem = mensagem;
        this.status = "Enviado";
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

    public LocalDateTime getDataEnvio() {
        return dataEnvio;
    }

    public void setDataEnvio(LocalDateTime dataEnvio) {
        this.dataEnvio = dataEnvio;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}