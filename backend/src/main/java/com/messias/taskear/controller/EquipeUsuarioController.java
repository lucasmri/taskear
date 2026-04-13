package com.messias.taskear.controller;

import com.messias.taskear.model.EquipeUsuario;
import com.messias.taskear.service.EquipeUsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/equipeusuario")
public class EquipeUsuarioController {

    private final EquipeUsuarioService equipeUsuarioService;

    public EquipeUsuarioController(EquipeUsuarioService equipeUsuarioService) {
        this.equipeUsuarioService = equipeUsuarioService;
    }

    @PostMapping("/{liderId}/{equipeId}/{usuarioId}")
    public EquipeUsuario adicionarUsuario(@PathVariable Integer liderId, @PathVariable Integer equipeId, @PathVariable Integer usuarioId) {
        return equipeUsuarioService.adicionarUsuario(liderId, equipeId, usuarioId);
    }

    @GetMapping("/{id}")
    public List<EquipeUsuario> listarPorEquipe(@PathVariable Integer id) {
        return equipeUsuarioService.listarPorEquipe(id);
    }

    @DeleteMapping("/{liderId}/{equipeUsuarioId}")
    public void removerUsuario(@PathVariable Integer liderId, @PathVariable Integer equipeUsuarioId) {
        equipeUsuarioService.removerUsuario(liderId, equipeUsuarioId);
    }
}
