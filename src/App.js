import React, { useState } from 'react';
import { Teste } from './PivotTable/Teste';// Ajuste o caminho conforme necessário


const App = () => {
  const [selectedOptionMos, setSelectedOptionMos] = useState('');
  const [selectedOptionOcul, setSelectedOptionUcul] = useState('');
  const [mostrarTabela, setMostrarTabela] = useState(true);
  const [mostrarCarousel, setMostrarCarousel] = useState(true);
  const [modeloJson, setModeloJson] = useState(true);
  const [conteudoJson, setConteudoJson] = useState(true);
  const [dados, setDados] = useState(true);

  const handleChange = (event, boolean) => {
    const value = event.target.value;
    if(boolean){setSelectedOptionMos(value); setSelectedOptionUcul('')}
    else{setSelectedOptionUcul(value); setSelectedOptionMos('');}
    console.log('aq')
    // Atualiza o estado com base na seleção
    if (value === '1') {
      if(boolean){setMostrarTabela(true);}
      else{setMostrarTabela(false);}
    } else if (value === '2') {
      if(boolean){setMostrarCarousel(true);
        console.log('true car')
      }
      else{setMostrarCarousel(false);
        console.log('false car')
      }
    } else if (value === '3') {
      if(boolean){setConteudoJson(true);}
      else{setConteudoJson(false);}
    } else if (value === '4') {
      if(boolean){setModeloJson(true);}
      else{setModeloJson(false);}
    } else if (value === '5') {
      if(boolean){setDados(true);}
      else{setDados(false);}
    } 

  };

  return (
    <div className="App">
      <header className='header'>
        <span>Atenção: para garantir a precisão na busca de informações e evitar problemas, por favor, adicione mais itens à tabela</span>
        <span className='highlight' > Obs: se houver erro na busca por Cards, clique novamente na tabela</span>
      </header>
      
      <label>Mostrar</label>
      <select value={selectedOptionMos} onChange={(event) => handleChange(event, true)} id="mySelectMostrar" style={{ height: '30px', width: '100px' }}>
        <option value=""></option>
        <option value="1">Tabela</option>
        <option value="2">Cards</option>
        <option value="3">Conteúdo Json</option>
        <option value="4">Modelo Fixo</option>  
        <option value="5">Pesquisar por ID</option>     
      </select>

      <label>Ocultar</label>
      <select value={selectedOptionOcul} onChange={(event) => handleChange(event, false)} id="mySelectOcultar" style={{ height: '30px', width: '100px' }}>
        <option value=""></option>
        <option value="1">Tabela</option>
        <option value="2">Cards</option>
        <option value="3">Conteúdo Json</option>
        <option value="4">Modelo Fixo</option>    
        <option value="5">Pesquisar por ID</option>     
      </select>

      <div>
        <Teste mostrarTabela={mostrarTabela} conteudoJson={conteudoJson} modeloJson={modeloJson} dados={dados} mostrarCarousel={mostrarCarousel} />
      </div>
    

    </div>
  );
};

export { App };