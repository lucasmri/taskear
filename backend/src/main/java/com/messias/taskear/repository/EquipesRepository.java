package com.messias.taskear.repository;

import com.messias.taskear.model.Equipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EquipesRepository extends JpaRepository<Equipe, Integer> {
    //Evitar NullPointerException
    Optional<Equipe> findByNome(String nome);
}
