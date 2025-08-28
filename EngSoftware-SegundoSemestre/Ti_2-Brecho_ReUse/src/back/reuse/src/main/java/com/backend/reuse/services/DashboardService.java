package com.backend.reuse.services;

import com.backend.reuse.models.Peca;
import com.backend.reuse.repositories.PecaRepository;
import com.backend.reuse.repositories.RegistroInicialDaPecaRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final PecaRepository pecaRepo;
    private final RegistroInicialDaPecaRepository registroRepo;

    public DashboardService(PecaRepository pecaRepo, RegistroInicialDaPecaRepository registroRepo) {
        this.pecaRepo = pecaRepo;
        this.registroRepo = registroRepo;
    }

    public long getTotalPecas() {
        return pecaRepo.count();
    }

    public long getTotalVendidas() {
        return pecaRepo.findAll().stream()
                .filter(p -> p.getModalidade().equalsIgnoreCase("vendida"))
                .count();
    }

    public double getPercentualVendidas() {
        long total = getTotalPecas();
        long vendidas = getTotalVendidas();
        if (total == 0) return 0;
        return (vendidas * 100.0) / total;
    }

    public double getPercentualDoadas() {
        long doadas = registroRepo.countByModalidade("DOACAO");
        long total = getTotalPecas();
        if (total == 0) return 0;
        return (doadas * 100.0) / total;
    }
}
