package com.messias.taskear.repository;

import com.messias.taskear.model.EquipesUsuarios;
import com.messias.taskear.model.Papel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EquipesUsuariosRepository extends JpaRepository<EquipesUsuarios, Integer> {

    // Lista nunca retorna Null
    List<EquipesUsuarios> findByUsuariosUsuario_id(Integer usuario_id);

    List<EquipesUsuarios> findByEquipesEquipe_id(Integer equipe_id);

    Optional<EquipesUsuarios> findByUsuariosUsuario_idAndEquipesEquipe_id(Integer usuario_id, Integer equipe_id);

    Optional<EquipesUsuarios> findFirstByEquipesEquipe_idAndPapel(Integer equipe_id, Papel papel);

    List<EquipesUsuarios> findAllByEquipesEquipe_idAndPapel(Integer equipe_id, Papel papel);

    // Usar boolean para saber se existe ou não
    boolean existsByUsuariosUsuario_idAndEquipesEquipe_id(Integer usuario_id, Integer equipe_id);
}
