import React, { useEffect, useState } from 'react';
import $, { data } from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'pivottable';

import 'pivottable/dist/pivot.css'; // Importa o CSS da PivotTable

import 'pivottable/dist/pivot.css';
import { getAccountingSummary } from '../buscarDadosSql/buscaFunctionSql';
import Carousel from '../components/Carousel';
import '../arquivosSite/site.css';
import '../components/Carousel.css';

import {updateElemento} from "../arquivosSite/utils";

import BuscaInformacoes from '../components/BuscaInformacoes';

import ErrorBoundary from './ErrorBoundary';

const Teste = ({mostrarTabela, conteudoJson, modeloJson, dados, mostrarCarousel}) => {
    const[exampleData, setData] = useState([]);
    const[values, setList] = useState([])
    const[clickBotao, setIsButtonClicked] = useState(false)

    const[busca, setBusca] = useState(false);
  
    // var renderers = $.extend($.pivotUtilities.renderers,
    //   $.pivotUtilities.export_renderers);

    // console.log("modulo renderers: ", renderers)

    const [pivotOptions, setPivotOptions] = useState({
      rows: ["conta"],
      cols: ["ano"],
      aggregatorName: "Sum",
      vals: ["total_value"],
      rendererName: "Table",
      rendererOptions: {
        table: {
          clickCallback: handleClick
        }
      }
    });

    function handleClick(e, value, filters, pivotData) {
      e.preventDefault(); // Previne o comportamento padrão do clique
        let card_ids_list = [];

        // Itera sobre os registros que correspondem aos filtros e adiciona action_class e card_ids à lista
        pivotData.forEachMatchingRecord(filters,
          function(record) {
            card_ids_list.push(record.card_ids); // Supondo que card_ids é um array
          }
        );
        
        function getUniqueItems(array) {
          return Array.from(new Set(array));
        }

        // Se card_ids_list é uma lista de arrays, você pode usar flat para combinar todos eles em um único array
        const combinedCardIdsList = getUniqueItems(card_ids_list.flat()) ; // Achata os arrays em um único array
        
        setList(combinedCardIdsList)
    }
    
    const atualizarElemento = async (someById, someId, boolean) => {
        // console.log('estado botao: ', clickBotao)
        // console.log('someId: ', someId)
        const result = await updateElemento({ ById: someById, id: someId, valor: boolean });
        // console.log("result: ", result)
        setIsButtonClicked(true);
  
        if (result) {
            window.alert('Atualização realizada com sucesso');
        } else {
            console.log('Falha na atualização');
        }
    
    };

    useEffect(() => {
      console.log('useEffect')
        const fetchData = async () => {
            try {
                const accountingData = await getAccountingSummary();
                // console.log("accountingData: ", accountingData)
                setData(accountingData);
            } catch (error) {
                console.error('Erro ao buscar resumo contábil:', error);
            }
        };

        fetchData();
        setIsButtonClicked(false);
        
        console.log('estado botao: ', clickBotao)
    }, [clickBotao]);
    
    useEffect(() => {
        if (mostrarTabela && exampleData.length > 0) {
            try {
                // $("#output").empty();
                $("#output").pivotUI(exampleData, pivotOptions);
            
               } catch (error) {
                console.error("Error rendering PivotTable UI:", error);
            }
        }
        else {
          // Limpar o conteúdo da tabela quando ocultar
          $("#output").empty();
        }
        
        // var tabela = $.pivotUtilities;
        // console.log("tabela: ", tabela.renderers)
        console.log('example data: ', exampleData)
    }, [exampleData, pivotOptions, mostrarTabela]);
    
    var confere = $("#output").data("pivotUIOptions")
    // console.log("confere: ", confere)
  
return (
  <div>
    <div className="container">
      
      <div className="left-column">
        {/* <button id="save">Save Config</button>
        <button id="restore">Restore Config</button> */}
        
        {mostrarTabela ? (
            <div id="output" style={{ margin: '30px' }} />
        ) : (
            <div>Tabela Oculta</div>
        )}
          
        <BuscaInformacoes conteudoJson={conteudoJson} modeloJson={modeloJson} dados={dados} />

      </div>

      <div className="right-column">
        
        {values.length > 0 ? (

            <ErrorBoundary>
              <Carousel mostrarCarousel={mostrarCarousel} setBusca={setBusca} style={{ display: 'inline-flex' }}  targetValue={values}/>
   
            </ErrorBoundary>

               ) : (
          <div>Busque campos válidos da tabela</div>
        )}
        <button id='botaoCards' type="button" onClick={() => {  if(busca){atualizarElemento('card', document.getElementById('cardId').textContent, true)} else{alert('Deve haver cards para atualizar')}   } } >Update JSON</button>
        
      </div>
    </div>
  </div>
);

};

export { Teste };