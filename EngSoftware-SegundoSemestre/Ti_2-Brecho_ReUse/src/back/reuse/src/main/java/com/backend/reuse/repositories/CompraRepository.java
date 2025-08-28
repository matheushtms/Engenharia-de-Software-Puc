package com.backend.reuse.repositories;

import com.backend.reuse.models.Compra;
import com.backend.reuse.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;

public interface CompraRepository extends JpaRepository<Compra, Long> {

    void deleteAllByUsuario(Usuario usuario);

    @Query("SELECT COUNT(ic) FROM ItemCompra ic")
    Long countTotalPecasVendidas();

    @Query("SELECT SUM(ic.precoNoMomento) FROM ItemCompra ic")
    BigDecimal sumTotalArrecadado();

    // Método para contar os usuários que realizaram compras
    @Query("SELECT COUNT(DISTINCT c.usuario.id) FROM Compra c")
    long countUsuariosQueCompraram();  // Conta os usuários distintos que realizaram compras
}
