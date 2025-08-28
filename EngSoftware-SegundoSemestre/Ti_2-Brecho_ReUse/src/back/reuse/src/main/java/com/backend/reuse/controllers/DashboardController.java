package com.backend.reuse.controllers;

import com.backend.reuse.dtos.DashboardResponse;
import com.backend.reuse.repositories.CompraRepository;
import com.backend.reuse.repositories.UsuarioRepository;
import com.backend.reuse.services.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

import java.math.BigDecimal;
import java.math.RoundingMode;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class DashboardController {

    @Autowired
    private CompraRepository compraRepository;

    @Autowired
    private UsuarioRepository usuarioRepository; // Repositório de usuários

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/estatisticas")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DashboardResponse> getEstatisticas() {
        Long totalVendidas = dashboardService.getTotalVendidas();
        BigDecimal totalArrecadado = compraRepository.sumTotalArrecadado();
        Long totalCadastradas = dashboardService.getTotalPecas();
        double percentualVendidas = dashboardService.getPercentualVendidas();
        double percentualDoadas = dashboardService.getPercentualDoadas();

        // ✅ Cálculo da Taxa de Conversão
        Long totalUsuarios = usuarioRepository.count(); // Total de usuários cadastrados
        Long usuariosQueCompraram = compraRepository.countUsuariosQueCompraram(); // Usuários que fizeram compras
        double taxaConversao = totalUsuarios == 0 ? 0 : ((double) usuariosQueCompraram / totalUsuarios) * 100; // Cálculo da taxa de conversão

        if (totalArrecadado == null) {
            totalArrecadado = BigDecimal.ZERO;
        }

        // ✅ Cálculo do ticket médio
        BigDecimal ticketMedio = BigDecimal.ZERO;
        if (totalVendidas != null && totalVendidas > 0) {
            ticketMedio = totalArrecadado.divide(BigDecimal.valueOf(totalVendidas), 2, RoundingMode.HALF_UP);
        }

        // ✅ Retorno com novo campo da taxa de conversão
        DashboardResponse response = new DashboardResponse(
                totalVendidas,
                totalArrecadado,
                totalCadastradas,
                percentualVendidas,
                percentualDoadas,
                ticketMedio,
                taxaConversao // Adiciona a taxa de conversão no DTO
        );

        return ResponseEntity.ok(response);
    }
}
