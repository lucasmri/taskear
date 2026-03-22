package com.messias.taskear.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tarefas")
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tarefa_id")
    private Integer tarefaId;

    @Column(name = "titulo", nullable = false, length = 100)
    private String titulo;

    @Column(name = "descricao", nullable = false, length = 255)
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusTarefa status = StatusTarefa.pendente;

    @Column(name = "email_usuario_afetado", length = 150)
    private String emailUsuarioAfetado;

    @Column(name = "confirmacao")
    private Boolean confirmacao = false;

    @Column(name = "data_confirmacao")
    private LocalDateTime dataConfirmacao;

    @ManyToOne(optional = false)
    @JoinColumn(name = "equipes_usuarios")
    private EquipeUsuario equipeUsuario;

    @Column(name = "data_criacao", updatable = false, insertable = false)
    private LocalDateTime dataCriacao;

    @Column(name = "data_conclusao")
    private LocalDateTime dataConclusao;

    public Tarefa() {
    }

    public Tarefa(Integer tarefaId, String titulo, String descricao, StatusTarefa status, String emailUsuarioAfetado, Boolean confirmacao, LocalDateTime dataConfirmacao, EquipeUsuario equipeUsuario, LocalDateTime dataCriacao, LocalDateTime dataConclusao) {
        this.tarefaId = tarefaId;
        this.titulo = titulo;
        this.descricao = descricao;
        this.status = status;
        this.emailUsuarioAfetado = emailUsuarioAfetado;
        this.confirmacao = confirmacao;
        this.dataConfirmacao = dataConfirmacao;
        this.equipeUsuario = equipeUsuario;
        this.dataCriacao = dataCriacao;
        this.dataConclusao = dataConclusao;
    }

    public Integer getTarefaId() {
        return tarefaId;
    }

    public void setTarefaId(Integer tarefaId) {
        this.tarefaId = tarefaId;
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

    public String getEmailUsuarioAfetado() {
        return emailUsuarioAfetado;
    }

    public void setEmailUsuarioAfetado(String emailUsuarioAfetado) {
        this.emailUsuarioAfetado = emailUsuarioAfetado;
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

    public EquipeUsuario getEquipeUsuario() {
        return equipeUsuario;
    }

    public void setEquipeUsuario(EquipeUsuario equipeUsuario) {
        this.equipeUsuario = equipeUsuario;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public LocalDateTime getDataConclusao() {
        return dataConclusao;
    }

    public void setDataConclusao(LocalDateTime dataConclusao) {
        this.dataConclusao = dataConclusao;
    }
}
