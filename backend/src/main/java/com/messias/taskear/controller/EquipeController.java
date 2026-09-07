package com.messias.taskear.controller;

import com.messias.taskear.model.Equipe;
import com.messias.taskear.service.EquipeService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/equipe")
public class EquipeController {

    private final EquipeService equipeService;

    public EquipeController(EquipeService equipeService) {
        this.equipeService = equipeService;
    }

    @GetMapping
    public List<Equipe> listarEquipes(Authentication authentication) {
        return equipeService.listarEquipesPorEmail(authentication.getName());
    }

    @GetMapping("/{id}")
    public Equipe listarEquipe(Authentication authentication, @PathVariable Integer id) {
        return equipeService.listarEquipePorEmail(id, authentication.getName());
    }

    @PostMapping
    public Equipe criarEquipe(Authentication authentication, @RequestBody Equipe equipe) {
        return equipeService.criarEquipePorEmail(authentication.getName(), equipe);
    }

    @PutMapping("/{id}")
    public Equipe atualizarEquipe(Authentication authentication, @PathVariable Integer id, @RequestBody Equipe equipeAtualizada) {
        return equipeService.atualizarEquipe(id, authentication.getName(), equipeAtualizada);
    }

    @DeleteMapping("/{id}")
    public void deletarEquipe(Authentication authentication, @PathVariable Integer id) {
        equipeService.deletarEquipe(id, authentication.getName());
    }
}