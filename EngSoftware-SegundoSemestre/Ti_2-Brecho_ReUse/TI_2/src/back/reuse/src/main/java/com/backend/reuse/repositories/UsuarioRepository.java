package com.backend.reuse.repositories;

import com.backend.reuse.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    boolean existsByEmail(String email);

    Optional<Usuario> findByEmail(String email);

    // Método para contar o total de usuários cadastrados
    long count();

    // Método para contar usuários que realizaram pelo menos uma compra
    @Query("SELECT COUNT(DISTINCT u.id) FROM Usuario u JOIN Compra c ON u.id = c.usuario.id")
    long countUsuariosQueCompraram();
}
