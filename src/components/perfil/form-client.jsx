import { useEffect, useState } from "react"

export const FormClient = ({disable, setDisable}) => {

    //Apenas exemplo
    const dadosBackend = {
        nome: "Fernando",
        email: "Fernando@gmail.com",
        senha: "Algo123",
        telefone: "55988765321",
        endereco: "Rua das flores 23 bairro vila alegre"
    }

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [telefone, setTelefone] = useState("")
    const [endereco, setEndereco] = useState("")

    useEffect(() => {
        if (disable) {
            // Preenche com dados do backend
            setNome(dadosBackend.nome)
            setEmail(dadosBackend.email)
            setSenha(dadosBackend.senha)
            setTelefone(dadosBackend.telefone)
            setEndereco(dadosBackend.endereco)
        } else {
            // Zera os campos para novo cadastro
            setNome("")
            setEmail("")
            setSenha("")
            setTelefone("")
            setEndereco("")
        }
    }, [disable])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = 1; // Exemplo: ID do usuário que você quer editar

        const payload = {
            nome,
            email,
            senha,
            telefone,
            endereco
        };

        try {
            const response = await fetch(`http://localhost:3001/editar/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Erro ao atualizar perfil:", data.error);
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
        <form onSubmit={handleSubmit} onReset={()=>{
            setDisable(true)
        }}>
            <label htmlFor="nome"> 
                Nome
                <input 
                    type="text" 
                    name="nome" 
                    id="nome" 
                    disabled={disable}
                    value={nome}
                    onChange={(e)=> setNome(e.target.value)}
                />
            </label>

            <label htmlFor="email">
                Email
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    disabled={disable}
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
            </label>

            <label htmlFor="senha">
                Senha
                <input 
                    type="password" 
                    name="senha" 
                    id="senha" 
                    disabled={disable}
                    value={senha}
                    onChange={(e)=> setSenha(e.target.value)}
                />
            </label>

            <label htmlFor="telefone">
                Telefone
                <input 
                    type="tel" 
                    name="telefone" 
                    id="telefone" 
                    disabled={disable}
                    value={telefone}
                    onChange={(e)=> setTelefone(e.target.value)}
                />
            </label>

            <label htmlFor="endereco">
                Endereço
                <input 
                    type="text" 
                    name="endereco" 
                    id="endereco" 
                    disabled={disable}
                    value={endereco}
                    onChange={(e)=> setEndereco(e.target.value)}
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