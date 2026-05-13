import Menu from '../components/Menu.jsx';
import GroupsIcon from '@mui/icons-material/Groups';

export default function Home() {
  return (
    <div id="home-page">

      <Menu />

      <main className="teams-section">

        <div className="cards-status">
          
          <div className="card-pending">
            <GroupsIcon style={{ color: "blue", fontSize: 32 }}/>
            <div className="card-pending-info">
              <p className="card-pending-info-label">Tarefas pendentes</p>
              <p className="card-pending-info-value">10</p>
            </div>
          </div>

          <div className="card-doing">
            <GroupsIcon style={{ color: "blue", fontSize: 32 }}/>
            <div className="card-doing-info">
              <p className="card-doing-info-label">Tarefas em andamentos</p>
              <p className="card-doing-info-value">02</p>
            </div>
          </div>

          <div className="card-done">
            <GroupsIcon style={{ color: "blue", fontSize: 32 }}/>
            <div className="card-done-info">
              <p className="card-done-info-label">Tarefas concluídas</p>
              <p className="card-done-info-value">29</p>
            </div>
          </div>

        </div>

        <div className="teams-card">
          <GroupsIcon style={{ color: "blue", fontSize: 32 }}/>
          <div className="teams-card-info">
            <p className="teams-card-label">Minhas equipes</p>
            <p className="teams-card-value">02</p>
          </div>
        </div>

      </main>

    </div>
  )
}