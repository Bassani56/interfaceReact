import DataTable from 'react-data-table-component';
import './datatable.css'; // Se você tiver estilos específicos para o DataTable

import React, { useRef, useEffect, useState } from 'react';
import { getAccountingSummary } from '../buscarDadosSql/buscaFunctionSql'; // Ajuste o caminho aqui
import { separaDadosActionEAcc_clas } from '../separaDadosArray/separaDadosActionEAcc_clas';
import { buscarElemento } from "../arquivosSite/utils";

const DataTableComponent = ({ onClickRow }) => {

  const [jsonItems, setJsonItems] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});

  const columns = [
    { id: 'name-column', name: 'Name', selector: row => row.name, sortable: true, sortable: true },
    { id: 'position-column', name: 'Total Value', selector: row => row.position, sortable: true },
    { id: 'salary-column', name: 'Ind DC', selector: row => row.salary, sortable: true }
  ];

  const data = [
    ...jsonItems.map((item, index) => ({
      id: index + 1,
      name: item.acc_class,
      position: item.total_value,
      salary: item.ind_dc,
      subRows: item.subRows || [ ], // Adicione subRows se houver
      actionClass: item.action_classes
    })),
  ];

  const handleButtonClick = async (event) => {
    event.preventDefault(); // Evita a atualização da página
    try {
      const accountingData = await getAccountingSummary();
      // console.log('Resumo Contábil:', accountingData.acc_class);
      setJsonItems(separaDadosActionEAcc_clas(accountingData)); // Atualiza o estado com os dados obtidos
    } catch (error) {
      console.error('Erro ao buscar resumo contábil:', error);
    }
  };

  const handleItemClick = (event, value) => {
    event.preventDefault(); // Evita a atualização da página
    console.log('Valor do botão clicado:', value);
    onClickRow(value);
  };

  const handleRowExpand = (rowId) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowId]: !prev[rowId]    //Inverte o valor atual de expansão da linha clicada (rowId). Se estava expandida, agora será recolhida, e vice-versa.
    }));
  };

  jsonItems.map((item, index) =>{
    // console.log(item)
  });

  const expandableRow = ({ data }) => {
    // Verifica se data é um array e fornece um array vazio como valor padrão
    // console.log("expandableRow: ", data.actionClass)

    return (
      <div style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>
        <p> <strong>Detalhes para:</strong> {data.name}</p>
        {data.actionClass.map((item, index) => (
          <div key={index}>
            <button  style={{ 
                background: 'transparent',
                padding: '10px', 
                border: 'none', 
                color: '#000000', 
                textDecoration: 'underline', 
                cursor: 'pointer'
              }} onClick={(event) => handleItemClick(event, item)}> {item}
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="datatable-container">

      <button id="buscarBotao" onClick={handleButtonClick}>Buscar Resumo</button>
      <input type="text" id="idInput" />
      <button id="buscarBotao" onClick={buscarElemento} type="button">Buscar no Supabase</button>

      <div style={{ height: '100%', overflowY: 'auto', fontSize: 'large' }}>
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          responsive
          
          expandableRows
          expandableRowsComponent={expandableRow}
          onRowExpandToggled={(rowId, isExpanded) => handleRowExpand(rowId)}
          expandedRows={Object.keys(expandedRows).filter(key => expandedRows[key])}
        />
      </div>

    </div>
  );
};

export default DataTableComponent;
