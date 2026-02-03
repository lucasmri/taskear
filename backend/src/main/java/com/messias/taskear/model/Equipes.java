package com.messias.taskear.model;

import jakarta.persistence.*;

@Entity
@Table(name = "equipes")
public class Equipes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "equipe_id")
    private Integer id;

    @Column(length = 40, nullable = false)
    private String nome;

    @Column(length = 255, nullable = false)
    private String descricao;

    public Equipes() {
    }

    public Equipes(Integer id, String nome, String descricao) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
