import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Navbar.css';
import brasao from '../../assets/brasao.png';

const Navbar = () => {

  //Estado para controlar se a navbar deve ser sticky com base no scroll
  const [sticky, setSticky] = useState(false);

  // Hook para navegação entre páginas
  const navigate = useNavigate(); 

  // useEffect que adiciona um listener de evento para monitorar o scroll da janela
  useEffect(() => {
    //adiciona um evento de scroll na janela
    window.addEventListener('scroll', () => {
      // Define o estado sticky com base na posição do scroll vertical
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    });
  }, []); //Array de dependências vazio para executar apenas no carregamento inicial

  // Função para redirecionar ao Dashboard ao clicar em "Entrar" (Provisório)
  const irParaDashboard = () => {
    navigate('/dashboard');
  };

  return (
    // Contêiner principal da navbar
    // Aplica a classe 'navbar-escura' dinamicamente se o estado "sticky" for verdadeiro
    <nav className={`container-fluid ${sticky ? 'navbar-escura' : ''}`}>
      {/* Logo da Navbar (brasão da UFF) */}
      <img src={brasao} alt="Brasão UFF" className='brasao' />
      {/* Lista de opções da navbar */}
      <ul>
        <li onClick={irParaDashboard} style={{ cursor: 'pointer' }}>Entrar</li>
        <li><button className='botao2'>Anunciar grátis</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;