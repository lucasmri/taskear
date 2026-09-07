package com.messias.taskear.controller;

import com.messias.taskear.dto.AlterarSenhaDTO;
import com.messias.taskear.dto.AtualizarPerfilDTO;
import com.messias.taskear.dto.CadastroDTO;
import com.messias.taskear.model.Usuario;
import com.messias.taskear.service.UsuarioService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioService.listarUsuarios();
    }

    @GetMapping("/{id}")
    public Usuario listarUsuario(@PathVariable Integer id) {
        return usuarioService.listarUsuario(id);
    }

    @PostMapping
    public Usuario salvarUsuario(@RequestBody CadastroDTO dto) {
        return usuarioService.salvarUsuario(dto);
    }

    @PutMapping("/{id}")
    public Usuario atualizarUsuario(@PathVariable Integer id, @RequestBody Usuario usuarioAtualizado) {
        return usuarioService.atualizarUsuario(id, usuarioAtualizado);
    }

    @DeleteMapping("/{id}")
    public void deletarUsuario(@PathVariable Integer id) {
        usuarioService.deletarUsuario(id);
    }

    // Dados do próprio usuário autenticado (usado pela tela "Meu Perfil")
    @GetMapping("/me")
    public Usuario meuPerfil(Authentication authentication) {
        return usuarioService.buscarPorEmail(authentication.getName());
    }

    // Atualiza nome/e-mail do próprio usuário autenticado
    @PutMapping("/me")
    public Usuario atualizarMeuPerfil(Authentication authentication, @RequestBody AtualizarPerfilDTO dto) {
        return usuarioService.atualizarPerfilPorEmail(authentication.getName(), dto);
    }

    // Altera a senha do próprio usuário autenticado
    @PutMapping("/me/senha")
    public void alterarMinhaSenha(Authentication authentication, @RequestBody AlterarSenhaDTO dto) {
        usuarioService.alterarSenhaPorEmail(authentication.getName(), dto);
    }

    // Exclui a própria conta do usuário autenticado
    @DeleteMapping("/me")
    public void deletarMinhaConta(Authentication authentication) {
        usuarioService.deletarPorEmail(authentication.getName());
    }
}