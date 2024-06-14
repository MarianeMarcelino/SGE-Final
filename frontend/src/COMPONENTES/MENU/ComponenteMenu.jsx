import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './ComponenteMenu.css';
import sgeImage from './sge.png';

function ComponenteMenu({ isMenuExpanded, setMenuExpanded }) {
  const [itemSelecionado, setItemSelecionado] = useState("/cadastro");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Cadastros", path: "/cadastro", iconClass: "bi bi-card-list" },
    { name: "Funcionários", path: "/cadastroFuncionarios", iconClass: "bi bi-person-badge-fill" },
    { name: "Responsáveis", path: "/cadastroResponsavel", iconClass: "bi bi-person-fill-add" },
    { name: "Alunos", path: "/cadastroAlunos", iconClass: "bi bi-backpack-fill" },
    { name: "Turmas", path: "/cadastroTurma", iconClass: "bi bi-people-fill" },
    { name: "Matrículas", path: "/matriculas", iconClass: "bi bi-person-fill-up" },
    { name: "Disciplinas", path: "/cadastroDisciplina", iconClass: "bi bi-book-fill" },
    { name: "Disponibilidade do Professor", path: "/cadastroAgenda", iconClass: "bi bi-calendar-check-fill" },
    { name: "Recados", path: "/recados", iconClass: "bi bi-calendar-check-fill" },
    { name: "Remanejar Alunos", path: "/remanejar", iconClass: "bi bi-person" },
    { name: "Agendar Reunião", path: "/agendamentos", iconClass: "bi bi-person" },
    { name: "Notas e Faltas", path: "/nota", iconClass: "bi bi-file-earmark-text" },
    { name: "Voltar", path: "/cadastro", iconClass: "fas fa-arrow-left" }
  ];

  const handleMenuItemClick = (path) => {
    if (path !== "Voltar") {
      setItemSelecionado(path);
    } else {
      // Navigate to the login page when "Voltar" is clicked
      navigate('/login');
    }
  };

  return (
    <div>
      <nav
        className={`sidebar ${isMenuExpanded ? 'expanded' : ''}`}
        onMouseEnter={() => setMenuExpanded(true)}
        onMouseLeave={() => setMenuExpanded(false)}
      >
        <div className="logo"></div>
        <ul className="menu">
          {menuItems.map(item => (
            <li
              key={item.path}
              className={itemSelecionado === item.path ? 'highlighted' : ''}
              onClick={() => handleMenuItemClick(item.path)}
            >
              <NavLink to={item.path}>
                <i className={item.iconClass}></i>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div id='cabecalho' className={isMenuExpanded ? 'expanded' : ''}>
        <div className="main--content">
          <div className="header--wrapper">
            <div className="header--title">
              <img id="sgeImage" src={sgeImage} alt="Livro" className="header-icon" />
              <h3> Sistema de Gerenciamento Escolar - SGE </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComponenteMenu;
