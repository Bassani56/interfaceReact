import Carousel from '../components/Carousel';

import { buscarElemento, updateElemento, inserirElemento } from "./utils";

import React, {useState } from "react";

import { Teste } from '../PivotTable/Teste';

const Site = () => {
    const [showCarousel, setShowCarousel] = useState(false);
    const [valorBotao, setTargetValue] = useState(null);
    const [byid, setByid] = useState(null)

    if(byid){
        console.log('byid: ',byid)
    }

    const atualizarElemento = async (someById, someId, boolean) => {
        console.log("ById: ", someById, "    id: ", someId, "    valor: ", boolean);
        const result = await updateElemento({ ById: someById, id: someId, valor: boolean });
        
        // Verificar resultado da atualização
        if (result) {
            window.alert('Atualização realizada com sucesso');
        } else {
            console.log('Falha na atualização');
        }
    };
    
    return(
        <div id="geral">
            <h1>Validação de JSON</h1>
            <div className="content-wrapper">
                <form id="jsonForm">
                    <div id="textoEmail">
                        <label htmlFor="mensagemLabel">Insira seu Email:</label><br />
                        <textarea id="mensagemInput" name="json" rows="34" cols="50" ></textarea><br />
                        <button id="botaoProcessar" type="button">Processar</button>
                    </div>
        
                    <div id="bancoDados"    style={{
                      minHeight: '100px',
                      maxHeight: '100%', // Define a altura máxima para garantir que a rolagem apareça quando necessário
                      width: '100%',
                      overflowY: 'auto', // Habilita a rolagem vertical
                      outline: 'none',
                      whiteSpace: 'pre-wrap', // Preserve whitespace and line breaks
                      boxSizing: 'border-box' // Inclui padding e border no cálculo da altura e largura total
                    }}>
                        <input type="text" id="idInput"/>
                        <button id="buscarBotao" type="button" onClick={buscarElemento}>Buscar no Supabase</button>
                        <Teste onClickRow={(value) => {
                            setShowCarousel(true);
                            setTargetValue(value);
                    }} />
                        
                    </div>

                    <div id="conteudoJson">
                        <label htmlFor="conteudoLabel"><br /> Conteúdo Json:</label><br />
                        <textarea id="jsonInput" name="json" rows="32" cols="50" ></textarea><br />
                        <button id="inserirJson" type="button" onClick={inserirElemento}>Inserir JSON</button>
                        <button id="updateJson" type="button" onClick={() => atualizarElemento('jsonInput', document.getElementById('idInput').value, false)}>Update JSON</button>  {/*passar o nome do byId e o card_id */}
                    </div>

                    <div id="modeloJson">
                        <label htmlFor="modeloLabel"><br /> Modelo Fixo:</label><br />
                        <textarea id="modeloInput" name="json" rows="32" cols="50" readOnly></textarea><br />
                    </div>
                </form>

                <div className='form2'>
                    <div id="carousel">
                        <h1>Cards: </h1>
                        {showCarousel && <Carousel targetValue={valorBotao}  />} {/* Passar jsonItems como prop para o Carousel */}
                        
                        <button id='botaoCards' type="button" onClick={() => atualizarElemento('card', document.getElementById('cardId').innerHTML, true)} >Update JSON</button>
                        
                    </div>
                
                </div>            
        
            </div>
        </div>
    );
};

export { Site};