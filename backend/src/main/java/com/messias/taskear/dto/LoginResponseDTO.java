package com.messias.taskear.dto;

public class LoginResponseDTO {

    private String token;
    private Integer usuarioId;
    private String nome;
    private String email;

    public LoginResponseDTO() {
    }

    public LoginResponseDTO(String token, Integer usuarioId, String nome, String email) {
        this.token = token;
        this.usuarioId = usuarioId;
        this.nome = nome;
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
