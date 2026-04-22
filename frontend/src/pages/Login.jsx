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
    <div id="login-page">

      <div className="login-container">

        <form id="login-form" onSubmit={handleSubmit}>

          <h2>Login</h2>

          <div className="form-group">
            <label htmlFor="login-email">E-mail</label>
            <input type="email" placeholder="@email.com" id="login-email" name="email" value={form.email} onChange={handleEmailChange} required/>
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Senha</label>
            <input type="password" placeholder="senha" id="login-password" name="senha" value={form.senha} onChange={handleSenhaChange} required/>
          </div>

          <div className="form-actions">
            <div className="form-group">
              <input type="checkbox" id="remember-user"/>
              <label htmlFor="remember-user">Lembrar usuário</label>
            </div>

            <div className="form-group">
              <Link to="/Cadastro">Criar uma conta</Link>
              <button type="submit">Entrar</button>
            </div>
          </div>
          

        </form>

      </div>

    </div>
  )
}