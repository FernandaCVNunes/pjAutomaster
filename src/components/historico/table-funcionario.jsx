import { useState } from "react"
import { ModalHistorico } from "./modal"

export const TableFunc = ({user}) => {
    // Simulação de dados do backend
    const [historico, setHistorico] = useState([
        {
            id: 1,
            data: "15/03/2025",
            cliente: "João Cleber",
            veiculo: { placa: "ABC1234", modelo: "Uno", marca: "Fiat" },
            servico: "Troca de óleo",
            status: "Concluído",
            diagnostico: "Óleo vencido",
            pecas: ["Óleo 5W30", "Filtro de óleo"],
            custo: "R$ 250,00"
        },
        {
            id: 2,
            data: "10/03/2025",
            cliente: "Maria Souza",
            veiculo: { placa: "XYZ9876", modelo: "Corolla", marca: "Toyota" },
            servico: "Troca de pneus",
            status: "Concluído",
            diagnostico: "Desgaste excessivo",
            pecas: ["4 Pneus Pirelli"],
            custo: "R$ 1.200,00"
        },
        {
            id: 3,
            data: "05/03/2025",
            cliente: "Pedro Lima",
            veiculo: { placa: "JKL4567", modelo: "HB20", marca: "Hyundai" },
            servico: "Alinhamento",
            status: "Concluído",
            diagnostico: "Desalinhamento das rodas",
            pecas: [],
            custo: "R$ 120,00"
        },
        {
            id: 4,
            data: "28/02/2025",
            cliente: "Lucas Martins",
            veiculo: { placa: "MNO7890", modelo: "Civic", marca: "Honda" },
            servico: "Troca de bateria",
            status: "Concluído",
            diagnostico: "Bateria descarregada",
            pecas: ["Bateria Moura 60Ah"],
            custo: "R$ 480,00"
        },
        {
            id: 5,
            data: "22/02/2025",
            cliente: "Juliana Alves",
            veiculo: { placa: "PQR1234", modelo: "Gol", marca: "Volkswagen" },
            servico: "Revisão geral",
            status: "Concluído",
            diagnostico: "Manutenção preventiva",
            pecas: ["Filtro de ar", "Filtro de combustível", "Óleo 5W30"],
            custo: "R$ 350,00"
        },
        {
            id: 6,
            data: "15/02/2025",
            cliente: "Rafael Torres",
            veiculo: { placa: "STU5678", modelo: "Onix", marca: "Chevrolet" },
            servico: "Troca de pastilhas de freio",
            status: "Concluído",
            diagnostico: "Pastilhas gastas",
            pecas: ["Pastilhas de freio dianteiras"],
            custo: "R$ 220,00"
        },
        {
            id: 7,
            data: "10/02/2025",
            cliente: "Patrícia Gomes",
            veiculo: { placa: "VWX9012", modelo: "Renegade", marca: "Jeep" },
            servico: "Troca de filtro de ar",
            status: "Concluído",
            diagnostico: "Filtro saturado",
            pecas: ["Filtro de ar"],
            custo: "R$ 90,00"
        },
        {
            id: 8,
            data: "05/02/2025",
            cliente: "Bruno Costa",
            veiculo: { placa: "YZA3456", modelo: "Sandero", marca: "Renault" },
            servico: "Troca de correia dentada",
            status: "Concluído",
            diagnostico: "Correia desgastada",
            pecas: ["Correia dentada", "Tensor"],
            custo: "R$ 600,00"
        }
    ])
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState(null)

    // Organiza por data decrescente
    const historicoOrdenado = [...historico].sort((a, b) => {
        const [da, ma, ya] = a.data.split("/").map(Number)
        const [db, mb, yb] = b.data.split("/").map(Number)
        return new Date(yb, mb - 1, db) - new Date(ya, ma - 1, da)
    })

    if (historico.length === 0) {
        return (
            <div className="table-func-empty">
                <h3>Nenhum serviço realizado ainda.</h3>
                <p>Assim que houver histórico, ele aparecerá aqui.</p>
            </div>
        )
    }

    return (
        <div className="table-func-container">
            <table className="table-func">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Cliente</th>
                        <th>Veículo</th>
                        <th>Serviço</th>
                        <th>Status</th>
                        <th className="blue">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {historicoOrdenado.map(item => (
                        <tr key={item.id}>
                            <td data-label="Data">{item.data}</td>
                            <td data-label="Cliente">{item.cliente}</td>
                            <td data-label="Veículo">{item.veiculo.marca}-{item.veiculo.modelo} {item.veiculo.placa}</td>
                            <td data-label="Serviço">{item.servico}</td>
                            <td className="status" data-label="Status">
                                <span className="status-bubble">{item.status}</span>
                            </td>
                            <td data-label="Ações">
                                <button
                                    className="btn-vermais"
                                    onClick={() => {
                                        setModalData(item)
                                        setModalOpen(true)
                                    }}
                                >
                                    Ver mais
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalOpen && modalData &&
                <ModalHistorico
                    data={modalData}
                    user={user}
                    onClose={() => setModalOpen(false)}
                />
            }
        </div>
    )
}