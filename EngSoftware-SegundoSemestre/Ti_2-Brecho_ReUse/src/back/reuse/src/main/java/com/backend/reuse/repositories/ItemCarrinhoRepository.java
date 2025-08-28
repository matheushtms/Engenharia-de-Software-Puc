package com.backend.reuse.repositories;

import com.backend.reuse.models.Carrinho;
import com.backend.reuse.models.ItemCarrinho;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemCarrinhoRepository extends JpaRepository<ItemCarrinho, Long> {
    void deleteAllByCarrinho(Carrinho carrinho);
    List<ItemCarrinho> findByCarrinho(Carrinho carrinho);
}
