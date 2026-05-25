import Menu from '../components/Menu.jsx';
import styles from "./styles/Equipes.module.css";
import GroupsIcon from '@mui/icons-material/Groups';

export default function Equipes() {
  return (
    <div className={styles.equipes_page}>

      <Menu />

      <main className={styles.teams_section}>

        <div className={styles.container}>

          <div className={styles.topbar}>

            <div className={styles.title}>
              <GroupsIcon style={{ color: "#ffffff", fontSize: 36 }} />
              <p>Minhas Equipes</p>
            </div>
            
            <button className={styles.btn_create}><span className={styles.btn_deco}>+</span> Criar uma equipe</button>

          </div>

          <div className={styles.table_header}>
            <p></p>
            <p>Nome</p>
            <p>N° de Pendências</p>
            <p>N° de Membros</p>
            <p>Ações</p>
          </div>

          <div className={styles.table_row}>

            <button className={styles.table_row_options}>...</button>

            <p className={styles.table_row_team_name}>Equipe A</p>

            <div className={styles.table_row_info}>
              <p className={styles.table_row_info_value}>14</p>
              <p className={styles.table_row_info_label}>Pendências</p>
            </div>

            <div className={styles.table_row_info}>
              <p className={styles.table_row_info_value}>11</p>
              <p className={styles.table_row_info_label}>Membros</p>
            </div>

            <div className={styles.table_row_actions}>
              <button className={`${styles.actions_btn} ${styles.actions_btn_acess}`}>Acessar</button>
              <button className={`${styles.actions_btn} ${styles.actions_btn_edit}`}>Editar</button>
              <button className={`${styles.actions_btn} ${styles.actions_btn_delete}`}>Deletar</button>
            </div>

          </div>
          

          <div className={styles.table_footer}></div>

        </div>

      </main>

    </div>
  );
}