import { useEffect, useState } from "react";

import Menu from "../components/Menu.jsx";
import { apiFetch } from "../services/api";
import styles from "./styles/Historico.module.css";

import HistoryIcon from "@mui/icons-material/History";
import GroupsIcon from "@mui/icons-material/Groups";

function formatarData(valor) {
  return new Date(valor).toLocaleDateString("pt-BR");
}

export default function Historico() {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    carregarHistorico();
  }, []);

  async function carregarHistorico() {
    const respostaTarefas = await apiFetch("/tarefa");
    const tarefas = await respostaTarefas.json();

    const tarefasConfirmadas = tarefas
      .filter((tarefa) => tarefa.confirmacao)
      .sort((a, b) => {
        const dataA = new Date(a.dataConclusao || a.dataConfirmacao);
        const dataB = new Date(b.dataConclusao || b.dataConfirmacao);
        return dataB - dataA;
      });

    setHistorico(tarefasConfirmadas);
  }

  return (
    <div className={styles.historico_page}>
      <Menu />

      <main className={styles.historico_section}>
        <section className={styles.container}>
          <div className={styles.page_header}>
            <div>
              <span className={styles.eyebrow}>Linha do tempo</span>

              <div className={styles.title}>
                <HistoryIcon />
                <h1>Histórico de atividades</h1>
              </div>

              <p className={styles.subtitle}>
                Tarefas finalizadas em todas as equipes das quais você faz parte.
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <ul className={styles.list}>
              {historico.map((tarefa) => (
                <li key={tarefa.tarefaId} className={styles.item}>
                  <div className={styles.item_top}>
                    <div className={styles.item_main}>
                      <span className={styles.team_tag}>
                        <GroupsIcon />
                        {tarefa.equipeUsuario?.equipe?.nome || "Equipe"}
                      </span>

                      <h3>{tarefa.titulo}</h3>
                      <p>{tarefa.descricao}</p>
                    </div>

                    <div className={styles.item_dates}>
                      <div className={styles.date_block}>
                        <span>Data de criação</span>
                        <strong>{formatarData(tarefa.dataCriacao)}</strong>
                      </div>

                      <div className={styles.date_block}>
                        <span>Data de conclusão</span>
                        <strong>{formatarData(tarefa.dataConclusao)}</strong>
                      </div>
                    </div>
                  </div>

                  <div className={styles.item_footer}>
                    <span>
                      Criado por{" "}
                      <strong>
                        {tarefa.equipeUsuario?.usuario?.nome || "Usuário"}
                      </strong>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
