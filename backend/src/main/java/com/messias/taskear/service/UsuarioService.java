package com.messias.taskear.service;

import com.messias.taskear.model.Usuario;
import com.messias.taskear.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    // Injeção de dependência via construtor
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    
   public Usuario salvarUsuario(Usuario usuario) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("E-mail já cadastrado");
        }
        return usuarioRepository.save(usuario);
   }

   public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
   }

   public Usuario listarUsuario(Integer id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
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

}
