package com.messias.taskear.controller;

import com.messias.taskear.dto.AdicionarUsuarioDTO;
import com.messias.taskear.model.EquipeUsuario;
import com.messias.taskear.service.EquipeUsuarioService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/equipeusuario")
public class EquipeUsuarioController {

    private final EquipeUsuarioService equipeUsuarioService;

    public EquipeUsuarioController(EquipeUsuarioService equipeUsuarioService) {
        this.equipeUsuarioService = equipeUsuarioService;
    }

    // Líder adiciona um usuário diretamente à equipe pelo e-mail
    @PostMapping("/{equipeId}/convidar")
    public EquipeUsuario adicionarUsuario(
            Authentication authentication,
            @PathVariable Integer equipeId,
            @RequestBody AdicionarUsuarioDTO dto
    ) {
        return equipeUsuarioService.adicionarUsuarioPorEmail(
                authentication.getName(),
                equipeId,
                dto.getEmail()
        );
    }

    @GetMapping("/{id}")
    public List<EquipeUsuario> listarPorEquipe(@PathVariable Integer id) {
        return equipeUsuarioService.listarPorEquipe(id);
    }

    @DeleteMapping("/{equipeUsuarioId}")
    public void removerUsuario(Authentication authentication, @PathVariable Integer equipeUsuarioId) {
        equipeUsuarioService.removerUsuario(authentication.getName(), equipeUsuarioId);
    }

    // Usuário técnico autenticado sai voluntariamente da equipe
    @DeleteMapping("/equipe/{equipeId}/sair")
    public void sairDaEquipe(Authentication authentication, @PathVariable Integer equipeId) {
        equipeUsuarioService.sairDaEquipe(authentication.getName(), equipeId);
    }
}