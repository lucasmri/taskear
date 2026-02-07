package com.messias.taskear.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "equipes_usuarios")
public class EquipesUsuarios {

    private Integer id;
    private Equipes equipes;
    private Usuarios usuarios;
    private Papel papel;

    public EquipesUsuarios() {
    }

    public EquipesUsuarios(Integer id, Equipes equipes, Usuarios usuarios, Papel papel) {
        this.id = id;
        this.equipes = equipes;
        this.usuarios = usuarios;
        this.papel = papel;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
