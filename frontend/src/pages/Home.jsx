import Menu from '../components/Menu.jsx';

export default function Home() {
  return (
    <div id="home-page">

      <Menu />

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