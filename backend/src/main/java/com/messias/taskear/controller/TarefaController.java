package com.messias.taskear.controller;

import com.messias.taskear.model.Tarefa;
import com.messias.taskear.service.TarefaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tarefa")
public class TarefaController {

    private final TarefaService tarefaService;

    public TarefaController(TarefaService tarefaService) {
        this.tarefaService = tarefaService;
    }

    @GetMapping
    public List<Tarefa> listarTarefas() {
        return tarefaService.listarTarefas();
    }

    @GetMapping("/{id}")
    public Tarefa listarPorId(@PathVariable Integer id) {
        return tarefaService.listarPorId(id);
    }

    @PostMapping("/{usuarioId}/{equipeId}")
    public Tarefa criarTarefa(@PathVariable Integer usuarioId, @PathVariable Integer equipeId, @RequestBody Tarefa tarefa) {
        return tarefaService.criarTarefa(usuarioId, equipeId, tarefa);
    }

    @GetMapping("/equipe/{equipeId}")
    public List<Tarefa> listarPorEquipe(@PathVariable Integer equipeId) {
        return tarefaService.listarPorEquipe(equipeId);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Tarefa> listarPorUsuario(@PathVariable Integer usuarioId) {
        return tarefaService.listarPorUsuario(usuarioId);
    }

    @PutMapping("/confirmar/{tarefaId}")
    public Tarefa confirmar(@PathVariable Integer tarefaId) {
        return tarefaService.confirmar(tarefaId);
    }

    @PutMapping("/concluir/{tarefaId}")
    public Tarefa concluir(@PathVariable Integer tarefaId, @RequestParam String email) {
        return tarefaService.concluir(tarefaId, email);
    }

}
