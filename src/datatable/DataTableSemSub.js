import DataTable from 'react-data-table-component';
import './datatable.css'; // Se você tiver estilos específicos para o DataTable

import React, { useRef,useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../arquivosSite/site.css';
import { getAccountingSummary } from '../buscarDadosSql/buscaFunctionSql'; // Ajuste o caminho aqui
import { Navigation } from 'swiper/modules'; // Importação corrigida
import { supabase } from '../supabaseClient';

import { buscarElemento } from "../arquivosSite/utils";

const DataTableComponent = ({onClickRow}) => {

  const [jsonItems, setJsonItems] = useState([]);

  const columns = [
    { id: 'name-column', 
      name: 'Name', 
      cell: row => (
        <button                 //onClick={(event) => handleItemClick(event, item.acc_class)}
          onClick={(event) => handleItemClick(event, row.name)}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: 'blue', 
            textDecoration: 'underline', 
            cursor: 'pointer' 
          }}
        >
          {row.name}
        </button>
      ), 
      sortable: true },
    { id: 'position-column', name: 'total_value', selector: row => row.position, sortable: true },
    { id: 'salary-column', name: 'ind_dc', selector: row => row.salary, sortable: true }
  ];

  const data = [
    ...jsonItems.map((item, index) => ({
      id: index + 1,
      name: item.acc_class,
      position: item.total_value,
      salary: item.ind_dc
    })),
  ];

  const handleButtonClick = async (event) => {
    event.preventDefault(); // Evita a atualização da página
    try {
      const accountingData = await getAccountingSummary();
      console.log('Resumo Contábil:', accountingData.acc_class);
      setJsonItems(accountingData); // Atualiza o estado com os dados obtidos
      
    } catch (error) {
      console.error('Erro ao buscar resumo contábil:', error);
    }
  };

  const handleItemClick = (event, value) => {
    event.preventDefault(); // Evita a atualização da página
    console.log('Valor do botão clicado:', value);
    
    onClickRow(value)
  };

  return (
    <div className="datatable-container">

      <button id="buscarBotao" onClick={handleButtonClick}>Buscar Resumo</button>
      <input type="text" id="idInput"/>
      <button id="buscarBotao" onClick={buscarElemento} type="button" >Buscar no Supabase</button>
                        
      <div style={{ height: '100%', overflowY: 'auto' }}>
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          responsive
        />
      </div>
      
    </div>
  );
};

export default DataTableComponent;