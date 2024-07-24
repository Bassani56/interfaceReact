import Carousel from '../components/Carousel';
import './site.css'
import { buscarElemento, updateElemento, inserirElemento } from "./utils";
import VerticalMenu from "../components/Menu";
import React, { useRef, useEffect, useState } from "react";

const Site = () => {
    const [showCarousel, setShowCarousel] = useState(false);
    const [valorBotao, setTargetValue] = useState(null);

    const atualizarElemento = async (someById, someId, boolean) => {
        console.log("ById: ",someById, "    id: ",someId, "    valor: ", boolean);
        const result = await updateElemento({ ById: someById, id: someId, valor: boolean });
        
        // if (inputRef.current) {
        //     const conteudo = inputRef.current.value;
        //     console.log('Conteúdo:', conteudo);
        //  };
        // try {
        //     console.log(someById)
            
        // } catch (error) {
        //   console.error('Erro ao atualizar elemento:', error);
        // }
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
        
                    <div id="bancoDados">
                        <input type="text" id="idInput"/>
                        <button id="buscarBotao" type="button" onClick={buscarElemento}>Buscar no Supabase</button>
                        
                        <div id='cabecalho'>
                            <div className='caixas'><h2>acc_class</h2></div>
                            {/* <div className='caixas'><h2>action_class</h2></div> */}
                            <div className='caixas'><h2>total_value</h2></div>
                            <div className='caixas'><h2>ind_dc</h2></div>
                        </div>
                        
                        <div id="menuDados">
                            <VerticalMenu onClickRow={(value) => {
                                setShowCarousel(true);
                                setTargetValue(value);
                            }}/>
                        </div>
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
                        {showCarousel && <Carousel targetValue={valorBotao} />} {/* Passar jsonItems como prop para o Carousel */}
                        
                        <button id='botaoCards' type="button" onClick={() => atualizarElemento('card', document.getElementById('cardId').innerHTML, true)} >Update JSON</button>
                
                    </div>
                
                </div>            
        
            </div>
        </div>
    );
};

export { Site};