import { NavLink } from 'react-router-dom';

export default function Menu() {
  return (
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
  )
}