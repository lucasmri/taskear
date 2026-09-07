package com.messias.taskear.controller;

import com.messias.taskear.dto.AtribuirTarefaDTO;
import com.messias.taskear.model.Tarefa;
import com.messias.taskear.service.TarefaService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.messias.taskear.model.StatusTarefa;

import java.util.List;

@RestController
@RequestMapping("/tarefa")
public class TarefaController {

    private final TarefaService tarefaService;

    public TarefaController(TarefaService tarefaService) {
        this.tarefaService = tarefaService;
    }

    @GetMapping
    public List<Tarefa> listarTarefas(Authentication authentication) {
        return tarefaService.listarTarefasPorEmail(authentication.getName());
    }

    @GetMapping("/{id}")
    public Tarefa listarPorId(@PathVariable Integer id) {
        return tarefaService.listarPorId(id);
    }

    @PostMapping("/{equipeId}")
    public Tarefa criarTarefa(
            Authentication authentication,
            @PathVariable Integer equipeId,
            @RequestBody Tarefa tarefa
    ) {
        return tarefaService.criarTarefaPorEmail(
                authentication.getName(),
                equipeId,
                tarefa
        );
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

    @PutMapping("/{tarefaId}")
    public Tarefa editarTarefa(
            @PathVariable Integer tarefaId,
            @RequestBody Tarefa tarefa
    ) {
        return tarefaService.editarTarefa(tarefaId, tarefa);
    }

    // Apenas o líder da equipe pode atribuir/desatribuir uma tarefa a um membro
    @PutMapping("/{tarefaId}/atribuir")
    public Tarefa atribuirTarefa(
            Authentication authentication,
            @PathVariable Integer tarefaId,
            @RequestBody AtribuirTarefaDTO dto
    ) {
        return tarefaService.atribuirTarefa(authentication.getName(), tarefaId, dto.getEmail());
    }

    @PutMapping("/{tarefaId}/status")
    public Tarefa alterarStatus(
            @PathVariable Integer tarefaId,
            @RequestParam StatusTarefa status
    ) {
        return tarefaService.alterarStatus(tarefaId, status);
    }

    @DeleteMapping("/{tarefaId}")
    public void excluirTarefa(@PathVariable Integer tarefaId) {
        tarefaService.excluirTarefa(tarefaId);
    }

}