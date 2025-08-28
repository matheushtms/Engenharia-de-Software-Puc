package com.backend.reuse.services;

import com.backend.reuse.exceptions.UsuarioNaoEncontradoException;
import com.backend.reuse.models.*;
import com.backend.reuse.repositories.*;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private static final Logger logger = LoggerFactory.getLogger(UsuarioService.class);

    private final UsuarioRepository usuarioRepository;
    private final PecaRepository pecaRepository;
    private final ItemCarrinhoRepository itemCarrinhoRepository;
    private final ItemCompraRepository itemCompraRepository;
    private final CarrinhoRepository carrinhoRepository;
    private final PixRepository pixRepository;
    private final CartaoCreditoRepository cartaoCreditoRepository;
    private final CompraRepository compraRepository;

    public UsuarioService(
            UsuarioRepository usuarioRepository,
            PecaRepository pecaRepository,
            ItemCarrinhoRepository itemCarrinhoRepository,
            ItemCompraRepository itemCompraRepository,
            CarrinhoRepository carrinhoRepository,
            PixRepository pixRepository,
            CartaoCreditoRepository cartaoCreditoRepository,
            CompraRepository compraRepository
    ) {
        this.usuarioRepository = usuarioRepository;
        this.pecaRepository = pecaRepository;
        this.itemCarrinhoRepository = itemCarrinhoRepository;
        this.itemCompraRepository = itemCompraRepository;
        this.carrinhoRepository = carrinhoRepository;
        this.pixRepository = pixRepository;
        this.cartaoCreditoRepository = cartaoCreditoRepository;
        this.compraRepository = compraRepository;
    }

    @Transactional
    public void excluirUsuarioComDependencias(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário com ID " + id + " não encontrado"));

        logger.info("Iniciando exclusão do usuário: {}", usuario.getEmail());

        excluirCarrinho(usuario);
        excluirPecasEItensDeCompra(usuario);
        excluirCompras(usuario);
        excluirMetodosPagamento(usuario);

        usuarioRepository.delete(usuario);
        logger.info("Usuário {} excluído com sucesso.", usuario.getEmail());
    }

    private void excluirCarrinho(Usuario usuario) {
        carrinhoRepository.findByUsuario(usuario).ifPresent(carrinho -> {
            itemCarrinhoRepository.deleteAllByCarrinho(carrinho);
            carrinhoRepository.delete(carrinho);
            logger.info("Carrinho e itens do carrinho excluídos para usuário: {}", usuario.getId());
        });
    }

    private void excluirPecasEItensDeCompra(Usuario usuario) {
        List<Peca> pecas = pecaRepository.findByUsuario(usuario);
        for (Peca peca : pecas) {
            itemCompraRepository.deleteAllByPeca(peca);
        }
        pecaRepository.deleteAll(pecas);
        logger.info("Peças e itens de compra excluídos para usuário: {}", usuario.getId());
    }

    private void excluirCompras(Usuario usuario) {
        compraRepository.deleteAllByUsuario(usuario);
        logger.info("Compras excluídas para usuário: {}", usuario.getId());
    }

    private void excluirMetodosPagamento(Usuario usuario) {
        pixRepository.deleteByUsuario(usuario);
        cartaoCreditoRepository.deleteByUsuario(usuario);
        logger.info("Métodos de pagamento excluídos para usuário: {}", usuario.getId());
    }
}
