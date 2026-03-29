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
public class EquipeService {

    private final EquipeRepository equipeRepository;
    private final UsuarioRepository usuarioRepository;
    private final EquipeUsuarioRepository equipeUsuarioRepository;

    //Injeção
    public EquipeService(EquipeRepository equipeRepository, UsuarioRepository usuarioRepository, EquipeUsuarioRepository equipeUsuarioRepository) {
        this.equipeRepository = equipeRepository;
        this.usuarioRepository = usuarioRepository;
        this.equipeUsuarioRepository = equipeUsuarioRepository;
    }

    public Equipe criarEquipe(Integer id, Equipe equipe) {

        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Equipe equipeSalva = equipeRepository.save(equipe);

        EquipeUsuario vinculo = new EquipeUsuario();
        vinculo.setEquipe(equipeSalva);
        vinculo.setUsuario(usuario);
        vinculo.setPapel(Papel.lider);

        equipeUsuarioRepository.save(vinculo);

        return equipeSalva;
    }

    public List<Equipe> listarEquipes() {
        return equipeRepository.findAll();
    }

    public Equipe listarEquipe(Integer id) {
        return equipeRepository.findById(id).orElseThrow(() -> new RuntimeException("Equipe não encontrada"));
    }

    public Equipe atualizarEquipe(Integer id, Equipe equipeAtualizada) {

        Equipe equipe = listarEquipe(id);

        equipe.setNome(equipeAtualizada.getNome());
        equipe.setDescricao(equipeAtualizada.getDescricao());

        return equipeRepository.save(equipe);
    }

    public void deletarEquipe(Integer id) {

        Equipe equipe = listarEquipe(id);

        equipeRepository.delete(equipe);
    }
}
