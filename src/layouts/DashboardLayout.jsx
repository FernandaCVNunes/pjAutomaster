import { Link, Outlet } from 'react-router-dom';
import '../css/dashboard.css'

export default function DashboardLayout () {
    return (
        <div className="dashboard-container">
        <aside className="sidebar">
            <h2>📊 Dashboard</h2>
            <nav>
            <Link to="/dashboard">Início</Link> 
            {/*Aqui colocaremos os menus*/}
            </nav>
        </aside>

        <main className="dashboard-content">
            <Outlet />
        </main>
        </div>
  );
}