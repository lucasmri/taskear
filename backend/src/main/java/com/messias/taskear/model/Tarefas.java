package com.messias.taskear.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tarefas")
public class Tarefas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tarefa_id")
    private Integer tarefa_id;

    @Column(name = "titulo", nullable = false, length = 100)
    private String titulo;

    @Column(name = "descricao", nullable = false, length = 255)
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusTarefa status = StatusTarefa.pendente;

    @Column(name = "email_usuario_afetado", length = 150)
    private String email_usuario_afetado;

    @Column(name = "confirmacao")
    private Boolean confirmacao = false;

    @Column(name = "data_confirmacao")
    private LocalDateTime dataConfirmacao;

    @ManyToOne(optional = false)
    @JoinColumn(name = "equipes_usuarios")
    private EquipesUsuarios equipesUsuarios;

    @Column(name = "data_criacao", updatable = false, insertable = false)
    private LocalDateTime data_criacao;

    @Column(name = "data_conclusao")
    private LocalDateTime data_conclusao;

    public Tarefas() {
    }

    public Tarefas(Integer tarefa_id, String titulo, String descricao, StatusTarefa status, String email_usuario_afetado, Boolean confirmacao, LocalDateTime dataConfirmacao, EquipesUsuarios equipesUsuarios, LocalDateTime data_criacao, LocalDateTime data_conclusao) {
        this.tarefa_id = tarefa_id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.status = status;
        this.email_usuario_afetado = email_usuario_afetado;
        this.confirmacao = confirmacao;
        this.dataConfirmacao = dataConfirmacao;
        this.equipesUsuarios = equipesUsuarios;
        this.data_criacao = data_criacao;
        this.data_conclusao = data_conclusao;
    }

    public Integer getTarefa_id() {
        return tarefa_id;
    }

    public void setTarefa_id(Integer tarefa_id) {
        this.tarefa_id = tarefa_id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public StatusTarefa getStatus() {
        return status;
    }

    public void setStatus(StatusTarefa status) {
        this.status = status;
    }

    public String getEmail_usuario_afetado() {
        return email_usuario_afetado;
    }

    public void setEmail_usuario_afetado(String email_usuario_afetado) {
        this.email_usuario_afetado = email_usuario_afetado;
    }

    public Boolean getConfirmacao() {
        return confirmacao;
    }

    public void setConfirmacao(Boolean confirmacao) {
        this.confirmacao = confirmacao;
    }

    public LocalDateTime getDataConfirmacao() {
        return dataConfirmacao;
    }

    public void setDataConfirmacao(LocalDateTime dataConfirmacao) {
        this.dataConfirmacao = dataConfirmacao;
    }

    public EquipesUsuarios getEquipesUsuarios() {
        return equipesUsuarios;
    }

    public void setEquipesUsuarios(EquipesUsuarios equipesUsuarios) {
        this.equipesUsuarios = equipesUsuarios;
    }

    public LocalDateTime getData_criacao() {
        return data_criacao;
    }

    public void setData_criacao(LocalDateTime data_criacao) {
        this.data_criacao = data_criacao;
    }

    public LocalDateTime getData_conclusao() {
        return data_conclusao;
    }

    public void setData_conclusao(LocalDateTime data_conclusao) {
        this.data_conclusao = data_conclusao;
    }
}
