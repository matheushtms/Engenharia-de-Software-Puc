package com.backend.reuse.repositories;

import com.backend.reuse.models.RegistroInicialDaPeca;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistroInicialDaPecaRepository extends JpaRepository<RegistroInicialDaPeca, Long> {
    
    boolean existsByPecaId(Long pecaId);

    // ✅ Adicione este método para permitir contagem por modalidade
    long countByModalidade(String modalidade);
}
