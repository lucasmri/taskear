package com.messias.taskear.model;

import jakarta.persistence.*;

@Entity
@Table(name = "equipes_usuarios")
public class EquipeUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "equipe_usuario_id")
    private Integer equipeUsuarioId;

    @ManyToOne
    @JoinColumn(name = "equipe_id", nullable = false)
    private Equipe equipe;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Papel papel;

    public EquipeUsuario() {
    }

    public EquipeUsuario(Integer equipeUsuarioId, Equipe equipe, Usuario usuario, Papel papel) {
        this.equipeUsuarioId = equipeUsuarioId;
        this.equipe = equipe;
        this.usuario = usuario;
        this.papel = papel;
    }

    public Integer getEquipeUsuarioId() {
        return equipeUsuarioId;
    }

    public void setEquipeUsuarioId(Integer equipeUsuarioId) {
        this.equipeUsuarioId = equipeUsuarioId;
    }

    public Equipe getEquipes() {
        return equipe;
    }

    public void setEquipes(Equipe equipe) {
        this.equipe = equipe;
    }

    public Usuario getUsuarios() {
        return usuario;
    }

    public void setUsuarios(Usuario usuario) {
        this.usuario = usuario;
    }

    public Papel getPapel() {
        return papel;
    }

    public void setPapel(Papel papel) {
        this.papel = papel;
    }
}
