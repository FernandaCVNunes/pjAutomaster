import { Link } from "react-router-dom";
import "../../css/Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>🏠 <Link to="/dashboard">Painel de Controle</Link> </li>
        <li>📅 <Link to='/'>Agenda</Link></li>
        <li>📝 <Link to='/'>Ordens de Serviço</Link></li>
        <li>👤 <Link to='/perfil'>Meu Perfil</Link></li>
        <li>📜 <Link to='/'>Histórico de Serviços</Link></li>
      </ul>
    </div>
  )
}
