package com.backend.reuse.controllers;

import com.backend.reuse.dtos.CompraFinalizadaResponse;
import com.backend.reuse.services.CompraService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/compras")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class CompraController {

    private final CompraService compraService;

    public CompraController(CompraService compraService) {
        this.compraService = compraService;
    }

    @PostMapping("/finalizar/{idUsuario}")
    public ResponseEntity<?> finalizarCompra(@PathVariable Long idUsuario) {
        try {
            var compra = compraService.finalizarCompra(idUsuario);
            return ResponseEntity.ok(new CompraFinalizadaResponse(compra));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao finalizar compra: " + e.getMessage());
        }
    }
}
