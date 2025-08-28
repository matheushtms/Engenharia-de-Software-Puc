package com.backend.reuse.dtos;

import com.backend.reuse.models.Compra;

import java.math.BigDecimal;
import java.time.LocalDate;

public class CompraFinalizadaResponse {

    private Long id;
    private LocalDate data;
    private BigDecimal total;

    public CompraFinalizadaResponse(Compra compra) {
        this.id = compra.getId();
        this.data = compra.getData();
        this.total = compra.getTotal();
    }

    public Long getId() {
        return id;
    }

    public LocalDate getData() {
        return data;
    }

    public BigDecimal getTotal() {
        return total;
    }
}
