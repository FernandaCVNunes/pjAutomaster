export const FormVeiculo = () => {
    
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="placa">
                Placa
                <input type="text" name="placa" id="placa" />
            </label>

            <label htmlFor="marca">
                Marca
                <input type="text" name="marca" id="marca" />
            </label>

            <label htmlFor="modelo">
                Modelo
                <input type="text" name="modelo" id="modelo" />
            </label>

            <label htmlFor="ano">
                Ano
                <input type="date" name="ano" id="ano" />
            </label>

            <label htmlFor="cor">
                Cor
                <input type="text" name="cor" id="cor" />
            </label>

            <div className="area-button">
                <button className="btn-cancel" type="reset">Cancelar</button>
                <button className="btn-safe" type="submit">Salvar</button>
            </div>
        </form>
    )
}