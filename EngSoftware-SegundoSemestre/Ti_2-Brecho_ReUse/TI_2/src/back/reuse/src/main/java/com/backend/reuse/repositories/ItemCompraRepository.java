package com.backend.reuse.repositories;

import com.backend.reuse.models.ItemCompra;
import com.backend.reuse.models.Peca;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemCompraRepository extends JpaRepository<ItemCompra, Long> {

    void deleteAllByPeca(Peca peca); // <-- Adicione isso aqui
}
