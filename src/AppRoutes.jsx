import { Route, Routes } from "react-router-dom";
import App from "./App"
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";

export default function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<App />}>
                {/*Rotas para as paginas da home, como a de login*/}
            </Route>

            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard/>}/>
                {/*Rotas para as paginas do deshboard*/}
            </Route>
        </Routes>
    )
}