import { useState } from "react"
import { ModalHistorico } from "./modal"
import "../../css/Historico.css"

export const TableCliente = ({user}) => {
    // Simulação de dados do backend
    const [historico, setHistorico] = useState([
        {
            id: 1,
            data: "20/03/2025",
            veiculo: { placa: "XYZ-9A87", modelo: "Civic", marca: "Honda" },
            servico: "Alinhamento e Balanceamento",
            status: "Concluído",
            custo: "R$ 180,00",
            diagnostico: "Desalinhamento leve",
            pecas: [],
        },
        {
            id: 2,
            data: "10/03/2025",
            veiculo: { placa: "ABC-1234", modelo: "Uno", marca: "Fiat" },
            servico: "Troca de óleo",
            status: "Concluído",
            custo: "R$ 250,00",
            diagnostico: "Óleo vencido",
            pecas: ["Óleo 5W30", "Filtro de óleo"],
        },
        {
            id: 3,
            data: "01/03/2025",
            veiculo: { placa: "JKL-4567", modelo: "HB20", marca: "Hyundai" },
            servico: "Revisão geral",
            status: "Concluído",
            custo: "R$ 350,00",
            diagnostico: "Manutenção preventiva",
            pecas: ["Filtro de ar", "Filtro de combustível", "Óleo 5W30"],
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
                        <th>Veículo</th>
                        <th>Serviço</th>
                        <th>Preço</th>
                        <th>Status</th>
                        <th className="blue">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {historicoOrdenado.map(item => (
                        <tr key={item.id}>
                            <td data-label="Veículo">
                                <span className="blue">
                                    {item.veiculo.marca} {item.veiculo.modelo} - {item.veiculo.placa}
                                </span>
                            </td>
                            <td data-label="Data">
                                <span role="img" aria-label="data">{item.data}</span>
                            </td>
                            <td data-label="Serviço">
                                <span role="img" aria-label="serviço">{item.servico}</span>
                            </td>
                            <td data-label="Custo">
                                <span role="img" aria-label="custo">{item.custo}</span>
                            </td>
                            <td className="status" data-label="Status">
                                <span className="status-bubble">
                                    <span role="img" aria-label="status"> {item.status} </span>
                                </span>
                            </td>
                            <td data-label="Ações">
                                <button
                                    className="btn-vermais"
                                    onClick={() => {
                                        setModalData(item)
                                        setModalOpen(true)
                                    }}
                                >
                                    Ver Detalhes
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