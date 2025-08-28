package com.backend.reuse.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartaoCredito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numero;
    private String nomeNoCartao;
    private String validadeMes;
    private String validadeAno;
    private String codigoSeguranca;

    @OneToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    @JsonIgnore
    private Usuario usuario;

    // 👇 CONSTRUTOR PERSONALIZADO
    public CartaoCredito(String numero, String nomeNoCartao, String validadeMes, String validadeAno, String codigoSeguranca, Usuario usuario) {
        this.numero = numero;
        this.nomeNoCartao = nomeNoCartao;
        this.validadeMes = validadeMes;
        this.validadeAno = validadeAno;
        this.codigoSeguranca = codigoSeguranca;
        this.usuario = usuario;
    }
}
