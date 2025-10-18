import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div id="login-page">

      <div className="login-container">

        <form id="login-form">

          <h2>Login</h2>

          <div className="form-group">
            <label htmlFor="login-email">E-mail</label>
            <input type="email" placeholder="@email.com" id="login-email"/>
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Senha</label>
            <input type="password" placeholder="senha" id="login-password"/>
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