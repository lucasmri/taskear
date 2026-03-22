package com.messias.taskear.repository;

import com.messias.taskear.model.EquipeUsuario;
import com.messias.taskear.model.Papel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EquipeUsuarioRepository extends JpaRepository<EquipeUsuario, Integer> {

    // Lista nunca retorna Null
    List<EquipeUsuario> findByUsuarioUsuarioId(Integer usuarioId);

    List<EquipeUsuario> findByEquipeEquipeId(Integer equipeId);

    Optional<EquipeUsuario> findByUsuarioUsuarioIdAndEquipeEquipeId(Integer usuarioId, Integer equipeId);

    Optional<EquipeUsuario> findFirstByEquipeEquipeIdAndPapel(Integer equipeId, Papel papel);

    List<EquipeUsuario> findAllByEquipeEquipeIdAndPapel(Integer equipeId, Papel papel);

    // Usar boolean para saber se existe ou não
    boolean existsByUsuarioUsuarioIdAndEquipeEquipeId(Integer usuarioId, Integer equipeId);
}
