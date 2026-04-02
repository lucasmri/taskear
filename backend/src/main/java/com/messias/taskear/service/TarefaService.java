package com.messias.taskear.service;

import com.messias.taskear.repository.EquipeUsuarioRepository;
import com.messias.taskear.repository.TarefaRepository;
import org.springframework.stereotype.Service;

@Service
public class TarefaService {

    private final TarefaRepository tarefaRepository;
    private final EquipeUsuarioRepository equipeUsuarioRepository;

    public TarefaService(TarefaRepository tarefaRepository, EquipeUsuarioRepository equipeUsuarioRepository) {
        this.tarefaRepository = tarefaRepository;
        this.equipeUsuarioRepository = equipeUsuarioRepository;
    }
}
