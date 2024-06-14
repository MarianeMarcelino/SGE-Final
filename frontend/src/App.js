
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './COMPONENTES/LOGIN/Login';
import ComponenteMenu from "./COMPONENTES/MENU/ComponenteMenu";
import ComponenteTabela from './COMPONENTES/FELIPE/ComponenteTabela';
import DadosDisciplina from './COMPONENTES/FELIPE/DadosDisciplina';
import DadosAgenda from './COMPONENTES/FELIPE/DadosAgenda';
import DadosTurma from './COMPONENTES/FELIPE/DadosTurma';
import DadosMatricula from './COMPONENTES/FELIPE/DadosMatricula';
import CadastroResponsavel from "./COMPONENTES/MARIANE/CadastroResponsavel";
import FormFuncionario from './COMPONENTES/MARIO/CadastroFuncionario';
import EnviarRecados from './COMPONENTES/MARIO/EnviarRecados';
import DadosRemanejar from './COMPONENTES/FELIPE/DadosRemanejar';
import DadosAgendamento from './COMPONENTES/FELIPE/DadosAgendamento';
import Nota from "./COMPONENTES/MARIANE/Nota";



function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isMenuExpanded, setMenuExpanded] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here
    setLoggedIn(true);
  };

  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <Login path='/cadastro' onLogin={handleLogin} />
      ) : (
 <>
          <ComponenteMenu path='/cadastros' isMenuExpanded={isMenuExpanded} setMenuExpanded={setMenuExpanded} />

          <Routes>
            <Route path='/cadastroAlunos' element={<ComponenteTabela isMenuExpanded={isMenuExpanded} />} />
            <Route path="/cadastroDisciplina" element={<DadosDisciplina isMenuExpanded={isMenuExpanded} />} />
            <Route path="/cadastroAgenda" element={<DadosAgenda isMenuExpanded={isMenuExpanded} />} />
            <Route path="/cadastroTurma" element={<DadosTurma isMenuExpanded={isMenuExpanded} />} />
            <Route path="/matriculas" element={<DadosMatricula isMenuExpanded={isMenuExpanded} />} />
            <Route path="/cadastroResponsavel" element={<CadastroResponsavel isMenuExpanded={isMenuExpanded} />} />
            <Route path="/nota" element={<Nota isMenuExpanded={isMenuExpanded} />}/>
            <Route path="/cadastroFuncionarios" element={<FormFuncionario isMenuExpanded={isMenuExpanded} />} />
            <Route path="/recados" element={<EnviarRecados isMenuExpanded={isMenuExpanded} />} />
            <Route path="/remanejar" element={<DadosRemanejar isMenuExpanded={isMenuExpanded} />} />
            <Route path="/agendamentos" element={<DadosAgendamento isMenuExpanded={isMenuExpanded} />} />
          </Routes>
        </>
      )}
    </BrowserRouter>  
  );
}

export default App;
