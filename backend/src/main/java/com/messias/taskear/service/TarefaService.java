package com.messias.taskear.service;

import com.messias.taskear.model.EquipeUsuario;
import com.messias.taskear.model.StatusTarefa;
import com.messias.taskear.model.Tarefa;
import com.messias.taskear.repository.EquipeUsuarioRepository;
import com.messias.taskear.repository.TarefaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TarefaService {

    private final TarefaRepository tarefaRepository;
    private final EquipeUsuarioRepository equipeUsuarioRepository;

    public TarefaService(TarefaRepository tarefaRepository, EquipeUsuarioRepository equipeUsuarioRepository) {
        this.tarefaRepository = tarefaRepository;
        this.equipeUsuarioRepository = equipeUsuarioRepository;
    }

    public Tarefa criarTarefa(Integer usuarioId, Integer equipeId, Tarefa tarefa) {
        EquipeUsuario vinculo = equipeUsuarioRepository.findByUsuarioUsuarioIdAndEquipeEquipeId(usuarioId, equipeId)
                .orElseThrow(() -> new RuntimeException("Usuário não pertence à equipe"));

        tarefa.setEquipeUsuario(vinculo);

        tarefa.setStatus(StatusTarefa.pendente);

        tarefa.setDataCriacao(LocalDateTime.now());

        return tarefaRepository.save(tarefa);
    }

    public List<Tarefa> listar() {
        return tarefaRepository.findAll();
    }

    public Tarefa listarPorId(Integer id) {
        return tarefaRepository.findById(id).orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
    }

    public Tarefa concluir(Integer tarefaId, String emailUsuarioAfetado) {

        Tarefa tarefa = listarPorId(tarefaId);

        tarefa.setStatus(StatusTarefa.concluido);

        tarefa.setEmailUsuarioAfetado(emailUsuarioAfetado);

        tarefa.setDataConclusao(LocalDateTime.now());

        return tarefaRepository.save(tarefa);
    }

    public Tarefa confirmar(Integer tarefaId) {

        Tarefa tarefa = listarPorId(tarefaId);

        tarefa.setConfirmacao(true);

        tarefa.setDataConfirmacao(LocalDateTime.now());

        return tarefaRepository.save(tarefa);
    }

    public List<Tarefa> listarPorEquipe(Integer equipeId) {
        return tarefaRepository.findByEquipeUsuarioEquipeUsuarioId(equipeId);
    }

    public List<Tarefa> listarPorUsuario(Integer usuarioId) {
        return tarefaRepository.findByEquipeUsuarioUsuarioUsuarioId(usuarioId);
    }
}
