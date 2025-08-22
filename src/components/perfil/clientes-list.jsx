import { useState, useEffect } from "react"
import { ClienteItem } from "./cliente-item"

export const ClientesList = () => {
    // Simulação de dados do backend
    const [clientes, setClientes] = useState([])

    useEffect(() => {
        // Simulando requisição ao backend
        setTimeout(() => {
            setClientes([
                {
                    id: 1,
                    nome: "Fernando Silva",
                    email: "fernando@gmail.com",
                    telefone: "55988765321",
                    endereco: "Rua das Flores, 23"
                },
                {
                    id: 2,
                    nome: "Ana Souza",
                    email: "ana.souza@gmail.com",
                    telefone: "55999887766",
                    endereco: "Av. Brasil, 100"
                },
                {
                    id: 3,
                    nome: "Carlos Pereira",
                    email: "carlos.pereira@gmail.com",
                    telefone: "55991234567",
                    endereco: "Rua Central, 45"
                }
            ])
        }, 800)
    }, [])

    if (clientes.length === 0) {
        return (
            <div className="func-list-no-client">
                <h3>Nenhum cliente cadastrado ainda.</h3>
                <p>Assim que houver clientes, eles aparecerão aqui.</p>
            </div>
        )
    }

    return (
        <div className="func-list">
            <h3>Lista de Clientes</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <ClienteItem key={cliente.id} cliente={cliente} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}