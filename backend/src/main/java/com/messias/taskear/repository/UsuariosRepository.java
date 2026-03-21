package com.messias.taskear.repository;

import com.messias.taskear.model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuariosRepository extends JpaRepository<Usuarios, Integer> {
    //Evitar NullPointerException
    Optional<Usuarios> findByEmail(String email);

    boolean existsByEmail(String email);
}
