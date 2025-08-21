export const FormClient = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="nome">
                Nome
                <input type="text" name="nome" id="nome" />
            </label>

            <label htmlFor="email">
                Email
                <input type="email" name="email" id="email" />
            </label>

            <label htmlFor="telefone">
                Telefone
                <input type="tel" name="telefone" id="telefone" />
            </label>

            <label htmlFor="endereco">
                Endereço
                <input type="text" name="endereco" id="endereco" />
            </label>

            <div className="area-button">
                <button className="btn-cancel" type="reset">Cancelar</button>
                <button className="btn-safe" type="submit">Salvar</button>
            </div>
        </form>
    )
}