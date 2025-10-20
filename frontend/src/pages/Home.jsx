import { NavLink } from 'react-router-dom'

export default function Home() {
  return (
    <div id="home-page">

      <aside className="aside-menu">
        <nav>
          <ul>
            <li>
              <NavLink to="/Home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/Home">Equipes</NavLink>
            </li>
            <li>
              <NavLink to="/Home">Configurações</NavLink>
            </li>
            <li>
              <NavLink to="/">Sair</NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="teams-section">

        <div className="teams-header">
          <div className="teams-group">
            <h2>Minhas equipes</h2>
          </div>

          <div className="teams-actions">
            <button>Criar uma equipe</button>
          </div>
        </div>

        <div className="teams-list">
          <p>Vazio</p>
        </div>

      </main>

    </div>
  )
}