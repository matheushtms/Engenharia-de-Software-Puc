package com.backend.reuse.controllers;

import com.backend.reuse.dtos.PecaRequest;
import com.backend.reuse.dtos.PecaResponse;
import com.backend.reuse.models.Peca;
import com.backend.reuse.models.Usuario;
import com.backend.reuse.repositories.PecaRepository;
import com.backend.reuse.repositories.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/pecas")
@CrossOrigin(
    origins = "http://127.0.0.1:5500",
    allowedHeaders = "*",
    methods = {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.PUT,
        RequestMethod.PATCH,
        RequestMethod.DELETE,
        RequestMethod.OPTIONS
    }
)
public class PecaController {

    private final PecaRepository pecaRepository;
    private final UsuarioRepository usuarioRepository;

    public PecaController(PecaRepository pecaRepository, UsuarioRepository usuarioRepository) {
        this.pecaRepository = pecaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@Valid @RequestBody PecaRequest req) {
        if (req.getModalidade() == null || req.getModalidade().isEmpty()) {
            req.setModalidade("Não especificado");
        }
        if (req.getImagem() == null || req.getImagem().isEmpty()) {
            req.setImagem("imagem_default.png");
        }
        if (req.getPreco() == null || req.getPreco().compareTo(BigDecimal.ZERO) <= 0) {
            return ResponseEntity.badRequest().body("O preço deve ser maior que 0.");
        }

        Optional<Usuario> usuario = usuarioRepository.findById(req.getUsuarioId());
        if (usuario.isEmpty()) {
            return ResponseEntity.badRequest().body("Usuário não encontrado.");
        }

        Peca peca = new Peca(
            req.getNome(),
            req.getCategoria(),
            req.getDescricao(),
            req.getPreco(),
            req.getTamanho(),
            req.getCondicao(),
            req.getGenero(),
            req.getModalidade(),
            req.getImagem(),
            usuario.get()
        );
        Peca salva = pecaRepository.save(peca);

        return ResponseEntity.ok(new PecaResponse(
            salva.getId(),
            salva.getNome(),
            salva.getCategoria(),
            salva.getDescricao(),
            salva.getModalidade(),
            salva.getTamanho(),
            salva.getCondicao(),
            salva.getGenero(),
            salva.getPreco(),
            salva.getImagem(),
            salva.getUsuario().getCidade(),
            salva.getUsuario().getId()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscar(@PathVariable Long id) {
        return pecaRepository.findById(id)
            .map(p -> new PecaResponse(
                p.getId(),
                p.getNome(),
                p.getCategoria(),
                p.getDescricao(),
                p.getModalidade(),
                p.getTamanho(),
                p.getCondicao(),
                p.getGenero(),
                p.getPreco(),
                p.getImagem(),
                p.getUsuario().getCidade(),
                p.getUsuario().getId()
            ))
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<?> listar(
        @RequestParam(value = "categoria", required = false) String categoria,
        @RequestParam(value = "cidade", required = false) String cidade
    ) {
        List<PecaResponse> filtradas = pecaRepository.findAll().stream()
            .filter(p -> {
                boolean match = true;
                if (categoria != null && !categoria.isEmpty()) {
                    match &= p.getCategoria().equalsIgnoreCase(categoria);
                }
                if (cidade != null && !cidade.isEmpty()) {
                    match &= p.getUsuario().getCidade().equalsIgnoreCase(cidade);
                }
                return match;
            })
            .map(p -> new PecaResponse(
                p.getId(),
                p.getNome(),
                p.getCategoria(),
                p.getDescricao(),
                p.getModalidade(),
                p.getTamanho(),
                p.getCondicao(),
                p.getGenero(),
                p.getPreco(),
                p.getImagem(),
                p.getUsuario().getCidade(),
                p.getUsuario().getId()
            ))
            .collect(Collectors.toList());

        return ResponseEntity.ok(filtradas);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> listarPorUsuario(@PathVariable Long usuarioId) {
        if (!usuarioRepository.existsById(usuarioId)) {
            return ResponseEntity.badRequest().body("Usuário não encontrado.");
        }

        List<PecaResponse> pecas = pecaRepository.findAll().stream()
            .filter(p -> p.getUsuario().getId().equals(usuarioId))
            .map(p -> new PecaResponse(
                p.getId(),
                p.getNome(),
                p.getCategoria(),
                p.getDescricao(),
                p.getModalidade(),
                p.getTamanho(),
                p.getCondicao(),
                p.getGenero(),
                p.getPreco(),
                p.getImagem(),
                p.getUsuario().getCidade(),
                p.getUsuario().getId()
            ))
            .collect(Collectors.toList());

        return ResponseEntity.ok(pecas);
    }

    @GetMapping("/with-modalidade")
    public ResponseEntity<List<PecaResponse>> listarComModalidade() {
        List<PecaResponse> respostas = pecaRepository.findAll().stream()
            .filter(p -> !"Não especificado".equalsIgnoreCase(p.getModalidade()))
            .map(p -> new PecaResponse(
                p.getId(),
                p.getNome(),
                p.getCategoria(),
                p.getDescricao(),
                p.getModalidade(),
                p.getTamanho(),
                p.getCondicao(),
                p.getGenero(),
                p.getPreco(),
                p.getImagem(),
                p.getUsuario().getCidade(),
                p.getUsuario().getId()
            ))
            .collect(Collectors.toList());

        return ResponseEntity.ok(respostas);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@PathVariable Long id, @Valid @RequestBody PecaRequest req) {
        Optional<Usuario> usuario = usuarioRepository.findById(req.getUsuarioId());
        if (usuario.isEmpty()) {
            return ResponseEntity.badRequest().body("Usuário não encontrado.");
        }

        return pecaRepository.findById(id)
            .map(peca -> {
                peca.setNome(req.getNome());
                peca.setCategoria(req.getCategoria());
                peca.setDescricao(req.getDescricao());
                peca.setPreco(req.getPreco());
                peca.setTamanho(req.getTamanho());
                peca.setCondicao(req.getCondicao());
                peca.setGenero(req.getGenero());
                peca.setModalidade(req.getModalidade());
                peca.setImagem(req.getImagem());
                peca.setUsuario(usuario.get());
                Peca atualizada = pecaRepository.save(peca);

                return ResponseEntity.ok(new PecaResponse(
                    atualizada.getId(),
                    atualizada.getNome(),
                    atualizada.getCategoria(),
                    atualizada.getDescricao(),
                    atualizada.getModalidade(),
                    atualizada.getTamanho(),
                    atualizada.getCondicao(),
                    atualizada.getGenero(),
                    atualizada.getPreco(),
                    atualizada.getImagem(),
                    atualizada.getUsuario().getCidade(),
                    atualizada.getUsuario().getId()
                ));
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        if (!pecaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        pecaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/modalidade")
    public ResponseEntity<?> atualizarModalidade(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String novaModalidade = body.get("modalidade");
        if (novaModalidade == null || novaModalidade.isBlank()) {
            return ResponseEntity.badRequest().body("Modalidade inválida");
        }
        Optional<Peca> opt = pecaRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Peca p = opt.get();
        p.setModalidade(novaModalidade);
        pecaRepository.save(p);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/preco")
    public ResponseEntity<?> atualizarPreco(@PathVariable Long id, @RequestBody Map<String, String> body) {
        try {
            String precoStr = body.get("preco");
            if (precoStr == null) {
                return ResponseEntity.badRequest().body("Preço não fornecido");
            }

            BigDecimal novoPreco = new BigDecimal(precoStr.replace(",", "."));

            Optional<Peca> optPeca = pecaRepository.findById(id);
            if (optPeca.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Peca peca = optPeca.get();
            peca.setPreco(novoPreco);
            pecaRepository.save(peca);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao atualizar o preço.");
        }
    }
}
