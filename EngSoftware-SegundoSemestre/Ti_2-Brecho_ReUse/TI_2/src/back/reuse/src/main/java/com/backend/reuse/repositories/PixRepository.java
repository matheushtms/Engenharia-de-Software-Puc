package com.backend.reuse.repositories;

import com.backend.reuse.models.Pix;
import com.backend.reuse.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PixRepository extends JpaRepository<Pix, Long> {
    void deleteByUsuario(Usuario usuario);
}
