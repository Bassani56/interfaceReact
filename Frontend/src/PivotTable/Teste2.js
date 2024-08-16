import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'pivottable';
import 'pivottable/dist/pivot.css'; // Importa o CSS da PivotTable
import { getAccountingSummary } from '../buscarDadosSql/buscaFunctionSql';
import Carousel from '../components/Carousel';
import '../arquivosSite/site.css';
import '../components/Carousel.css';
import { updateElemento } from "../arquivosSite/utils";
import ErrorBoundary from './ErrorBoundary';
import { fetchUserTable } from '../Subtabelas/FetchUserTable';
import BuscaInformacoes from '../components/BuscaInformacoes';


function PivotTableComponent({ mostrarTabela, conteudoJson, modeloJson, dados, mostrarCarousel }) {
    const [exampleData, setData] = useState([]);
    const [values, setList] = useState([]);
    const [clickBotao, setIsButtonClicked] = useState(false);
    const [busca, setBusca] = useState(false);
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
    const [history, setHistory] = useState([]);
    const [currentViewIndex, setCurrentViewIndex] = useState(-1);

    function handleClick(e, value, filters, pivotData) {
        e.preventDefault(); // Previne o comportamento padrão do clique
        let card_ids_list = [];
    
        pivotData.forEachMatchingRecord(filters, (record) => {
            card_ids_list.push(record.card_ids); // Supondo que card_ids é um array
        });
    
        function getUniqueItems(array) {
            return Array.from(new Set(array));
        }
    
        const combinedCardIdsList = getUniqueItems(card_ids_list.flat()); // Achata os arrays em um único array
    
        setList(combinedCardIdsList);
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

    const goBack = () => {
        if (currentViewIndex > 0) {
            const previousView = history[currentViewIndex - 1];
            console.log('previousView: ', previousView)
            console.log('history: ', history[currentViewIndex- 1])
            // Verifica se previousView e previousView.data são válidos
            if (previousView && previousView.data) {
                setCurrentViewIndex(currentViewIndex - 1); // Atualiza o índice da visualização atual
                setData(previousView.data); // Restaura os dados da visualização anterior
            } else {
                console.error('Dados inválidos no histórico.');
            }
        }
    };
    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const accountingData = await getAccountingSummary();
                setData(accountingData);
                setHistory([{ data: accountingData, filters: {} }]); // Inicializa o histórico com os dados originais
                setCurrentViewIndex(0); // Define o índice da visualização inicial
            } catch (error) {
                console.error('Erro ao buscar resumo contábil:', error);
            }
        };
        console.log('NAO PODE ENTRAR AQUI')
        fetchData();
        setIsButtonClicked(false);
    }, [clickBotao]);
    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const accountingData = await fetchUserTable(values);
                setData(accountingData);
            } catch (error) {
                console.error('Erro ao buscar resumo contábil:', error);
            }
        };
    
        if (values.length > 0) {
            fetchData();
        }

       
            setHistory(prevHistory => {
                const newHistory = [...prevHistory.slice(0, currentViewIndex + 1), { data: values}];
                console.log('New History:', newHistory); // Adiciona log para depuração
                return newHistory;
            });

            setCurrentViewIndex(prevIndex => {
                console.log('Updating currentViewIndex:', prevIndex + 1); // Adiciona log para depuração
                return prevIndex + 1;
            });
        

    }, [values]);
    

    useEffect(() => {
        if (exampleData.length > 0) {
            try {
                $("#output").pivotUI(exampleData, pivotOptions);
            } catch (error) {
                console.error("Error rendering PivotTable UI:", error);
            }
        } else {
            $("#output").empty();
        }
    }, [exampleData, pivotOptions]);
    
    console.log('history save list: ', history[currentViewIndex])
    console.log('curretView: ', currentViewIndex)

    return (
        <div>
            <div className="container">
                <div className="left-column">
                    <div id="output" style={{ margin: '30px' }} />
                    <button onClick={goBack} disabled={currentViewIndex <= 0}>Voltar</button>
                </div>

                <div className="right-column">
                    {values.length > 0 ? (
                        <ErrorBoundary>
                            <Carousel mostrarCarousel={true} setBusca={setBusca} style={{ display: 'inline-flex' }} targetValue={values} />
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
            <BuscaInformacoes conteudoJson={true} modeloJson={true} dados={true} />
        </div>
    );
}

export default PivotTableComponent;
