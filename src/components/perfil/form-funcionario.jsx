import { useEffect, useState } from "react"

export const FormFuncionario = ({disable, setDisable}) => {

    // Exemplo de dados do backend
    const dadosBackend = {
        nome: "Carlos",
        email: "carlos@automaster.com",
        senha: "Senha123",
        telefone: "55999887766",
        funcao: "Mecânico",
        agenda: "Segunda a sexta, 08h às 18h"
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

    const handleSubmit = (e) => {
        e.preventDefault()
        // lógica de envio
    }

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