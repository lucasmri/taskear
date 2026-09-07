package com.messias.taskear.service;

import com.messias.taskear.model.EquipeUsuario;
import com.messias.taskear.model.Papel;
import com.messias.taskear.model.StatusTarefa;
import com.messias.taskear.model.Tarefa;
import com.messias.taskear.repository.EquipeUsuarioRepository;
import com.messias.taskear.repository.TarefaRepository;
import com.messias.taskear.repository.UsuarioRepository;
import com.messias.taskear.model.Usuario;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TarefaService {

    private final TarefaRepository tarefaRepository;
    private final EquipeUsuarioRepository equipeUsuarioRepository;
    private final UsuarioRepository usuarioRepository;

    public TarefaService(
            TarefaRepository tarefaRepository,
            EquipeUsuarioRepository equipeUsuarioRepository,
            UsuarioRepository usuarioRepository
    ) {
        this.tarefaRepository = tarefaRepository;
        this.equipeUsuarioRepository = equipeUsuarioRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public Tarefa criarTarefaPorEmail(String email, Integer equipeId, Tarefa tarefa) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Usuário não encontrado"
                ));

        return criarTarefa(usuario.getUsuarioId(), equipeId, tarefa);
    }

    public Tarefa criarTarefa(Integer usuarioId, Integer equipeId, Tarefa tarefa) {
        EquipeUsuario vinculo = equipeUsuarioRepository.findByUsuarioUsuarioIdAndEquipeEquipeId(usuarioId, equipeId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não pertence à equipe"));

        tarefa.setEquipeUsuario(vinculo);

        tarefa.setStatus(StatusTarefa.pendente);

        tarefa.setDataCriacao(LocalDateTime.now());

        return tarefaRepository.save(tarefa);
    }

    // Mesmo padrão do EquipeService.listarEquipesPorEmail: descobre o usuário
    // pelo e-mail do token e retorna só as tarefas das equipes das quais ele
    // faz parte (e não todas as tarefas do sistema).
    public List<Tarefa> listarTarefasPorEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Usuário não existe"
                ));

        List<Integer> idsDasEquipes = equipeUsuarioRepository
                .findByUsuarioUsuarioId(usuario.getUsuarioId())
                .stream()
                .map(vinculo -> vinculo.getEquipe().getEquipeId())
                .toList();

        return tarefaRepository.findByEquipeUsuarioEquipeEquipeIdIn(idsDasEquipes);
    }

    public Tarefa listarPorId(Integer id) {
        return tarefaRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tarefa não encontrada"));
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

    public Tarefa editarTarefa(Integer tarefaId, Tarefa tarefaAtualizada) {
        Tarefa tarefa = listarPorId(tarefaId);

        tarefa.setTitulo(tarefaAtualizada.getTitulo());
        tarefa.setDescricao(tarefaAtualizada.getDescricao());

        return tarefaRepository.save(tarefa);
    }

    // Apenas o líder da equipe dona da tarefa pode atribuí-la (ou desatribuí-la,
    // quando emailAtribuido vier nulo/vazio) a um membro específico.
    // Isso é apenas um rótulo visual: quem criou a tarefa (equipeUsuario) não muda.
    public Tarefa atribuirTarefa(String liderEmail, Integer tarefaId, String emailAtribuido) {

        Tarefa tarefa = listarPorId(tarefaId);

        Integer equipeId = tarefa.getEquipeUsuario().getEquipe().getEquipeId();

        Usuario lider = usuarioRepository.findByEmail(liderEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não existe"));

        EquipeUsuario vinculoLider = equipeUsuarioRepository.findByUsuarioUsuarioIdAndEquipeEquipeId(lider.getUsuarioId(), equipeId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não pertence à equipe"));

        if (vinculoLider.getPapel() != Papel.lider) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas o líder da equipe pode atribuir tarefas");
        }

        // E-mail em branco/nulo = desatribuir a tarefa
        if (emailAtribuido == null || emailAtribuido.isBlank()) {
            tarefa.setEmailUsuarioAfetado(null);
            return tarefaRepository.save(tarefa);
        }

        Usuario usuarioAtribuido = usuarioRepository.findByEmail(emailAtribuido.trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum usuário cadastrado com este e-mail"));

        boolean pertenceAEquipe = equipeUsuarioRepository
                .existsByUsuarioUsuarioIdAndEquipeEquipeId(usuarioAtribuido.getUsuarioId(), equipeId);

        if (!pertenceAEquipe) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Este usuário não pertence à equipe da tarefa");
        }

        tarefa.setEmailUsuarioAfetado(usuarioAtribuido.getEmail());

        return tarefaRepository.save(tarefa);
    }

    public Tarefa alterarStatus(
            Integer tarefaId,
            StatusTarefa novoStatus
    ) {
        Tarefa tarefa = listarPorId(tarefaId);

        tarefa.setStatus(novoStatus);

        if (novoStatus == StatusTarefa.concluido) {
            tarefa.setDataConclusao(LocalDateTime.now());
        } else {
            tarefa.setDataConclusao(null);
        }

        return tarefaRepository.save(tarefa);
    }

    public void excluirTarefa(Integer tarefaId) {
        Tarefa tarefa = listarPorId(tarefaId);
        tarefaRepository.delete(tarefa);
    }
}