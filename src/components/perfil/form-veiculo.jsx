import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const FormVeiculo = ({ disable, setDisable }) => {
    const { user } = useContext(AuthContext);
    const clientId = user?.id;

    const [veiculos, setVeiculos] = useState([]);
    const [selectedVeiculo, setSelectedVeiculo] = useState(null);
    const [loading, setLoading] = useState(true);

    // Campos do formulário
    const [placa, setPlaca] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [ano, setAno] = useState("");
    const [cor, setCor] = useState("");

    // Buscar veículos do cliente
    useEffect(() => {
        const fetchVeiculos = async () => {
            if (!clientId) return;

            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3001/veiculos/cliente/${clientId}`);
                const data = await response.json();
                if (!response.ok) {
                    console.error("Erro ao buscar veículos:", data.error);
                    return;
                }
                setVeiculos(data);
                if (data.length === 0) {
                    // Nenhum veículo, libera formulário direto
                    setSelectedVeiculo(null);
                    setDisable(false);
                }
            } catch (err) {
                console.error("Erro de rede:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchVeiculos();
    }, [clientId]);

    // Preenche campos ao selecionar veículo
    useEffect(() => {
        if (selectedVeiculo) {
            setPlaca(selectedVeiculo.placa);
            setMarca(selectedVeiculo.marca);
            setModelo(selectedVeiculo.modelo);
            setAno(selectedVeiculo.ano);
            setCor(selectedVeiculo.cor);
            setDisable(true);
        } else {
            setPlaca("");
            setMarca("");
            setModelo("");
            setAno("");
            setCor("");
        }
    }, [selectedVeiculo, setDisable]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { placa, marca, modelo, ano, cor, client_id: clientId };

        try {
            if (selectedVeiculo) {
                // Atualiza veículo existente
                const response = await fetch(`http://localhost:3001/veiculos/${selectedVeiculo.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const data = await response.json();
                if (!response.ok) return alert(`Erro: ${data.error}`);
                alert(data.message);

                // Atualiza o array de veículos local
                setVeiculos(prev =>
                    prev.map(v => (v.id === selectedVeiculo.id ? { ...v, ...payload } : v))
                );
            } else {
                // Cria novo veículo
                const response = await fetch(`http://localhost:3001/veiculos`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const data = await response.json();
                if (!response.ok) return alert(`Erro: ${data.error}`);
                alert(data.message);

                const novoVeiculo = { ...payload, id: data.id };
                setVeiculos(prev => [...prev, novoVeiculo]);
                setSelectedVeiculo(novoVeiculo);
            }
            setDisable(true);
        } catch (err) {
            console.error(err);
            alert("Erro de rede ou servidor");
        }
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Carregando veículos...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Botão para criar novo veículo mesmo se houver veículos */}
            {veiculos.length > 0 && (
                <button
                    className="btn-safe"
                    onClick={() => {
                        setSelectedVeiculo(null);
                        setDisable(false);
                    }}
                    style={{ marginBottom: "10px" }}
                >
                    Cadastrar novo veículo
                </button>
            )}

            {/* Lista de veículos */}
            {veiculos.length > 0 && (
                <div className="veiculo-list">
                    {veiculos.map(v => (
                        <button
                            key={v.id}
                            className={`veiculo-item ${selectedVeiculo?.id === v.id ? "active" : ""}`}
                            onClick={() => setSelectedVeiculo(v)}
                        >
                            {v.placa} - {v.marca} {v.modelo}
                        </button>
                    ))}
                </div>
            )}

            {/* Mensagem caso não haja veículos */}
            {veiculos.length === 0 && (
                <p>Nenhum veículo cadastrado. Use o formulário abaixo para cadastrar o primeiro veículo.</p>
            )}

            {/* Formulário de veículo */}
            <form onSubmit={handleSubmit} onReset={() => setDisable(true)}>
                <label htmlFor="placa">
                    Placa
                    <input
                        type="text"
                        name="placa"
                        id="placa"
                        disabled={disable}
                        value={placa}
                        onChange={e => setPlaca(e.target.value)}
                    />
                </label>

                <label htmlFor="marca">
                    Marca
                    <input
                        type="text"
                        name="marca"
                        id="marca"
                        disabled={disable}
                        value={marca}
                        onChange={e => setMarca(e.target.value)}
                    />
                </label>

                <label htmlFor="modelo">
                    Modelo
                    <input
                        type="text"
                        name="modelo"
                        id="modelo"
                        disabled={disable}
                        value={modelo}
                        onChange={e => setModelo(e.target.value)}
                    />
                </label>

                <label htmlFor="ano">
                    Ano
                    <input
                        type="date"
                        name="ano"
                        id="ano"
                        disabled={disable}
                        value={ano}
                        onChange={e => setAno(e.target.value)}
                    />
                </label>

                <label htmlFor="cor">
                    Cor
                    <input
                        type="text"
                        name="cor"
                        id="cor"
                        disabled={disable}
                        value={cor}
                        onChange={e => setCor(e.target.value)}
                    />
                </label>

                {!disable && (
                    <div className="area-button">
                        {veiculos.length > 0 &&
                            <button className="btn-cancel" type="reset">Cancelar</button>
                        }
                        <button className="btn-safe" type="submit">
                            {selectedVeiculo ? "Salvar" : "Cadastrar"}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};