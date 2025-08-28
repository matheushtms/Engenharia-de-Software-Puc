package com.backend.reuse.services;

import com.backend.reuse.models.Peca;
import com.backend.reuse.models.RegistroInicialDaPeca;
import com.backend.reuse.models.Usuario;
import com.backend.reuse.repositories.PecaRepository;
import com.backend.reuse.repositories.RegistroInicialDaPecaRepository;
import com.backend.reuse.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class RegistroInicialDaPecaService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PecaRepository pecaRepository;

    @Autowired
    private RegistroInicialDaPecaRepository registroRepository;

    public void registrarIntent(Long usuarioId, Long pecaId, String modalidade) {
        if (!"DOACAO".equalsIgnoreCase(modalidade)) {
            return; // Ignora vendas
        }

        if (registroRepository.existsByPecaId(pecaId)) {
            return; // Já registrado
        }

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Peca peca = pecaRepository.findById(pecaId)
                .orElseThrow(() -> new RuntimeException("Peça não encontrada"));

        RegistroInicialDaPeca registro = new RegistroInicialDaPeca();
        registro.setUsuario(usuario);
        registro.setPeca(peca);
        registro.setModalidade("DOACAO");
        registro.setDataRegistro(LocalDate.now());

        registroRepository.save(registro);
    }
}
