package com.messias.taskear.service;

import com.messias.taskear.dto.AlterarSenhaDTO;
import com.messias.taskear.dto.AtualizarPerfilDTO;
import com.messias.taskear.dto.CadastroDTO;
import com.messias.taskear.model.Tarefa;
import com.messias.taskear.model.Usuario;
import com.messias.taskear.repository.TarefaRepository;
import com.messias.taskear.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UsuarioService {

    // Injeção de dependência via construtor
    private final UsuarioRepository usuarioRepository;
    private final TarefaRepository tarefaRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UsuarioService(UsuarioRepository usuarioRepository, TarefaRepository tarefaRepository) {
        this.usuarioRepository = usuarioRepository;
        this.tarefaRepository = tarefaRepository;
    }

    public Usuario salvarUsuario(CadastroDTO dto) {
        if (usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "E-mail já cadastrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setSenhaHash(encoder.encode(dto.getSenha()));

        return usuarioRepository.save(usuario);
    }

    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario listarUsuario(Integer id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));
    }

    public Usuario atualizarUsuario(Integer id, Usuario usuarioAtualizado) {

        Usuario usuario = listarUsuario(id);

        usuario.setEmail(usuarioAtualizado.getEmail());
        usuario.setNome(usuarioAtualizado.getNome());

        return usuarioRepository.save(usuario);
    }

    public void deletarUsuario(Integer id) {

        Usuario usuario = listarUsuario(id);

        usuarioRepository.delete(usuario);
    }

    // Busca o usuário autenticado a partir do e-mail contido no token JWT
    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));
    }

    // Atualiza nome/e-mail do próprio usuário autenticado, exigindo confirmação da senha atual
    public Usuario atualizarPerfilPorEmail(String email, AtualizarPerfilDTO dto) {

        Usuario usuario = buscarPorEmail(email);

        if (dto.getSenhaAtual() == null || dto.getSenhaAtual().isBlank()
                || !encoder.matches(dto.getSenhaAtual(), usuario.getSenhaHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Senha atual incorreta");
        }

        if (dto.getNome() == null || dto.getNome().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Informe o nome");
        }

        if (dto.getEmail() == null || dto.getEmail().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Informe o e-mail");
        }

        String novoEmail = dto.getEmail().trim();

        boolean emailAlterado = !novoEmail.equalsIgnoreCase(usuario.getEmail());

        if (emailAlterado && usuarioRepository.existsByEmail(novoEmail)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "E-mail já cadastrado");
        }

        usuario.setNome(dto.getNome().trim());
        usuario.setEmail(novoEmail);

        return usuarioRepository.save(usuario);
    }

    // Altera a senha do próprio usuário autenticado, exigindo confirmação da senha atual
    public void alterarSenhaPorEmail(String email, AlterarSenhaDTO dto) {

        Usuario usuario = buscarPorEmail(email);

        if (dto.getSenhaAtual() == null || dto.getSenhaAtual().isBlank()
                || !encoder.matches(dto.getSenhaAtual(), usuario.getSenhaHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Senha atual incorreta");
        }

        if (dto.getNovaSenha() == null || dto.getNovaSenha().length() < 6) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A nova senha deve ter pelo menos 6 caracteres");
        }

        if (!dto.getNovaSenha().equals(dto.getConfirmarNovaSenha())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A confirmação de senha não confere");
        }

        usuario.setSenhaHash(encoder.encode(dto.getNovaSenha()));

        usuarioRepository.save(usuario);
    }

    // Exclui a própria conta do usuário autenticado
    public void deletarPorEmail(String email) {

        Usuario usuario = buscarPorEmail(email);

        // Remove antes as tarefas vinculadas ao usuário (em qualquer equipe da qual faça parte),
        // pois a FK de tarefas -> equipes_usuarios não possui ON DELETE CASCADE no banco
        List<Tarefa> tarefas = tarefaRepository.findByEquipeUsuarioUsuarioUsuarioId(usuario.getUsuarioId());
        tarefaRepository.deleteAll(tarefas);

        // A exclusão do usuário já remove em cascata seus vínculos em equipes_usuarios
        usuarioRepository.delete(usuario);
    }
}