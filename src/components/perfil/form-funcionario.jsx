import { useEffect, useState } from "react"

export const FormFuncionario = ({disable, setDisable}) => {

    // Exemplo de dados do backend
    const dadosBackend = {
        nome: "Carlos",
        email: "carlos@automaster.com",
        senha: "Senha123",
        telefone: "55999887766",
        funcao: "Mecânico",
    }

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [telefone, setTelefone] = useState("")
    const [funcao, setFuncao] = useState("")

    useEffect(() => {
        if (disable) {
            setNome(dadosBackend.nome)
            setEmail(dadosBackend.email)
            setSenha(dadosBackend.senha)
            setTelefone(dadosBackend.telefone)
            setFuncao(dadosBackend.funcao)
        } else {
            setNome("")
            setEmail("")
            setSenha("")
            setTelefone("")
            setFuncao("")
        }
    }, [disable])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = 2; // exemplo: ID do funcionário que você quer editar

        const payload = {
            nome,
            email,
            senha,
            telefone,
            perfil: 'funcionario', // sempre enviar "funcionario"
            funcao
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
            setDisable(true); // bloqueia o formulário novamente
        } catch (err) {
            console.error(err);
            alert("Erro de rede ou servidor");
        }
    };

    return(
        <form onSubmit={handleSubmit} onReset={() => setDisable(true)}>
            <label htmlFor="nome">
                Nome
                <input 
                    type="text" 
                    name="nome" 
                    id="nome" 
                    disabled={disable}
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
            </label>

            <label htmlFor="email">
                E-mail
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    disabled={disable}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                    onChange={e => setSenha(e.target.value)}
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
                    onChange={e => setTelefone(e.target.value)}
                />
            </label>

            <label htmlFor="funcao">
                Função/Cargo
                <input 
                    type="text" 
                    name="funcao" 
                    id="funcao" 
                    disabled={disable}
                    value={funcao}
                    onChange={e => setFuncao(e.target.value)}
                />
            </label>

            <div>
                Campo para a AGENDA
            </div>

            {disable === false &&
                <div className="area-button">
                    <button className="btn-cancel" type="reset">Cancelar</button>
                    <button className="btn-safe" type="submit">Salvar</button>
                </div>
            }
        </form>
    )
}