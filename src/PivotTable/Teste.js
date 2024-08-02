import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'pivottable';
import 'pivottable/dist/pivot.css';
import { getAccountingSummary } from '../buscarDadosSql/buscaFunctionSql';
import Carousel from '../components/Carousel';
import '../arquivosSite/site.css';
import '../components/Carousel.css';

import {updateElemento} from "../arquivosSite/utils";

import Cookies from 'js-cookie';

const Teste = () => {
    const [exampleData, setData] = useState([]);
    const [value, setList] = useState('')
    const[clickBotao, setIsButtonClicked] = useState(false)
    
    const [pivotOptions, setPivotOptions] = useState({
      rows: ["acc_class"],
      aggregatorName: "Sum",
      vals: ["total_value"],
      rendererName: "Heatmap",
      rendererOptions: {
        table: {
          clickCallback: handleClick
        }
      }
    });

    function handleClick(e, value, filters, pivotData) {
      e.preventDefault(); // Previne o comportamento padrão do clique
      console.log('clicou')
      let action_class_list = [];
      let card_ids_list = [];

      // Itera sobre os registros que correspondem aos filtros e adiciona action_class e card_ids à lista
      pivotData.forEachMatchingRecord(filters,
        function(record) {
          action_class_list.push(record.action_class);
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
      const result = await updateElemento({ ById: someById, id: someId, valor: boolean });
      setIsButtonClicked(true);
 
      if (result) {
          window.alert('Atualização realizada com sucesso');
      } else {
          console.log('Falha na atualização');
      }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accountingData = await getAccountingSummary();
                setData(accountingData);
            } catch (error) {
                console.error('Erro ao buscar resumo contábil:', error);
            }
        };

        fetchData();
        setIsButtonClicked(false);
    }, [clickBotao]);
    
    useEffect(() => {
        if (exampleData.length > 0) {
            try {
                // $("#output").empty();
                $("#output").pivotUI(exampleData, pivotOptions);

                $("#save").on("click", function() {
                  var config = $("#output").data("pivotUIOptions");
                  if (config && config.rendererOptions) {
                      var config_copy = JSON.parse(JSON.stringify(config));
              
                      // Verificar e remover propriedades não serializáveis, se necessário
                      delete config_copy["aggregators"];
                      delete config_copy["renderers"];
              
                      // Salvar configuração no cookie
                      Cookies.set("pivotConfig", JSON.stringify(config_copy));
                      console.log("Config saved:", JSON.stringify(config_copy));
                  } else {
                      console.log("No rendererOptions found.");
                  }
              });
              
              $("#restore").on("click", function() {
                const savedConfig = Cookies.get("pivotConfig");
                console.log("Retrieved cookie:", savedConfig);
            
                if (savedConfig) {
                    const parsedConfig = JSON.parse(savedConfig);
                    console.log("Parsed config:", parsedConfig);
            
                    // Restaurar configuração do PivotTable
                    $("#output").pivotUI(exampleData, parsedConfig, true);
                } else {
                    console.log("No savedConfig found in cookies.");
                }
              });
            
               } catch (error) {
                console.error("Error rendering PivotTable UI:", error);
            }
        }
        var tabela = $.pivotUtilities;
        // console.log("tabela: ", tabela.renderers.Table)
    }, [exampleData, pivotOptions]);
    
    var confere = $("#output").data("pivotUIOptions")
    // console.log("confere: ", confere)

return (
  <div>
    <div className="container">
      
      <div className="left-column">
        <button id="save">Save Config</button>
        <button id="restore">Restore Config</button>
        
        <div id="output" style={{ margin: '30px' }}></div>
        
      </div>

      <div className="right-column">
        
        <Carousel style={{ display: 'inline-flex' }}  targetValue={value} />
        <button id='botaoCards' type="button" onClick={() => atualizarElemento('card', document.getElementById('cardId').textContent, true)} >Update JSON</button>
        
      </div>
    </div>
  </div>
);

};

export { Teste };