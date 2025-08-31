import { NavLink } from "react-router-dom";
import { MdDashboard, MdEvent, MdAssignment, MdPerson, MdHistory, MdPeople } from "react-icons/md";
import "../../css/Sidebar.css";

export default function Sidebar() {
  let user = 'user'
   /* 'funcionario'  'user' */

  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
            <MdDashboard /> Painel de Controle
          </NavLink>
        </li>
        <li>
          <NavLink to="/agenda" className={({ isActive }) => isActive ? "active" : ""}>
            <MdEvent /> Agenda
          </NavLink>
        </li>
        <li>
          <NavLink to="/servico" className={({ isActive }) => isActive ? "active" : ""}>
            <MdAssignment /> Ordens de Serviço
          </NavLink>
        </li>
        { user === 'user' &&
        <li>
          <NavLink to="/perfil" className={({ isActive }) => isActive ? "active" : ""}>
            <MdPerson /> Meu Perfil
          </NavLink>
        </li>
        }
        { user === 'funcionario' &&
          <li>
            <NavLink to="/perfil" className={({ isActive }) => isActive ? "active" : ""}>
              <MdPeople/> Clientes
            </NavLink>
          </li>
        }
        <li>
          <NavLink to="/history" className={({ isActive }) => isActive ? "active" : ""}>
            <MdHistory /> Histórico de Serviços
          </NavLink>
        </li>
      </ul>
    </div>
  )
}