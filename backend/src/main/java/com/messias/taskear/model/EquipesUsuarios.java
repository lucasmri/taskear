package com.messias.taskear.model;

import jakarta.persistence.*;

@Entity
@Table(name = "equipes_usuarios")
public class EquipesUsuarios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "equipe_usuario_id")
    private Integer equipe_usuario_id;

    @ManyToOne
    @JoinColumn(name = "equipe_id", nullable = false)
    private Equipes equipes;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuarios usuarios;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Papel papel;

    public EquipesUsuarios() {
    }

    public EquipesUsuarios(Integer equipe_usuario_id, Equipes equipes, Usuarios usuarios, Papel papel) {
        this.equipe_usuario_id = equipe_usuario_id;
        this.equipes = equipes;
        this.usuarios = usuarios;
        this.papel = papel;
    }

    public Integer getEquipe_usuario_id() {
        return equipe_usuario_id;
    }

    public void setEquipe_usuario_id(Integer equipe_usuario_id) {
        this.equipe_usuario_id = equipe_usuario_id;
    }

    public Equipes getEquipes() {
        return equipes;
    }

    public void setEquipes(Equipes equipes) {
        this.equipes = equipes;
    }

    public Usuarios getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(Usuarios usuarios) {
        this.usuarios = usuarios;
    }

    public Papel getPapel() {
        return papel;
    }

    public void setPapel(Papel papel) {
        this.papel = papel;
    }
}
