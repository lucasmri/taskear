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

    // Apenas o líder autenticado da equipe pode adicionar um usuário pelo e-mail.
    // (Funcionalidade de convite/aceite fica para trabalhos futuros: por ora o
    // usuário é inserido diretamente na equipe.)
    public EquipeUsuario adicionarUsuarioPorEmail(String liderEmail, Integer equipeId, String emailConvidado) {

        Usuario lider = usuarioRepository.findByEmail(liderEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não existe"));

        EquipeUsuario vinculoLider = equipeUsuarioRepository.findByUsuarioUsuarioIdAndEquipeEquipeId(lider.getUsuarioId(), equipeId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não pertence à equipe"));

        if (vinculoLider.getPapel() != Papel.lider) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas o líder da equipe pode adicionar usuários");
        }

        if (emailConvidado == null || emailConvidado.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Informe o e-mail do usuário a ser adicionado");
        }

        Usuario usuarioConvidado = usuarioRepository.findByEmail(emailConvidado.trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum usuário cadastrado com este e-mail"));

        if (usuarioConvidado.getUsuarioId().equals(lider.getUsuarioId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Você já é o líder desta equipe");
        }

        boolean usuarioExistente = equipeUsuarioRepository
                .existsByUsuarioUsuarioIdAndEquipeEquipeId(usuarioConvidado.getUsuarioId(), equipeId);

        if (usuarioExistente) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Usuário já pertence à equipe");
        }

        Equipe equipe = equipeRepository.findById(equipeId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Equipe não encontrada"));

        EquipeUsuario vinculo = new EquipeUsuario();
        vinculo.setUsuario(usuarioConvidado);
        vinculo.setEquipe(equipe);
        vinculo.setPapel(Papel.tecnico);

        return equipeUsuarioRepository.save(vinculo);
    }

    // Listar membros da equipe
    public List<EquipeUsuario> listarPorEquipe(Integer equipeId) {
        return equipeUsuarioRepository.findByEquipeEquipeId(equipeId);
    }

    // Apenas o líder autenticado da equipe pode remover um membro
    public void removerUsuario(String liderEmail, Integer equipeUsuarioId) {

        // Ver se o vínculo (membro a ser removido) existe
        EquipeUsuario vinculo = equipeUsuarioRepository.findById(equipeUsuarioId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));

        Usuario lider = usuarioRepository.findByEmail(liderEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não existe"));

        // Ver se quem está removendo é líder da equipe
        EquipeUsuario vinculoLider = equipeUsuarioRepository.findByUsuarioUsuarioIdAndEquipeEquipeId(lider.getUsuarioId(), vinculo.getEquipe().getEquipeId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Este usuário não pertence à equipe"));

        if (vinculoLider.getPapel() != Papel.lider) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas o líder da equipe pode remover usuários");
        }

        // O líder não pode remover a si mesmo da equipe
        if (vinculo.getUsuario().getUsuarioId().equals(lider.getUsuarioId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "O líder não pode se remover da equipe");
        }

        equipeUsuarioRepository.delete(vinculo);
    }

    // Um usuário técnico pode sair de uma equipe da qual faz parte.
    // O líder não pode sair da própria equipe, apenas excluí-la.
    public void sairDaEquipe(String email, Integer equipeId) {

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não existe"));

        EquipeUsuario vinculo = equipeUsuarioRepository.findByUsuarioUsuarioIdAndEquipeEquipeId(usuario.getUsuarioId(), equipeId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Você não pertence a esta equipe"));

        if (vinculo.getPapel() == Papel.lider) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "O líder não pode sair da equipe, apenas excluí-la");
        }

        equipeUsuarioRepository.delete(vinculo);
    }
}