import { useContext } from 'react';
import {AuthContext} from "../../context/AuthContext";
import '../../css/OrdemServico.css'
import CaixaMensagens from '../../components/ordemservico/caixa-menssagem';

export default function OrdemServico() {
    const {user} = useContext(AuthContext);
    const perfil = user?.perfil //Para gerenciar entre cliente e funcionario

    return(
        <div>
            <h1>Página da Ordem de Serviço</h1>
            { perfil === 'funcionario' &&
                <div>
                    ...
                </div>
            }

            { perfil === 'cliente' &&
                <div>
                    <CaixaMensagens osId={1} /> 
                    {/*Simulando ID da ordem de serviço*/}
                    {/*Isso nem vaificar aqui, é só para testar*/}
                </div>
            }
        </div>
    )
}