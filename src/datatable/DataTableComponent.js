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

  const additionalData = [];
  for (let i = 0; i < 5; i++) {
    additionalData.push({
      id: jsonItems.length + i + 1,
      name: `name${i}`,
      position: `position${i}`,
      salary: `salary${i}`
    });
  }

  const data = [
    ...jsonItems.map((item, index) => ({
      id: index + 1,
      name: item.acc_class,
      position: item.total_value,
      salary: item.ind_dc
    })),
    ...additionalData
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

      <button onClick={handleButtonClick}>Buscar Resumo</button>
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
