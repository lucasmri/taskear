package com.messias.taskear.repository;

import com.messias.taskear.model.StatusTarefa;
import com.messias.taskear.model.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TarefasRepository extends JpaRepository<Tarefa, Integer> {

    // Nome do metodo == nome do atributo da classe + seu identificador (A JPA quebra o camelCase e identifica o atributo)
    List<Tarefa> findByEquipeUsuarioEquipeUsuarioId(Integer equipeUsuarioId);

    List<Tarefa> findByStatus(StatusTarefa status);
}
