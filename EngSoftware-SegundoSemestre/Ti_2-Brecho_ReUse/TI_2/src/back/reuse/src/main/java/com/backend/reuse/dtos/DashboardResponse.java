package com.backend.reuse.dtos;

import java.math.BigDecimal;

public class DashboardResponse {

    private Long totalVendidas;
    private BigDecimal totalArrecadado;
    private Long totalCadastradas;
    private double percentualVendidas;
    private double percentualDoadas;
    private BigDecimal ticketMedio;
    private double taxaConversao; // Novo campo para a taxa de conversão

    public DashboardResponse(Long totalVendidas, BigDecimal totalArrecadado, Long totalCadastradas,
                             double percentualVendidas, double percentualDoadas, BigDecimal ticketMedio, double taxaConversao) {
        this.totalVendidas = totalVendidas;
        this.totalArrecadado = totalArrecadado;
        this.totalCadastradas = totalCadastradas;
        this.percentualVendidas = percentualVendidas;
        this.percentualDoadas = percentualDoadas;
        this.ticketMedio = ticketMedio;
        this.taxaConversao = taxaConversao; // Atribui a taxa de conversão
    }

    // Getters e setters para os campos
    public Long getTotalVendidas() {
        return totalVendidas;
    }

    public void setTotalVendidas(Long totalVendidas) {
        this.totalVendidas = totalVendidas;
    }

    public BigDecimal getTotalArrecadado() {
        return totalArrecadado;
    }

    public void setTotalArrecadado(BigDecimal totalArrecadado) {
        this.totalArrecadado = totalArrecadado;
    }

    public Long getTotalCadastradas() {
        return totalCadastradas;
    }

    public void setTotalCadastradas(Long totalCadastradas) {
        this.totalCadastradas = totalCadastradas;
    }

    public double getPercentualVendidas() {
        return percentualVendidas;
    }

    public void setPercentualVendidas(double percentualVendidas) {
        this.percentualVendidas = percentualVendidas;
    }

    public double getPercentualDoadas() {
        return percentualDoadas;
    }

    public void setPercentualDoadas(double percentualDoadas) {
        this.percentualDoadas = percentualDoadas;
    }

    public BigDecimal getTicketMedio() {
        return ticketMedio;
    }

    public void setTicketMedio(BigDecimal ticketMedio) {
        this.ticketMedio = ticketMedio;
    }

    public double getTaxaConversao() {
        return taxaConversao;
    }

    public void setTaxaConversao(double taxaConversao) {
        this.taxaConversao = taxaConversao;
    }
}
