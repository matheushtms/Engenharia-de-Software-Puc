package com.backend.reuse.controllers;

import com.backend.reuse.dtos.*;
import com.backend.reuse.models.*;
import com.backend.reuse.repositories.*;
import com.backend.reuse.security.JwtUtils;
import com.backend.reuse.services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.*;
import java.util.*;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;
    private final PixRepository pixRepository;
    private final CartaoCreditoRepository cartaoRepository;
    private final PecaRepository pecaRepository;
    private final JwtUtils jwtUtils;
    private final CarrinhoRepository carrinhoRepository;
    private final ItemCarrinhoRepository itemCarrinhoRepository;
    private final UsuarioService usuarioService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UsuarioController(
            UsuarioRepository usuarioRepository,
            PixRepository pixRepository,
            PecaRepository pecaRepository,
            CartaoCreditoRepository cartaoRepository,
            CarrinhoRepository carrinhoRepository,
            ItemCarrinhoRepository itemCarrinhoRepository,
            JwtUtils jwtUtils,
            UsuarioService usuarioService
    ) {
        this.usuarioRepository = usuarioRepository;
        this.pixRepository = pixRepository;
        this.cartaoRepository = cartaoRepository;
        this.pecaRepository = pecaRepository;
        this.jwtUtils = jwtUtils;
        this.itemCarrinhoRepository = itemCarrinhoRepository;
        this.carrinhoRepository = carrinhoRepository;
        this.usuarioService = usuarioService;
    }

    @GetMapping("/verificar")
    public ResponseEntity<?> verificarCliente(
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String cpf,
            @RequestParam(required = false) String nome
    ) {
        boolean encontrado = usuarioRepository.findAll().stream().anyMatch(usuario ->
                (email != null && usuario.getEmail().equalsIgnoreCase(email)) ||
                        (cpf != null && usuario.getCpf().equalsIgnoreCase(cpf)) ||
                        (nome != null && usuario.getNome().equalsIgnoreCase(nome))
        );

        return encontrado ?
                ResponseEntity.ok("Cliente encontrado.") :
                ResponseEntity.status(404).body("Cliente não cadastrado.");
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@Valid @RequestBody UsuarioCadastroRequest req) {
        try {
            if (usuarioRepository.existsByEmail(req.getEmail())) {
                return ResponseEntity.badRequest().body("E-mail já cadastrado.");
            }

            Usuario usuario = new Usuario();
            usuario.setNome(req.getNome());
            usuario.setCpf(req.getCpf());
            usuario.setDataNascimento(req.getDataNascimento());
            usuario.setEmail(req.getEmail());
            usuario.setSenha(passwordEncoder.encode(req.getSenha()));
            usuario.setGenero(req.getGenero());
            usuario.setTelefone(req.getTelefone());
            usuario.setCep(req.getCep());
            usuario.setRua(req.getRua());
            usuario.setNumero(req.getNumero());
            usuario.setComplemento(req.getComplemento());
            usuario.setBairro(req.getBairro());
            usuario.setCidade(req.getCidade());
            usuario.setEstado(req.getEstado());

            Usuario salvo = usuarioRepository.save(usuario);

            Carrinho carrinho = new Carrinho();
            carrinho.setUsuario(salvo);
            carrinho.setConfirmado(false);
            carrinhoRepository.save(carrinho);

            if (req.getTipoChavePix() != null && req.getChavePix() != null) {
                Pix pix = new Pix(req.getTipoChavePix(), req.getChavePix(), salvo);
                pixRepository.save(pix);
            }

            if (req.getNumeroCartao() != null && req.getNomeNoCartao() != null &&
                    req.getValidadeMes() != null && req.getValidadeAno() != null &&
                    req.getCodigoSeguranca() != null) {
                CartaoCredito cartao = new CartaoCredito(
                        req.getNumeroCartao(), req.getNomeNoCartao(),
                        req.getValidadeMes(), req.getValidadeAno(),
                        req.getCodigoSeguranca(), salvo);
                cartaoRepository.save(cartao);
            }

            return ResponseEntity.ok(new UsuarioResponse(salvo));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro interno: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        try {
            Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(req.getEmail());

            if (usuarioOpt.isEmpty() ||
                    !passwordEncoder.matches(req.getSenha(), usuarioOpt.get().getSenha())) {
                return ResponseEntity.status(401).body("Email ou senha inválidos.");
            }

            Usuario usuario = usuarioOpt.get();
            String token = jwtUtils.generateToken(usuario);

            HashMap<String, Object> res = new HashMap<>();
            res.put("token", token);
            res.put("usuario", new UsuarioResponse(usuario));

            return ResponseEntity.ok(res);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro interno: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        return usuarioRepository.findById(id)
                .map(usuario -> ResponseEntity.ok(new UsuarioResponse(usuario)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> buscarPorEmail(@PathVariable String email) {
        return usuarioRepository.findByEmail(email)
                .map(usuario -> ResponseEntity.ok(new UsuarioResponse(usuario)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody @Valid UsuarioEdicaoRequest request) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));

        Optional<Usuario> outroUsuario = usuarioRepository.findByEmail(request.getEmail());
        if (outroUsuario.isPresent() && !outroUsuario.get().getId().equals(usuario.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "E-mail já está em uso.");
        }

        usuario.setNome(request.getNome());
        usuario.setCpf(request.getCpf());
        usuario.setDataNascimento(request.getDataNascimento());
        usuario.setEmail(request.getEmail());
        usuario.setGenero(request.getGenero());
        usuario.setTelefone(request.getTelefone());
        usuario.setCep(request.getCep());
        usuario.setRua(request.getRua());
        usuario.setNumero(request.getNumero());
        usuario.setComplemento(request.getComplemento());
        usuario.setBairro(request.getBairro());
        usuario.setCidade(request.getCidade());
        usuario.setEstado(request.getEstado());

        // Atualizar senha só se enviada
        if (request.getSenha() != null && !request.getSenha().isBlank()) {
            usuario.setSenha(passwordEncoder.encode(request.getSenha()));
        }

        // Atualizar método de pagamento (Pix)
        if (request.getTipoChavePix() != null && request.getChavePix() != null) {
            if (usuario.getCartaoCredito() != null) {
                cartaoRepository.delete(usuario.getCartaoCredito());
                usuario.setCartaoCredito(null);
            }

            Pix pix = usuario.getPix();
            if (pix == null) {
                pix = new Pix(request.getTipoChavePix(), request.getChavePix(), usuario);
            } else {
                pix.setTipo(request.getTipoChavePix());
                pix.setChave(request.getChavePix());
            }
            pixRepository.save(pix);
            usuario.setPix(pix);

        } else if (request.getNumeroCartao() != null && request.getNomeNoCartao() != null &&
                request.getValidadeMes() != null && request.getValidadeAno() != null &&
                request.getCodigoSeguranca() != null) {
            if (usuario.getPix() != null) {
                pixRepository.delete(usuario.getPix());
                usuario.setPix(null);
            }

            CartaoCredito cartao = usuario.getCartaoCredito();
            if (cartao == null) {
                cartao = new CartaoCredito(request.getNumeroCartao(), request.getNomeNoCartao(),
                        request.getValidadeMes(), request.getValidadeAno(),
                        request.getCodigoSeguranca(), usuario);
            } else {
                cartao.setNumero(request.getNumeroCartao());
                cartao.setNomeNoCartao(request.getNomeNoCartao());
                cartao.setValidadeMes(request.getValidadeMes());
                cartao.setValidadeAno(request.getValidadeAno());
                cartao.setCodigoSeguranca(request.getCodigoSeguranca());
            }
            cartaoRepository.save(cartao);
            usuario.setCartaoCredito(cartao);
        }

        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Usuário atualizado com sucesso.");
    }

    @PostMapping("/{id}/carrinho")
    public ResponseEntity<?> sincronizarCarrinho(@PathVariable Long id, @RequestBody List<Long> pecasIds) {
        try {
            Usuario usuario = usuarioRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));

            Carrinho carrinho = carrinhoRepository.findByUsuario(usuario)
                    .orElseGet(() -> {
                        Carrinho novo = new Carrinho();
                        novo.setUsuario(usuario);
                        novo.setConfirmado(false);
                        return carrinhoRepository.save(novo);
                    });

            List<ItemCarrinho> itensAntigos = itemCarrinhoRepository.findByCarrinho(carrinho);
            itemCarrinhoRepository.deleteAll(itensAntigos);

            for (Long pecaId : pecasIds) {
                Peca peca = pecaRepository.findById(pecaId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Peça não encontrada: " + pecaId));
                ItemCarrinho item = new ItemCarrinho();
                item.setCarrinho(carrinho);
                item.setPeca(peca);
                itemCarrinhoRepository.save(item);
            }

            return ResponseEntity.ok("Carrinho sincronizado com sucesso.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao sincronizar carrinho: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        try {
            usuarioService.excluirUsuarioComDependencias(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Usuário não encontrado.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao excluir usuário: " + e.getMessage());
        }
    }


    @PostMapping("/{id}/foto")
    public ResponseEntity<?> uploadFoto(@PathVariable Long id, @RequestParam("arquivo") MultipartFile arquivo) {
        try {
            Usuario usuario = usuarioRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));

            String nomeArquivo = UUID.randomUUID() + "_" + arquivo.getOriginalFilename();
            Path destino = Paths.get("uploads/" + nomeArquivo);
            Files.createDirectories(destino.getParent());
            Files.copy(arquivo.getInputStream(), destino, StandardCopyOption.REPLACE_EXISTING);

            usuario.setFotoUrl("http://localhost:8080/usuarios/foto/" + nomeArquivo);
            usuarioRepository.save(usuario);

            return ResponseEntity.ok().body("Foto enviada com sucesso.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erro ao salvar foto.");
        }
    }

    @GetMapping("/foto/{nomeArquivo}")
    public ResponseEntity<Resource> servirFoto(@PathVariable String nomeArquivo) {
        try {
            Path caminho = Paths.get("uploads").resolve(nomeArquivo).normalize();
            Resource recurso = new UrlResource(caminho.toUri());

            if (!recurso.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(recurso);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
