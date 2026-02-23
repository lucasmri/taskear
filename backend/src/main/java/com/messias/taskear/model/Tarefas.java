package com.messias.taskear.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tarefas")
public class Tarefas {

    private Integer id;

    private String titulo;

    private String descricao;

    private StatusTarefa status = StatusTarefa.pendente;

    private String email_usuario_afetado;

    private Boolean confirmacao;

    
}
