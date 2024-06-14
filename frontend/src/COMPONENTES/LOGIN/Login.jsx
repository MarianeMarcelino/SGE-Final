// import './Login.css';
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

// const LoginPage = () => {
  
//   const navigate = useNavigate();
//   const handleLogin = () => {
//     let usuario = document.getElementById('usuario').value;
//     let senha = document.getElementById('senha').value;
//     if(usuario === 'felipe' && senha === '123'){
//       navigate('/cadastro');
//     }else{
//       alert('Falha no login')
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form>
//         <div className="row">
//           <div className="col-12">
//             <div className="form-group borda-form ">
//               <label htmlFor="usuario">
//                 <i class="bi bi-person-fill"></i> Usuário:
//               </label>
//               <input
//                 type="text"
//                 id="usuario"
//                 name="usuario"
//                 className="form-control form-control-sm"
//                 placeholder='Digite o usuário'
//                 required
//               />
//               <div class="invalid-feedback">
//                 Informe o Usuário
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-12">
//             <div className="form-group borda-form ">
//               <label htmlFor="senha">
//                 <i className="bi bi-file-lock2"></i> Senha:
//               </label>
//               <input
//                 type="password"
//                 id="senha"
//                 name="senha"
//                 className="form-control form-control-sm"
//                 placeholder='Digite a senha'
//                 required
//               />
//             </div>
//           </div>
//         </div>
//         <div id='mensagem'>
                  
//         </div>
//         <button type="button" onClick={handleLogin}>
//           Entrar
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({onLogin}) {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    let usuario = document.getElementById('usuario').value;
    let senha = document.getElementById('senha').value;

    if (usuario === 'felipe' && senha === '123') {
      // Successful login, navigate to the desired route
      setErrorMessage('');
      navigate('/cadastro');
      onLogin()
    } else {
      // Display error message for unsuccessful login
      setErrorMessage('Usuário ou senha inválidos.');
    }
  };

  return (
    <div id='login'>
      <h2 id='titulo'>Login</h2>
      <form>
        <div className="row">
          <div className="col-12">
            <div >
              <label id='label' htmlFor="usuario">
                <i class="bi bi-person-fill"></i> Usuário:
              </label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                className="form-control"
                placeholder='Digite o usuário'
                required
              />
              <div class="invalid-feedback">
                Informe o Usuário
              </div>
            </div>
          </div>
        </div>
        <div >
          <div >
            <div >
              <label id='label' htmlFor="senha">
                <i className="bi bi-file-lock2"></i> Senha:
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                className="form-control"
                placeholder='Digite a senha'
                required
              />
            </div>
          </div>
        </div>
        <div id='mensagem'>
                  
        </div>
        <button type="button" id='botao' onClick={handleLogin}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;


