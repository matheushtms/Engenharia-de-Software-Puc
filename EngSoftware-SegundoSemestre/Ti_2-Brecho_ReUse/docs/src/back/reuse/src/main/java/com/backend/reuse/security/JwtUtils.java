package com.backend.reuse.security;
import com.backend.reuse.models.Usuario;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtils {

    // Gera uma chave segura compatível com o algoritmo HS512
    private final SecretKey key = Keys.hmacShaKeyFor(
            "a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5a6b7c8d9e0f1".getBytes()
    );    private final long expirationMs = 86400000; // 24h

    // Gera o token JWT
    public String generateToken(Usuario usuario) {
        return Jwts.builder()
                .setSubject(usuario.getEmail())
                .claim("role", "ROLE_" + usuario.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key)
                .compact();
    }

    // Verifica se o token é válido
    public boolean isTokenValid(String token) {
        try {
            // Tenta parsear o token e verificar se ele é válido
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("Token expirado: " + e.getMessage());
        } catch (SignatureException e) {
            System.out.println("Assinatura inválida: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Erro ao validar o token: " + e.getMessage());
        }
        return false;
    }

    public String getRoleFromToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
            return claims.get("role", String.class);
        } catch (Exception e) {
            return null;
        }
    }

    // Extrai o email do token
    public String getEmailFromToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject();
        } catch (JwtException e) {
            System.out.println("Erro ao extrair o email do token: " + e.getMessage());
            return null;
        }
    }

    // Acessa o subject (no caso, o email) do token
    public String getSubject(String token) {
        return getEmailFromToken(token);
    }
}


