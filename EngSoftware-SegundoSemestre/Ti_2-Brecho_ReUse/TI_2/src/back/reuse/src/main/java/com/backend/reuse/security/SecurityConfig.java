package com.backend.reuse.security;

import com.backend.reuse.config.CorsConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            // Usa a configuração de CORS definida em CorsConfig
            .cors(cors -> cors.configurationSource(new CorsConfig().corsConfigurationSource()))
            // Desabilita CSRF para permitir PATCH, DELETE, etc.
            .csrf(csrf -> csrf.disable())
            .sessionManagement(sess -> sess
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Libera CRUD de peças
                .requestMatchers(HttpMethod.POST, "/pecas").permitAll()
                .requestMatchers(HttpMethod.GET, "/pecas/**").permitAll()
                .requestMatchers(HttpMethod.PUT, "/pecas/**").permitAll()
                .requestMatchers(HttpMethod.PATCH, "/pecas/**").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/pecas/**").permitAll()
                .requestMatchers(HttpMethod.OPTIONS, "/pecas/**").permitAll()

                // 🔓 Libera o registro inicial de peça (histórico de doação)
                .requestMatchers(HttpMethod.POST, "/registro-inicial").permitAll()

                // Libera rotas públicas de usuários
                .requestMatchers(
                    "/usuarios",
                    "/usuarios/login",
                    "/usuarios/verificar",
                    "/usuarios/redefinir-senha"
                ).permitAll()

                .requestMatchers(HttpMethod.POST, "/usuarios/*/carrinho").permitAll()

                // Acesso restrito para admin
                .requestMatchers("/dashboard/**").hasAuthority("ROLE_ADMIN")

                // Todo o resto requer autenticação
                .anyRequest().authenticated()
            )
            // Aplica o filtro JWT
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    @Bean
    public AuthenticationManager authManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
