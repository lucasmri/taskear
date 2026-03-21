package com.messias.taskear.repository;

import com.messias.taskear.model.Equipes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EquipesRepository extends JpaRepository<Equipes, Integer> {
    //Evitar NullPointerException
    Optional<Equipes> findByNome(String nome);
}
