import { Route, Routes } from "react-router-dom";
import App from "./App"
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import MeuPerfil from "./pages/MeuPerfil";
import Historico from "./pages/Historico";
import Agenda from "./pages/Agenda";

export default function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<App />}>
                {/*Rotas para as paginas da home, como a de login*/}
            </Route>

            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/perfil" element={<MeuPerfil/>}/>
                <Route path="/history" element={<Historico/>}/>
                <Route path="/agenda" element={<Agenda/>}/>
                {/*Rotas para as paginas do deshboard*/}
            </Route>
        </Routes>
    )
}