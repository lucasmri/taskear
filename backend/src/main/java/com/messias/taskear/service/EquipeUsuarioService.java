package com.messias.taskear.service;

import com.messias.taskear.model.Equipe;
import com.messias.taskear.model.EquipeUsuario;
import com.messias.taskear.model.Papel;
import com.messias.taskear.model.Usuario;
import com.messias.taskear.repository.EquipeRepository;
import com.messias.taskear.repository.EquipeUsuarioRepository;
import com.messias.taskear.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipeUsuarioService {

    private final EquipeUsuarioRepository equipeUsuarioRepository;
    private final EquipeRepository equipeRepository;
    private final UsuarioRepository usuarioRepository;

    // Injeção
    public EquipeUsuarioService(EquipeUsuarioRepository equipeUsuarioRepository, EquipeRepository equipeRepository, UsuarioRepository usuarioRepository) {
        this.equipeUsuarioRepository = equipeUsuarioRepository;
        this.equipeRepository = equipeRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public EquipeUsuario adicionarUsuario(Integer liderId, Integer equipeId, Integer usuarioId) {

        EquipeUsuario lider = equipeUsuarioRepository.findByUsuarioUsuarioIdAndEquipeEquipeId(liderId, equipeId)
                .orElseThrow(() -> new RuntimeException("Usuário não pertence à equipe"));

        if (lider.getPapel() != Papel.lider) {
            throw new RuntimeException("Apenas o líder da equipe pode adicionar usuários");
        }

        // Ver se o usuário já está na equipe
        boolean usuarioExistente = equipeUsuarioRepository.existsByUsuarioUsuarioIdAndEquipeEquipeId(usuarioId, equipeId);

        if (usuarioExistente) {
            throw new RuntimeException("Usuário já pertence à equipe");
        }

        // Usuário que quero inserir
        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Equipe que quero inserir o usuário
        Equipe equipe = equipeRepository.findById(equipeId).orElseThrow(() -> new RuntimeException("Equipe não encontrada"));

        EquipeUsuario vinculo = new EquipeUsuario();
        vinculo.setUsuario(usuario);
        vinculo.setEquipe(equipe);
        vinculo.setPapel(Papel.tecnico);

        return equipeUsuarioRepository.save(vinculo);
    }

    // Listar membros da equipe
    public List<EquipeUsuario> listarPorEquipe(Integer equipeId) {
        return equipeUsuarioRepository.findByEquipeEquipeId(equipeId);
    }

    public void removerUsuario(Integer liderId, Integer equipeUsuarioId) {

        // Ver se a equipe existe/vinculo
        EquipeUsuario vinculo = equipeUsuarioRepository.findById(equipeUsuarioId).orElseThrow(() -> new RuntimeException("Vínculo não encontrado"));

        // Ver se o líder está na equipe
        EquipeUsuario lider = equipeUsuarioRepository.findByUsuarioUsuarioIdAndEquipeEquipeId(liderId, vinculo.getEquipe().getEquipeId())
                .orElseThrow(() -> new RuntimeException(("Este usuário líder não pertence à equipe")));

        // Ver se o líder é lider
        if (lider.getPapel() != Papel.lider) {
            throw new RuntimeException("Apenas o líder da equipe pode remover usuários");
        }

        equipeUsuarioRepository.delete(vinculo);
    }
}
