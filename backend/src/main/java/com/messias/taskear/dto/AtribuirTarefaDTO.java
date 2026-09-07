package com.messias.taskear.dto;

public class AtribuirTarefaDTO {

    // Nulo ou vazio = desatribuir a tarefa (remove o "Atribuído para" do card)
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}