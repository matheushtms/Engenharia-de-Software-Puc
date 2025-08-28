package com.backend.reuse.repositories;

import com.backend.reuse.models.Peca;
import com.backend.reuse.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PecaRepository extends JpaRepository<Peca, Long> {
    List<Peca> findByUsuario(Usuario usuario);
}
