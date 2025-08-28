package com.backend.reuse.controllers;

import com.backend.reuse.dtos.RegistroInicialRequest;
import com.backend.reuse.services.RegistroInicialDaPecaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registro-inicial")
public class RegistroInicialDaPecaController {

    @Autowired
    private RegistroInicialDaPecaService service;

    @PostMapping
    public ResponseEntity<Void> registrar(@RequestBody RegistroInicialRequest request) {
        service.registrarIntent(request.getUsuarioId(), request.getPecaId(), request.getModalidade());
        return ResponseEntity.ok().build();
    }
}
