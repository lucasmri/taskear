import Menu from '../components/Menu.jsx';
import GroupsIcon from '@mui/icons-material/Groups';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import TaskIcon from '@mui/icons-material/Task';
import styles from "./styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.home_page}>

      <Menu />

      <main className={styles.teams_section}>

        <div className={styles.cards_status}>
          
          <div className={styles.card_peding}>
            <PendingActionsIcon style={{ color: "#F2B718", fontSize: 80 }}/>
            <div className={styles.card_info}>
              <p className={styles.card_info_label}>Tarefas pendentes</p>
              <p className={styles.card_info_value}>0</p>
            </div>
          </div>

          <div className={styles.card_doing}>
            <SyncAltIcon style={{ color: "#1F60B5", fontSize: 80 }}/>
            <div className={styles.card_info}>
              <p className={styles.card_info_label}>Tarefas em andamentos</p>
              <p className={styles.card_info_value}>0</p>
            </div>
          </div>

          <div className={styles.card_done}>
            <TaskIcon style={{ color: "#25703B", fontSize: 80 }}/>
            <div className={styles.card_info}>
              <p className={styles.card_info_label}>Tarefas concluídas</p>
              <p className={styles.card_info_value}>0</p>
            </div>
          </div>

        </div>

        <div className={styles.teams_card}>
          <GroupsIcon style={{ color: "#1F60B5", fontSize: 280 }}/>
          <div className={styles.teams_card_info}>
            <p className={styles.teams_card_label}>Minhas equipes</p>
            <p className={styles.teams_card_value}>0</p>
          </div>
        </div>

      </main>

    </div>
  )
}