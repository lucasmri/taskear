import "./styles/Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", senha: "" });

  function handleEmailChange(e) {
    setForm({ ...form, email: e.target.value });
  }

  function handleSenhaChange(e) {
    setForm({ ...form, senha: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 401) {
        alert("E-mail ou senha inválidos!");
        return;
      }

      const usuario = await res.json();
      localStorage.setItem("usuario", JSON.stringify(usuario));

      navigate("/Home");
    } catch {
      alert("Erro na requisição!");
    }
  }

  return (
    <div className="login-container">

      <div className="card">

        <div className="welcome-msg">
          <h2>Bem-vindo de volta!</h2>
          <p>Você pode acessar sua conta ou criar uma caso não tenha.</p>
        </div>

        <div className="login-form">

          <form className="form" onSubmit={handleSubmit}>

            <h2>Entrar</h2>

            <div className="form-group">
              <label htmlFor="login-email">E-mail</label>
              <input type="email" placeholder="seu e-mail" id="login-email" name="email" value={form.email} onChange={handleEmailChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Senha</label>
              <input type="password" placeholder="sua senha" id="login-password" name="senha" value={form.senha} onChange={handleSenhaChange} required />
            </div>

            <div className="form-actions">

              <div className="form-group-password">
                <input type="checkbox" id="remember-user" />
                <label htmlFor="remember-user">Lembrar usuário</label>
              </div>

              <div className="form-group">
                <Link to="/" className="link">Esqueci minha senha!</Link>
              </div>
            </div>

            <div className="form-actions-login">

              <div className="form-group-login">
                <button type="submit" className="login-btn">Entrar</button>
                <Link to="/Cadastro" className="link">Criar uma nova <span className="span_decorator">conta</span></Link>
              </div>
              
            </div>

          </form>

        </div>

      </div>

      <img src="https://i.imgur.com/qR6w9dw_d.webp?maxwidth=760&fidelity=grand" alt="Logo - Taskear" className="logo-taskear" />

    </div>
  )
}