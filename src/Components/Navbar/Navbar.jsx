import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Navbar.css';
import brasao from '../../assets/brasao.png';
import lupa from '../../assets/lupa.png';

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [buscarTermo, setBuscarTermo] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    });
  }, []);

  // Função para lidar com a submissão do formulário de busca
  const lidarComBusca = (e) => {
    e.preventDefault();
    if (buscarTermo.trim() !== '') {
      console.log(`Buscando por: ${buscarTermo}`);
      // Aqui pode redirecionar p/ a página de resultados ou executar a pesquisa.
    }
  };

  // Função para redirecionar ao Dashboard ao clicar em "Entrar" (Provisório)
  const irParaDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <nav className={`container-fluid ${sticky ? 'navbar-escura' : ''}`}>
      <img src={brasao} alt="Brasão UFF" className='brasao' />
      <div className='nav-container'>
        <form onSubmit={lidarComBusca} className='buscar-form'>
          <div className='buscar-container'>
            <input
              type="text"
              placeholder="Buscar produto..."
              value={buscarTermo}
              onChange={(e) => setBuscarTermo(e.target.value)}
              className='buscar-input'
            />
            <button type="submit" className='buscar-button'>
              <img src={lupa} alt="Buscar" className='lupa' />
            </button>
          </div>
        </form>
      </div>
      <ul>
        <li onClick={irParaDashboard} style={{ cursor: 'pointer' }}>Entrar</li>
        <li><button className='botao2'>Anunciar grátis</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;