package com.messias.taskear.controller;

import com.messias.taskear.model.Equipe;
import com.messias.taskear.service.EquipeService;
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
    public List<Equipe> listarEquipes() {
        return equipeService.listarEquipes();
    }

    @GetMapping("/{id}")
    public Equipe listarEquipe(@PathVariable Integer id) {
        return equipeService.listarEquipe(id);
    }

    @PostMapping("/{id}")
    public Equipe criarEquipe(@PathVariable Integer id, @RequestBody Equipe equipe) {
        return equipeService.criarEquipe(id, equipe);
    }

    @PutMapping("/{id}")
    public Equipe atualizarEquipe(@PathVariable Integer id, @RequestBody Equipe equipeAtualizada) {
        return equipeService.atualizarEquipe(id, equipeAtualizada);
    }

    @DeleteMapping("/{id}")
    public void deletarEquipe(@PathVariable Integer id) {
        equipeService.deletarEquipe(id);
    }
}
