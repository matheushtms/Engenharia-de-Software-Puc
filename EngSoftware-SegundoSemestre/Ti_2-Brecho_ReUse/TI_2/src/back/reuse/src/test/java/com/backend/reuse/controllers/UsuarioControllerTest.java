package com.backend.reuse.controllers;

import com.backend.reuse.config.TestMockConfig;
import com.backend.reuse.dtos.LoginRequest;
import com.backend.reuse.dtos.UsuarioRequest;
import com.backend.reuse.models.Usuario;
import com.backend.reuse.repositories.UsuarioRepository;
import com.backend.reuse.services.UsuarioService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UsuarioController.class)
@Import({TestMockConfig.class, UsuarioService.class})
public class UsuarioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Usuario usuario;

    @BeforeEach
    void setup() {
        usuario = new Usuario("Joao", "123.456.789-00", LocalDate.of(2000, 1, 1), "Masculino",
                "31999999999", "joao@email.com", "$2a$10$senhaCodificada", "30123-456", "Rua A",
                "123", "Ap 1", "Centro", "Belo Horizonte", "MG");
        usuario.setId(1L);
    }

    @Test
    void deveBuscarUsuarioPorId() throws Exception {
        Mockito.when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));

        mockMvc.perform(get("/usuarios/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.nome").value("Joao"));
    }

    @Test
    void naoDeveBuscarUsuarioPorIdInexistente() throws Exception {
        Mockito.when(usuarioRepository.findById(2L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/usuarios/2"))
                .andExpect(status().isNotFound());
    }

    @Test
    void naoDeveCadastrarUsuarioComEmailDuplicado() throws Exception {
        UsuarioRequest req = new UsuarioRequest();
        req.setEmail("joao@email.com");
        Mockito.when(usuarioRepository.existsByEmail("joao@email.com")).thenReturn(true);

        mockMvc.perform(post("/usuarios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("E-mail já cadastrado."));
    }

    @Test
    void naoDeveFazerLoginComEmailInexistente() throws Exception {
        LoginRequest login = new LoginRequest();
        login.setEmail("naoexiste@email.com");
        login.setSenha("senha123");

        Mockito.when(usuarioRepository.findByEmail("naoexiste@email.com")).thenReturn(Optional.empty());

        mockMvc.perform(post("/usuarios/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isUnauthorized());
    }
}