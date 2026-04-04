package com.messias.taskear.repository;

import com.messias.taskear.model.StatusTarefa;
import com.messias.taskear.model.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Integer> {

    // Nome do metodo == nome do atributo da classe + seu identificador (A JPA quebra o camelCase e identifica o atributo)
    List<Tarefa> findByEquipeUsuarioEquipeUsuarioId(Integer equipeUsuarioId);

    List<Tarefa> findByEquipeUsuarioUsuarioUsuarioId(Integer usuarioUsuarioId);

    List<Tarefa> findByStatus(StatusTarefa status);
}
