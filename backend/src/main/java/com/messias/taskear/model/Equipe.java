package com.messias.taskear.model;

import jakarta.persistence.*;

@Entity
@Table(name = "equipes")
public class Equipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "equipe_id")
    private Integer equipeId;

    @Column(length = 40, nullable = false)
    private String nome;

    @Column(length = 255, nullable = false)
    private String descricao;

    public Equipe() {
    }

    public Equipe(Integer equipeId, String nome, String descricao) {
        this.equipeId = equipeId;
        this.nome = nome;
        this.descricao = descricao;
    }

    public Integer getEquipeId() {
        return equipeId;
    }

    public void setEquipeId(Integer equipeId) {
        this.equipeId = equipeId;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
