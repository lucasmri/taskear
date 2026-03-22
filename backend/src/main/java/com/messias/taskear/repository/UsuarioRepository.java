package com.messias.taskear.repository;

import com.messias.taskear.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    //Evitar NullPointerException
    Optional<Usuario> findByEmail(String email);

    boolean existsByEmail(String email);
}
