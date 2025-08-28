// src/main/java/com/backend/reuse/models/Dashboard.java
package com.backend.reuse.models;

import java.math.BigDecimal;

public class Dashboard {

    private Long totalVendidas;
    private BigDecimal totalArrecadado;

    public Dashboard(Long totalVendidas, BigDecimal totalArrecadado) {
        this.totalVendidas = totalVendidas;
        this.totalArrecadado = totalArrecadado;
    }

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
}
