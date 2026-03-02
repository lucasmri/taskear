package com.messias.taskear.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "tarefas")
public class Tarefas {

    private Integer tarefa_id;

    private String titulo;

    private String descricao;

    private StatusTarefa status = StatusTarefa.pendente;

    private String email_usuario_afetado;

    private Boolean confirmacao;

    private LocalDateTime dataConfirmacao;

}
