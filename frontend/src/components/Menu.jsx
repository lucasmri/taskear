import { NavLink } from 'react-router-dom';
import { Link } from"react-router-dom";
import styles from './styles/Menu.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function Menu() {
  return (
    <aside className={styles.aside}>

      <div className={styles.aside_user}>

        <AccountCircleIcon style={{ color: "#F5F7FA", fontSize: 58 }}/>

        <div className={styles.aside_user_info}>
          <p className={styles.greeting}>Olá!</p>
          <p className={styles.name}>Lucas Messias</p>
        </div>

      </div>

        <hr className={styles.aside_hr} />

      <nav className={styles.aside_nav}>

        <ul>
          <li>
            <NavLink to="/Home">
            <HomeIcon style={{ color: "#F5F7FA", fontSize: 32 }}/>
            Home</NavLink>
          </li>
          <li>
            <NavLink to="/Home">
            <GroupsIcon style={{ color: "#F5F7FA", fontSize: 32 }}/>
            Equipes</NavLink>
          </li>
          <li>
            <NavLink to="/Home">
            <AssignmentIcon style={{ color: "#F5F7FA", fontSize: 32 }}/>
            Relatórios</NavLink>
          </li>
          <li>
            <NavLink to="/Home">
            <NotificationsIcon style={{ color: "#F5F7FA", fontSize: 32 }}/>
            Notificações</NavLink>
          </li>
          <li>
            <NavLink to="/Home">
            <ManageAccountsIcon style={{ color: "#F5F7FA", fontSize: 32 }}/>
            Meu Perfil</NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.aside_logo}>
        <img src="https://i.imgur.com/qR6w9dw_d.webp?maxwidth=760&fidelity=grand" alt="Logo - Taskear" className="logo-taskear" />
      </div>

      <div className={styles.aside_logout}>
        <Link to="/Home">
        <LogoutIcon style={{ color: "white", fontSize: 25 }}/>
        Sair</Link>
      </div>

    </aside>
  )
}