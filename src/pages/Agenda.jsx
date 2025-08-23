import { useState } from "react"
import { Calendario } from "../components/agenda/calendario"
import "../css/Agenda.css"
import { FormAgenda } from "../components/agenda/form-agenda"

export default function Agenda () {
    let user = 'user'
    // 'user' | 'funcionario'


    return(
        <main>
            <div>
            { user === 'funcionario' &&
                <div></div>
            }

            { user === 'user' &&
                <div>
                    <h1>Agendamento de Serviço</h1>
                    <FormAgenda />
                </div>
            }
            </div>
        </main>
    )
}