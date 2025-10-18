import { Link } from "react-router-dom";

export default function Cadastro() {
  return (
    <div id="cadastro-page">

      <div className="cadastro-container">

        <div id="cadastro-form">

          <h2>Cadastro</h2>

          <div className="form-group">
            <label htmlFor="cadastro-name">Nome</label>
            <input type="text" placeholder="nome" id="cadastro-name" />
          </div>

          <div className="form-group">
            <label htmlFor="cadastro-email">E-mail</label>
            <input type="email" placeholder="@email.com" id="cadastro-email" />
          </div>

          <div className="form-group">
            <label htmlFor="cadastro-password">Senha</label>
            <input type="password" placeholder="senha" id="cadastro-password" />
          </div>

          <div className="form-actions">
            <div className="form-group">
              <Link to="/">Já tenho uma conta</Link>
            </div>

            <div className="form-group">
              <button type="submit">Cadastrar</button>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}