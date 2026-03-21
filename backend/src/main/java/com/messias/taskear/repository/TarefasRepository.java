package com.messias.taskear.repository;

import com.messias.taskear.model.StatusTarefa;
import com.messias.taskear.model.Tarefas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TarefasRepository extends JpaRepository<Tarefas, Integer> {

    // Nome do metodo == nome do atributo da classe + seu identificador (A JPA quebra o camelCase e identifica o atributo)
    List<Tarefas> findByEquipesUsuariosEquipe_usuario_id(Integer equipe_usuario_id);

    List<Tarefas> findByStatus(StatusTarefa status);
}
