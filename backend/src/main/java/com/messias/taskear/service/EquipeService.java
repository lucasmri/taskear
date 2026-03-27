package com.messias.taskear.service;

import com.messias.taskear.repository.EquipeRepository;
import com.messias.taskear.repository.EquipeUsuarioRepository;
import com.messias.taskear.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

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

    
}
