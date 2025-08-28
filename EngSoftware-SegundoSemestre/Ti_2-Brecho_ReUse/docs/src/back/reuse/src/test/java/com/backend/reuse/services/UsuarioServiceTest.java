
package com.backend.reuse.services;

import com.backend.reuse.models.*;
import com.backend.reuse.repositories.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UsuarioServiceTest {

    @InjectMocks
    private UsuarioService usuarioService;

    @Mock private UsuarioRepository usuarioRepository;
    @Mock private PecaRepository pecaRepository;
    @Mock private ItemCarrinhoRepository itemCarrinhoRepository;
    @Mock private ItemCompraRepository itemCompraRepository;
    @Mock private CarrinhoRepository carrinhoRepository;
    @Mock private PixRepository pixRepository;
    @Mock private CartaoCreditoRepository cartaoCreditoRepository;
    @Mock private CompraRepository compraRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testExcluirUsuarioComDependencias_DeletaTudo() {
        Long userId = 1L;
        Usuario usuario = new Usuario();
        usuario.setId(userId);

        Carrinho carrinho = new Carrinho();
        carrinho.setUsuario(usuario);

        Peca peca = new Peca();
        ReflectionTestUtils.setField(peca, "id", 10L);
        peca.setUsuario(usuario);

        when(usuarioRepository.findById(userId)).thenReturn(Optional.of(usuario));
        when(pecaRepository.findByUsuario(usuario)).thenReturn(List.of(peca));
        when(carrinhoRepository.findByUsuario(usuario)).thenReturn(Optional.of(carrinho));

        // Execução
        usuarioService.excluirUsuarioComDependencias(userId);

        // Verificações
        verify(itemCarrinhoRepository).deleteAllByCarrinho(carrinho);
        verify(carrinhoRepository).delete(carrinho);
        verify(itemCompraRepository).deleteAllByPeca(peca);
        verify(pecaRepository).deleteAll(List.of(peca));
        verify(compraRepository).deleteAllByUsuario(usuario);
        verify(pixRepository).deleteByUsuario(usuario);
        verify(cartaoCreditoRepository).deleteByUsuario(usuario);
        verify(usuarioRepository).delete(usuario);
    }

    @Test
    public void testExcluirUsuarioComDependencias_UsuarioNaoExiste() {
        Long userId = 999L;
        when(usuarioRepository.findById(userId)).thenReturn(Optional.empty());

        RuntimeException thrown = assertThrows(RuntimeException.class, () -> {
            usuarioService.excluirUsuarioComDependencias(userId);
        });

        assertEquals("Usuário não encontrado", thrown.getMessage());
    }
}
