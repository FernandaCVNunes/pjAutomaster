import { useState } from "react";
import "../css/ProfilePage.css";
import { FormClient } from "../components/perfil/form-client";
import { FormVeiculo } from "../components/perfil/form-veiculo";

export default function MeuPerfil() {
  const [page, setPage] = useState(1)

{/*
  Para a tela de edição do funcionário

  1. Campos herdados da classe Usuário (comuns a clientes e funcionários):
    Nome

    E-mail

    Senha (com opção de alteração)

    Telefone

    2. Campos específicos do funcionário (baseado no Diagrama de Classes):

    Função/Cargo (ex.: Mecânico, Recepcionista, Gerente)

    Agenda  
*/}


  return (
    <div>
        <main>
          <h1>Meu Perfil</h1>
          <div>
            <div className="perfil-menu">
              <h4 onClick={()=>setPage(1)}>Perfil</h4>
              <h4 onClick={()=>setPage(2)}>Veículos</h4>
            </div>

            {page === 1 &&
              <div className="perfil-main">
                <div>
                  <h3>Dados Cadastrais</h3>
                </div>
                <div>
                  <FormClient />
                </div>
              </div>
            }

            {page === 2 &&
              <div className="perfil-main">
                <div>
                  <h3>Dados Cadastrais</h3>
                </div>
                <div>
                  <FormVeiculo />
                </div>
              </div>
            }

          </div>
        </main>
    </div>
  );
}