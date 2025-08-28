package com.backend.reuse.repositories;

import com.backend.reuse.models.CartaoCredito;
import com.backend.reuse.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartaoCreditoRepository extends JpaRepository<CartaoCredito, Long> {
    void deleteByUsuario(Usuario usuario);
}
