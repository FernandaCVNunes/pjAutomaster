import { useState } from "react"
import { Calendario } from "./calendario"

export const FormAgenda = () => {
    // Simulação dos dados do backend
    const [veiculos, setVeiculos] = useState([
        { id: 1, nome: "Honda Civic - XYZ-9A87" },
        { id: 2, nome: "Fiat Uno - ABC-1234" }
    ])
    const [horarios, setHorarios] = useState([
        "08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"
    ])

    const [selectedDate, setSelectedDate] = useState()
    const [selectedVeiculo, setSelectedVeiculo] = useState("")
    const [selectedServico, setSelectedServico] = useState("")
    const [selectedHorario, setSelectedHorario] = useState("")

    const [dadosAgendamento, setDadosAgendamento] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedDate || !selectedVeiculo || !selectedServico || !selectedHorario) {
            alert("Preencha todos os campos!")
            return
        }

        const data = selectedDate.toISOString().split("T")[0] // pega formato YYYY-MM-DD
        const novoAgendamento = {
            data,
            horario: selectedHorario,
            servico: selectedServico,
            veiculo_id: selectedVeiculo
        }

        try {
            const response = await fetch("http://localhost:3001/agenda/agendar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novoAgendamento)
            })

            const result = await response.json()

            if (!response.ok) {
                alert(result.error || "Erro ao agendar")
                return
            }

            alert("Agendamento realizado com sucesso!")

            // Atualiza lista local
            setDadosAgendamento([...dadosAgendamento, result.agendamento])

            // Limpa os campos
            setSelectedVeiculo("")
            setSelectedServico("")
            setSelectedHorario("")
            setSelectedDate(undefined)

        } catch (error) {
            console.error("Erro:", error)
            alert("Erro ao conectar com o servidor")
        }
    }

    return (
        <form className="form-agenda" onSubmit={handleSubmit}>
            <select
                required
                value={selectedVeiculo}
                onChange={e => setSelectedVeiculo(e.target.value)}
            >
                <option value="">Selecione um veículo</option>
                {veiculos.length === 0 ? (
                    <option value="" disabled>Nenhum veículo cadastrado</option>
                ) : (
                    veiculos.map(v => (
                        <option key={v.id} value={v.id}>{v.nome}</option>
                    ))
                )}
            </select>

            <select
                required
                value={selectedServico}
                onChange={e => setSelectedServico(e.target.value)}
            >
                <option value="">Selecione um serviço</option>
                <option value="revisao">Revisão Periódica</option>
                <option value="oleo">Troca de Óleo e Filtros</option>
                <option value="freios">Troca de Pastilhas de Freio</option>
                <option value="alinhamento">Alinhamento e Balanceamento</option>
                <option value="suspensao">Revisão de Suspensão</option>
                <option value="motor">Regulagem de Motor</option>
                <option value="eletrica">Verificação do Sistema Elétrico</option>
                <option value="ar-condicionado">Higienização do Ar Condicionado</option>
                <option value="cambio">Troca de Óleo do Câmbio</option>
                <option value="pneus">Troca de Pneus</option>
                <option value="inspecao">Check-up Completo</option>
                <option value="socorro">Socorro Mecânico</option>
                <option value="outros">Outros Serviços</option>
            </select>

            <Calendario selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

            <select
                required
                value={selectedHorario}
                onChange={e => setSelectedHorario(e.target.value)}
            >
                <option value="">Selecione o horário</option>
                {horarios.length === 0 ? (
                    <option value="" disabled>Nenhum horário disponível</option>
                ) : (
                    horarios.map(h => (
                        <option key={h} value={h}>{h}</option>
                    ))
                )}
            </select>

            <button className="btn-enviar" type="submit">Confirmar Agendamento</button>
        </form>
    )
}