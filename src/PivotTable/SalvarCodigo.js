import React, { useEffect, useState } from 'react';
import $, { data } from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'pivottable';
import 'pivottable/dist/pivot.css'; // Importa o CSS da PivotTable
import { getAccountingSummary } from '../buscarDadosSql/buscaFunctionSql';
import Carousel from '../components/Carousel';
import '../arquivosSite/site.css';
import '../components/Carousel.css';
import { updateElemento } from "../arquivosSite/utils";
import BuscaInformacoes from '../components/BuscaInformacoes';
import ErrorBoundary from './ErrorBoundary';
import { fetchUserTable } from '../Subtabelas/FetchUserTable';
import Subtabela from '../Subtabelas/Subtabela';

const Teste = ({ setMostrarTabela, mostrarTabela, conteudoJson, modeloJson, dados, mostrarCarousel }) => {
    const [exampleData, setData] = useState([]);
    const [values, setList] = useState([]);
    const [clickBotao, setIsButtonClicked] = useState(false);
    const [busca, setBusca] = useState(false);
    const [isSubtabelaVisible, setIsSubtabelaVisible] = useState(false); // Novo estado para gerenciar a visibilidade da Subtabela
    const [cards, setCards] = useState([]); // Adiciona estado para os cards

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

        pivotData.forEachMatchingRecord(filters, function(record) {
            card_ids_list.push(record.card_ids); // Supondo que card_ids é um array
        });

        function getUniqueItems(array) {
            return Array.from(new Set(array));
        }

        const combinedCardIdsList = getUniqueItems(card_ids_list.flat()); // Achata os arrays em um único array
        console.log('filters: ', filters)
        setList(combinedCardIdsList);
        setIsSubtabelaVisible(true); // Mostra a Subtabela
        console.log('example data: ',exampleData)
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
        if (mostrarTabela && exampleData.length > 0 && !isSubtabelaVisible) {
            try {
                $("#output").pivotUI(exampleData, pivotOptions);
            } catch (error) {
                console.error("Error rendering PivotTable UI:", error);
            }
        } else {
            $("#output").empty();
        }
    }, [exampleData, pivotOptions, mostrarTabela, isSubtabelaVisible]);

    return (
        <div>
            <div className="container">
                <div className="left-column">
                    {isSubtabelaVisible ? (
                        <Subtabela 
                            setMostrarTabela={setMostrarTabela} 
                            mostrarTabela={mostrarTabela} 
                            targetValue={values} 
                            valueOriginal={exampleData} 
                            setIsSubtabelaVisible={setIsSubtabelaVisible}
                            setCards={setCards} // Passa a função para atualizar o estado de cards
                          
                        />
                    ) : (
                        mostrarTabela ? (
                            <div id="output" style={{ margin: '30px' }} />
                        ) : (
                            <div>Tabela Oculta</div>
                        )
                    )}
                </div>
                <div className="right-column">
                    {cards.length > 0 ? (
                        <ErrorBoundary>
                            <Carousel 
                                mostrarCarousel={mostrarCarousel} 
                                setBusca={setBusca} 
                                style={{ display: 'inline-flex' }}  
                                targetValue={cards} // Atualiza o Carousel com o estado de cards
                            />
                        </ErrorBoundary>
                    ) : (
                        <div>Busque campos válidos da tabela</div>
                    )}
                    <button id='botaoCards' type="button" onClick={() => {  
                        if (busca) {
                            atualizarElemento('card', document.getElementById('cardId').textContent, true);
                        } else {
                            alert('Deve haver cards para atualizar');
                        }
                    }}>Update JSON</button>
                </div>
            </div>
        </div>
    );
};

export { Teste };
