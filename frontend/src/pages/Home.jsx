import { useEffect, useState } from 'react';

import Menu from '../components/Menu.jsx';
import { apiFetch } from '../services/api';
import GroupsIcon from '@mui/icons-material/Groups';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import TaskIcon from '@mui/icons-material/Task';
import styles from "./styles/Home.module.css";

const resumoInicial = {
  pendentes: 0,
  emAndamento: 0,
  concluidas: 0,
  minhasEquipes: 0,
};

export default function Home() {
  const [resumo, setResumo] = useState(resumoInicial);

  useEffect(() => {
    carregarResumo();
  }, []);

  async function carregarResumo() {

    try {
      const [respostaEquipes, respostaTarefas] = await Promise.all([
        apiFetch('/equipe'),
        apiFetch('/tarefa'),
      ]);

      if (!respostaEquipes.ok || !respostaTarefas.ok) {
        throw new Error('Não foi possível carregar os dados da home.');
      }

      const equipes = await respostaEquipes.json();
      const tarefas = await respostaTarefas.json();

      const pendentes = tarefas.filter(
        (tarefa) => tarefa.status === 'pendente'
      ).length;

      const emAndamento = tarefas.filter(
        (tarefa) => tarefa.status === 'em_andamento'
      ).length;

      const concluidas = tarefas.filter(
        (tarefa) => tarefa.status === 'concluido'
      ).length;

      setResumo({
        pendentes,
        emAndamento,
        concluidas,
        minhasEquipes: equipes.length,
      });
    } catch (error) {
      console.error(error);
    } 
  }

  return (
    <div className={styles.home_page}>

      <Menu />

      <main className={styles.dashboard_section}>

        <div className={styles.cards_status}>
          
          <div className={styles.card_peding}>
            <PendingActionsIcon style={{ color: "#F2B718", fontSize: 80 }}/>
            <div className={styles.card_info}>
              <p className={styles.card_info_label}>Tarefas pendentes</p>
              <p className={styles.card_info_value}>
                {resumo.pendentes}
              </p>
            </div>
          </div>

          <div className={styles.card_doing}>
            <SyncAltIcon style={{ color: "#1F60B5", fontSize: 80 }}/>
            <div className={styles.card_info}>
              <p className={styles.card_info_label}>Tarefas em andamentos</p>
              <p className={styles.card_info_value}>
                {resumo.emAndamento}
              </p>
            </div>
          </div>

          <div className={styles.card_done}>
            <TaskIcon style={{ color: "#25703B", fontSize: 80 }}/>
            <div className={styles.card_info}>
              <p className={styles.card_info_label}>Tarefas concluídas</p>
              <p className={styles.card_info_value}>
                {resumo.concluidas}
              </p>
            </div>
          </div>

        </div>

        <div className={styles.dashboard_card}>
          <GroupsIcon style={{ color: "#1F60B5", fontSize: 280 }}/>
          <div className={styles.dashboard_card_info}>
            <p className={styles.dashboard_card_label}>Minhas equipes</p>
            <p className={styles.dashboard_card_value}>
              {resumo.minhasEquipes}
            </p>
          </div>
        </div>

      </main>

    </div>
  )
}