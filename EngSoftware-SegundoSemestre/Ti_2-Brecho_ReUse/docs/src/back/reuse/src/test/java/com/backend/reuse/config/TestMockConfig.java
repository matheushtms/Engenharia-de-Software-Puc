package com.backend.reuse.config;

import com.backend.reuse.repositories.UsuarioRepository;
import com.backend.reuse.repositories.PecaRepository;
import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TestMockConfig {

    @Bean
    public UsuarioRepository usuarioRepository() {
        return Mockito.mock(UsuarioRepository.class);
    }

    @Bean
    public PecaRepository pecaRepository() {
        return Mockito.mock(PecaRepository.class);
    }
}
