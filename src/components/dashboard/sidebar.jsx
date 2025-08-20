import { NavLink } from "react-router-dom";
import { MdDashboard, MdEvent, MdAssignment, MdPerson, MdHistory } from "react-icons/md";
import "../../css/Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
            <MdDashboard /> Painel de Controle
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
            <MdEvent /> Agenda
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
            <MdAssignment /> Ordens de Serviço
          </NavLink>
        </li>
        <li>
          <NavLink to="/perfil" className={({ isActive }) => isActive ? "active" : ""}>
            <MdPerson /> Meu Perfil
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
            <MdHistory /> Histórico de Serviços
          </NavLink>
        </li>
      </ul>
    </div>
  )
}