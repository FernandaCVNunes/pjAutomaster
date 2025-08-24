import { TableCliente } from "../components/historico/table-cliente"
import { TableFunc } from "../components/historico/table-funcionario"
import "../css/Historico.css"

export default function Historico () {
    let user = 'user'
    // 'user' | 'funcionario'


    return(
        <main>
            <h1>Histórico de Serviço</h1>

            <div>
            { user === 'funcionario' &&
                <TableFunc user={user}/>
            }

            { user === 'user' &&
                <TableCliente user={user} />
            }
            </div>

        </main>
    )
}