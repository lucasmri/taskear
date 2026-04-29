import styles from "./styles/Cadastro.module.css";
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
        alert("E-mail já cadastrado!");
        return;
      }
      navigate("/");
    } catch {
      alert("Erro na requisição!");
    }
  }
  
  return (
    <div className={styles.cadastro_container}>

      <div className={styles.card}>

        <form className={styles.cadastro_form} onSubmit={handleSubmit}>

          <h2>Cadastro</h2>

          <div className="form-group">
            <label htmlFor="cadastro-name">Nome</label>
            <input type="text" placeholder="seu nome completo" id="cadastro-name" name="nome" value={form.nome} onChange={handleNomeChange} required/>
          </div>

          <div className="form-group">
            <label htmlFor="cadastro-email">E-mail</label>
            <input type="email" placeholder="seu e-mail" id="cadastro-email" name="email" value={form.email} onChange={handleEmailChange} required/>
          </div>

          <div className="form-group">
            <label htmlFor="cadastro-password">Senha</label>
            <input type="password" placeholder="sua senha" id="cadastro-password" name="senhaHash" value={form.senhaHash} onChange={handleSenhaChange} required/>
          </div>

          <div className={styles.form_action_cadastro}>

            <div className={styles.form_group_cadastro}>
              <button type="submit" className={styles.cadastro_btn}>Cadastrar</button>
              <Link to="/" className={styles.link}>Já tenho uma <span className="span_decorator">conta</span></Link>
            </div>

          </div>

        </form>

        <div className={styles.welcome_msg}>
          <h2>Bem-vindo!</h2>
          <p>Para começar a usar nosso sistema, preencha os campos com os dados solicitados.</p>
        </div>

      </div>

      <img src="https://i.imgur.com/qR6w9dw_d.webp?maxwidth=760&fidelity=grand" alt="Logo - Taskear" className="logo-taskear" />

    </div>
  )
}