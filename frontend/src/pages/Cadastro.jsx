import "./styles/Cadastro.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cadastro() {

  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "", senhaHash: "" });

  function handleNomeChange(e) {
    setForm({ ...form, nome: e.target.value });
  }

  function handleEmailChange(e) {
    setForm({ ...form, email: e.target.value });
  }

  function handleSenhaChange(e) {
    setForm({ ...form, senhaHash: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/usuario", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 409) {
        alert("E-mail já castrado!");
        return;
      }
      navigate("/");
    } catch {
      alert("Erro na requisição!");
    }
  }
  
  return (
    <div id="cadastro-page">

      <div className="cadastro-container">

        <form id="cadastro-form" onSubmit={handleSubmit}>

          <h2>Cadastro</h2>

          <div className="form-group">
            <label htmlFor="cadastro-name">Nome</label>
            <input type="text" placeholder="nome" id="cadastro-name" name="nome" value={form.nome} onChange={handleNomeChange} required/>
          </div>

          <div className="form-group">
            <label htmlFor="cadastro-email">E-mail</label>
            <input type="email" placeholder="@email.com" id="cadastro-email" name="email" value={form.email} onChange={handleEmailChange} required/>
          </div>

          <div className="form-group">
            <label htmlFor="cadastro-password">Senha</label>
            <input type="password" placeholder="senha" id="cadastro-password" name="senhaHash" value={form.senhaHash} onChange={handleSenhaChange} required/>
          </div>

          <div className="form-actions">
            <div className="form-group">
              <Link to="/">Já tenho uma conta</Link>
            </div>

            <div className="form-group">
              <button type="submit">Cadastrar</button>
            </div>
          </div>

        </form>

      </div>

    </div>
  )
}