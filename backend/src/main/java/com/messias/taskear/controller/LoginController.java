package com.messias.taskear.controller;

import com.messias.taskear.dto.LoginDTO;
import com.messias.taskear.model.Usuario;
import com.messias.taskear.service.LoginService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping
    public Usuario login(@RequestBody LoginDTO loginDTO) {
        return loginService.login(loginDTO);
    }
}
