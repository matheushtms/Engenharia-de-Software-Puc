package com.backend.reuse.controllers;

import com.backend.reuse.config.TestMockConfig;
import com.backend.reuse.dtos.PecaRequest;
import com.backend.reuse.models.Peca;
import com.backend.reuse.models.Usuario;
import com.backend.reuse.repositories.PecaRepository;
import com.backend.reuse.repositories.UsuarioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.util.ReflectionTestUtils;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PecaController.class)
@Import(TestMockConfig.class)
public class PecaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PecaRepository pecaRepository;

    private Usuario usuario;
    private Peca peca;

    @BeforeEach
    void setup() {
        usuario = new Usuario("João", "123.456.789-00", LocalDate.of(2000, 1, 1), "Masculino",
                "31999999999", "joao@email.com", "senha123", "30123-456", "Rua A",
                "123", "Ap 1", "Centro", "Belo Horizonte", "MG");
        usuario.setId(1L);

        peca = new Peca("Camisa", "Roupas", "Camisa preta", BigDecimal.valueOf(50.00),
                "M", "Nova", "Unissex", "Venda", "img.jpg", usuario);
        ReflectionTestUtils.setField(peca, "id", 1L);
    }

    @Test
    void deveCadastrarPecaComSucesso() throws Exception {
        PecaRequest req = new PecaRequest();
        req.setNome("Camisa");
        req.setUsuarioId(1L);

        Mockito.when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        Mockito.when(pecaRepository.save(Mockito.any())).thenReturn(peca);

        mockMvc.perform(post("/pecas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Camisa"));
    }

    @Test
    void naoDeveCadastrarPecaComUsuarioInvalido() throws Exception {
        PecaRequest req = new PecaRequest();
        req.setNome("Camisa");
        req.setUsuarioId(999L);

        Mockito.when(usuarioRepository.findById(999L)).thenReturn(Optional.empty());

        mockMvc.perform(post("/pecas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Usuário não encontrado."));
    }

    @Test
    void deveBuscarPecaPorId() throws Exception {
        Mockito.when(pecaRepository.findById(1L)).thenReturn(Optional.of(peca));

        mockMvc.perform(get("/pecas/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    void naoDeveEncontrarPecaPorId() throws Exception {
        Mockito.when(pecaRepository.findById(2L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/pecas/2"))
                .andExpect(status().isNotFound());
    }
}