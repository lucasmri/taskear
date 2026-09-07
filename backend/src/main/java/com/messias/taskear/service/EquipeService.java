package com.messias.taskear.service;

import com.messias.taskear.model.Equipe;
import com.messias.taskear.model.EquipeUsuario;
import com.messias.taskear.model.Papel;
import com.messias.taskear.model.Usuario;
import com.messias.taskear.repository.EquipeRepository;
import com.messias.taskear.repository.EquipeUsuarioRepository;
import com.messias.taskear.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    public Equipe criarEquipePorEmail(String email, Equipe equipe) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Usuário não existe"
                ));

        Equipe equipeSalva = equipeRepository.save(equipe);

        EquipeUsuario vinculo = new EquipeUsuario();
        vinculo.setEquipe(equipeSalva);
        vinculo.setUsuario(usuario);
        vinculo.setPapel(Papel.lider);

        equipeUsuarioRepository.save(vinculo);

        return equipeSalva;
    }

    public Equipe criarEquipe(Integer id, Equipe equipe) {

        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não existe"));

        Equipe equipeSalva = equipeRepository.save(equipe);

        EquipeUsuario vinculo = new EquipeUsuario();
        vinculo.setEquipe(equipeSalva);
        vinculo.setUsuario(usuario);
        vinculo.setPapel(Papel.lider);

        equipeUsuarioRepository.save(vinculo);

        return equipeSalva;
    }

    public List<Equipe> listarEquipesPorEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Usuário não existe"
                ));

        return equipeUsuarioRepository.findByUsuarioUsuarioId(usuario.getUsuarioId())
                .stream()
                .map(EquipeUsuario::getEquipe)
                .toList();
    }

    public Equipe listarEquipe(Integer id) {
        return equipeRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Equipe não encontrada"));
    }

    public Equipe listarEquipePorEmail(Integer id, String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Usuário não existe"
                ));

        boolean pertenceAEquipe = equipeUsuarioRepository
                .existsByUsuarioUsuarioIdAndEquipeEquipeId(usuario.getUsuarioId(), id);

        if (!pertenceAEquipe) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Você não tem acesso a esta equipe");
        }

        return listarEquipe(id);
    }

    public Equipe atualizarEquipe(Integer id, String email, Equipe equipeAtualizada) {

        verificarSeLider(id, email);

        Equipe equipe = listarEquipe(id);

        equipe.setNome(equipeAtualizada.getNome());
        equipe.setDescricao(equipeAtualizada.getDescricao());

        return equipeRepository.save(equipe);
    }

    public void deletarEquipe(Integer id, String email) {

        verificarSeLider(id, email);

        Equipe equipe = listarEquipe(id);

        equipeRepository.delete(equipe);
    }

    private void verificarSeLider(Integer equipeId, String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Usuário não existe"
                ));

        EquipeUsuario vinculo = equipeUsuarioRepository
                .findByUsuarioUsuarioIdAndEquipeEquipeId(usuario.getUsuarioId(), equipeId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Você não tem acesso a esta equipe"));

        if (vinculo.getPapel() != Papel.lider) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas o líder da equipe pode realizar esta ação");
        }
    }
}