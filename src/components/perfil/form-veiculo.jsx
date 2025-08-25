import { useEffect, useState } from "react"

export const FormVeiculo = ({disable, setDisable}) => {
    // Exemplo de dados do backend
    const dadosBackend = {
        placa: "ABC-1234",
        marca: "Toyota",
        modelo: "Corolla",
        ano: "2020-01-01",
        cor: "Prata"
    }

    const [placa, setPlaca] = useState("")
    const [marca, setMarca] = useState("")
    const [modelo, setModelo] = useState("")
    const [ano, setAno] = useState("")
    const [cor, setCor] = useState("")

    useEffect(() => {
        if (disable) {
            setPlaca(dadosBackend.placa)
            setMarca(dadosBackend.marca)
            setModelo(dadosBackend.modelo)
            setAno(dadosBackend.ano)
            setCor(dadosBackend.cor)
        } else {
            setPlaca("")
            setMarca("")
            setModelo("")
            setAno("")
            setCor("")
        }
    }, [disable])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const veiculo_id = 1;
        const clientId = 1; // Simulando o ID do cliente
        const payload = {
            placa,
            marca,
            modelo,
            ano,
            cor,
            client_id: clientId
        };

        try {
            // Requisição PUT para atualizar o veículo
            const response = await fetch(`http://localhost:3001/veiculos/${veiculo_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Erro ao atualizar veículo:", data.error);
                alert(`Erro: ${data.error}`);
                return;
            }

            alert(data.message);
            setDisable(true); // bloqueia o formulário de novo
        } catch (err) {
            console.error(err);
            alert("Erro de rede ou servidor");
        }
    };


    return(
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

            {disable === false &&
                <div className="area-button">
                    <button className="btn-cancel" type="reset">Cancelar</button>
                    <button className="btn-safe" type="submit">Salvar</button>
                </div>
            }
        </form>
    )
}