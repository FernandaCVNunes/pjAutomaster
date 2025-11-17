import "../../css/Agenda.css"
import { FormAgenda } from "../../components/agenda/form-agenda"
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext"

export default function Agenda () {
    const {user} = useContext(AuthContext);

    const perfil = user?.perfil //Para gerenciar entre cliente e funcionario


    return(
        <main>
            <div>
            { perfil === 'funcionario' &&
                <div></div>
            }

            { perfil === 'cliente' &&
                <div>
                    <h1>Agendamento de Serviço</h1>
                    <FormAgenda />
                </div>
            }
            </div>
        </main>
    )
}