import React, { useEffect, useState } from 'react';
import $, { data } from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'pivottable';
import 'pivottable/dist/pivot.css'; // Importa o CSS da PivotTable
import { fetchUserTable } from './FetchUserTable';

export default function Subtabela({ setMostrarTabela, mostrarTabela, targetValue, setIsSubtabelaVisible, setCards}) {
    const [exampleData, setData] = useState([]);
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
        
        setCards(combinedCardIdsList); // Atualiza o estado de cards no componente pai
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accountingData = await fetchUserTable(targetValue);
                setData(accountingData);
            } catch (error) {
                console.error('Erro ao buscar resumo contábil:', error);
            }
        };

        fetchData();
    }, [targetValue]);

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

    return (
        <>
            <button onClick={() => {
                setIsSubtabelaVisible(false); // Oculta a Subtabela
                setMostrarTabela(true); // Mostra a Tabela original
            }}>Voltar tabela</button>
            {mostrarTabela ? (
                <div id="output" style={{ margin: '30px' }} />
            ) : (
                <div>Tabela Oculta</div>
            )}
        </>
    );
}
