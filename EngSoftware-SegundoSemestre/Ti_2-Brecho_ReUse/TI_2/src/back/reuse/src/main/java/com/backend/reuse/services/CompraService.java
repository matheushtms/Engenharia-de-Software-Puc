package com.backend.reuse.services;

import com.backend.reuse.models.*;
import com.backend.reuse.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompraService {

    private final CompraRepository compraRepo;
    private final ItemCompraRepository itemCompraRepo;
    private final CarrinhoRepository carrinhoRepo;
    private final ItemCarrinhoRepository itemCarrinhoRepo;
    private final UsuarioRepository usuarioRepo;
    private  final PecaRepository pecaRepo;


    public CompraService(
            CompraRepository compraRepo,
            ItemCompraRepository itemCompraRepo,
            CarrinhoRepository carrinhoRepo,
            ItemCarrinhoRepository itemCarrinhoRepo,
            UsuarioRepository usuarioRepo,
            PecaRepository pecaRepo
    ) {
        this.compraRepo = compraRepo;
        this.itemCompraRepo = itemCompraRepo;
        this.carrinhoRepo = carrinhoRepo;
        this.itemCarrinhoRepo = itemCarrinhoRepo;
        this.usuarioRepo = usuarioRepo;
        this.pecaRepo = pecaRepo; // <-- e isso
    }

    @Transactional
    public Compra finalizarCompra(Long usuarioId) {
        Usuario usuario = usuarioRepo.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Carrinho carrinho = carrinhoRepo.findByUsuario(usuario)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado para o usuário."));

        List<ItemCarrinho> itensCarrinho = itemCarrinhoRepo.findByCarrinho(carrinho);

        if (itensCarrinho.isEmpty()) {
            System.out.println("Carrinho está vazio.");
            throw new RuntimeException("Carrinho está vazio.");
        }

        Compra compra = new Compra();
        compra.setUsuario(usuario);
        compra.setData(LocalDate.now());

        List<ItemCompra> itensCompra = itensCarrinho.stream().map(item -> {
            ItemCompra ic = new ItemCompra();
            ic.setCompra(compra);
            ic.setPeca(item.getPeca());
            ic.setPrecoNoMomento(item.getPeca().getPreco());
            return ic;
        }).collect(Collectors.toList());

        BigDecimal total = itensCompra.stream()
                .map(ItemCompra::getPrecoNoMomento)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        compra.setTotal(total);
        compra.setItens(itensCompra);

        Compra compraSalva = compraRepo.save(compra);
        itemCompraRepo.saveAll(itensCompra);

// 🟡 Marcar peças como vendidas
        for (ItemCompra item : itensCompra) {
            Peca peca = item.getPeca();
            peca.setModalidade("vendida");
        }
        pecaRepo.saveAll(
                itensCompra.stream().map(ItemCompra::getPeca).collect(Collectors.toList())
        );

// 🧹 Limpar o carrinho
        itemCarrinhoRepo.deleteAll(itensCarrinho);

        return compraSalva;
    }

    public void testarFinalizacaoManual(Long usuarioId) {
        try {
            Compra compra = finalizarCompra(usuarioId);
            System.out.println("✔ Compra finalizada com sucesso!");
            System.out.println("Data: " + compra.getData());
            System.out.println("Total: " + compra.getTotal());
            System.out.println("Itens:");
            for (ItemCompra item : compra.getItens()) {
                System.out.println("- " + item.getPeca().getNome() + " - R$" + item.getPrecoNoMomento());
            }
        } catch (Exception e) {
            System.out.println("❌ Erro ao finalizar compra:");
            e.printStackTrace();
        }
    }

}
