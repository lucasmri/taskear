import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './styles/Menu.module.css';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HistoryIcon from '@mui/icons-material/History';

export default function Menu() {
  const navigate = useNavigate();
  const [usuario] = useState(() => {
    const usuarioSalvo = localStorage.getItem('usuario');

    if (!usuarioSalvo) {
      return null;
    }

    try {
      return JSON.parse(usuarioSalvo);
    } catch {
      return null;
    }
  });

  function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/');
  }

  return (
    <aside className={styles.aside}>
      <div className={styles.aside_user}>
        <AccountCircleIcon style={{ color: '#F5F7FA', fontSize: 58 }} />

        <div className={styles.aside_user_info}>
          <p className={styles.greeting}>Olá!</p>
          <p className={styles.name}>
            {usuario?.nome || 'Usuário'}
          </p>
        </div>
      </div>

      <hr className={styles.aside_hr} />

      <nav className={styles.aside_nav}>
        <ul>
          <li>
            <NavLink to="/Home">
              <HomeIcon style={{ color: '#F5F7FA', fontSize: 32 }} />
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/Equipes">
              <GroupsIcon style={{ color: '#F5F7FA', fontSize: 32 }} />
              Equipes
            </NavLink>
          </li>

          <li>
            <NavLink to="/Historico">
              <HistoryIcon style={{ color: '#F5F7FA', fontSize: 32 }} />
              Histórico
            </NavLink>
          </li>

          <li>
            <NavLink to="/Perfil">
              <ManageAccountsIcon style={{ color: '#F5F7FA', fontSize: 32 }} />
              Meu Perfil
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.aside_logo}>
        <img
          src="https://i.imgur.com/qR6w9dw_d.webp?maxwidth=760&fidelity=grand"
          alt="Logo - Taskear"
          className="logo-taskear"
        />
      </div>

      <div className={styles.aside_logout}>
        <button type="button" onClick={sair}>
          <LogoutIcon style={{ color: 'white', fontSize: 25 }} />
          Sair
        </button>
      </div>
    </aside>
  );
}
