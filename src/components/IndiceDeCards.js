import React, { useState, useRef, useEffect } from 'react';
import './IndiceDeCards.css'; // Para os estilos CSS

function IndiceDeCards({ structData, specificCardIds }) {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [checkedOptions, setCheckedOptions] = useState([]);
    const [indexCard, setIndexCard] = useState([]);

    const handleCheckboxChange = (event, index) => {
        const { id, checked } = event.target;

        // Atualiza o estado indexCard com base na seleção
        setIndexCard(prevState => {
            if (checked) {
                return [...prevState, index];
            } else { 
                return prevState.filter(item => item !== index);
            }
        });

        // Atualiza o estado checkedOptions com base na seleção
        setCheckedOptions(prevState => {
            if (checked) {
                return [...prevState, id];
            } else {
                return prevState.filter(option => option !== id);
            }
        });
    };

    const renderStatusMessage = () => {
        if (checkedOptions.length > 0) {
            return `Opções marcadas: ${checkedOptions.map(id => id.replace('checkbox-', 'Opção ')).join(', ')}`;
        }
        return 'Nenhuma opção marcada.';
    };

    const chaves = Object.keys(structData);
    const editableRef = useRef(null);

    useEffect(() => {
        if (editableRef.current) {
            
            const text = indexCard.map(index => JSON.stringify(structData[chaves[index]], null, 2)).join('\n\n');
            
            editableRef.current.innerText = text;
        }
    }, [indexCard, structData, chaves]);

    return (
        <div className="containerCheck">
            <button onClick={() => setIsFormVisible(true)} className="showFormButton">Mostrar Formulário</button>

            {isFormVisible && (
                <div className="overlay">

                    <div className="formContainer">
                        <button onClick={() => setIsFormVisible(false)} className="closeButton">X</button>
                        <h1>Escolha quais cards modificar</h1>
                        <form id="checkboxForm">
                            {Object.keys(structData).map((key, index) => (
                                <label key={index}>
                                    <input
                                        type="checkbox"
                                        id={`checkbox-${index}`}
                                        onChange={(e) => handleCheckboxChange(e, index)}
                                    />
                                    Card {index + 1}
                                </label>
                            ))}
                        </form>

                        <div id="statusMessage" style={{
                            marginTop: '20px',
                            fontSize: 'large',
                            fontFamily: 'Arial, sans-serif',
                            color: '#333'
                        }}>
                            {renderStatusMessage()}
                        </div>
                    </div>

                    <div className="jsonContainer">
                        <button onClick={() => setIsFormVisible(false)} className="closeButton">X</button>
                        {chaves.length > 0 && (
                            <div>
                                <h1>Objetos Selecionados</h1>
                                <div
                                    ref={editableRef}
                                    contentEditable
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '10px',
                                        borderRadius: '4px',
                                        backgroundColor: '#f9f9f9',
                                        minHeight: '200px',
                                    }}
                                >
                                    {/* O conteúdo será adicionado por useEffect */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default IndiceDeCards;
