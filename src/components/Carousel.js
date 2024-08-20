import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../arquivosSite/site.css';
import { Navigation } from 'swiper/modules'; // Importação corrigida
import Cards from './Cards';
import { buscaStruct } from '../buscarDadosSql/buscaStruct';

import { updateElemento } from '../arquivosSite/utils';


const Carousel = ({ targetValue, setIsButtonClicked}) => {
  const [specificCardIds, setSpecificCardIds] = useState([]);
  const [texts, setTexts] = useState({});
  const [structData, setStructData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [busca, setBusca] = useState(false);

  useEffect(() => {
    setSpecificCardIds(targetValue);
    
    if (specificCardIds.length > 0) {
      setBusca(true);
      
      const atualizar = async () => {
        const data = await buscaStruct(specificCardIds);
        if (data) {
          setStructData(data);
        }
      };
     
      atualizar();
    }

    if (swiperInstance) {
      swiperInstance.slideTo(0);
    }

  }, [specificCardIds, swiperInstance, targetValue]);

  const handleChange = (id, event) => {
    if (event && event.target) {
      setTexts(prevTexts => ({
        ...prevTexts,
        [id]: event.target.value
      }));
    } else {
      console.warn('event.target é undefined');
    }
  };

  const handleSlideChange = (swiper) => {   
    setCurrentIndex(swiper.activeIndex);
  };

  const atualizarElemento = async (someById, someId, boolean) => {
    const result = await updateElemento({ ById: someById, id: someId, valor: boolean });
    setIsButtonClicked(true);

    if (result) {
        window.alert('Atualização realizada com sucesso');
    } else {
        console.log('Falha na atualização');
    }
};

  return (
    <div>
      {!targetValue && <p id='mensagem'>Clique na tabela para pesquisar por Cards Específicos</p>}
      <div className="swiper-button-prev">{"<"}</div>
      <div className="swiper-button-next">{">"}</div>

      <button id='botaoCards' type="button" onClick={() => { 
          if (busca) {
              atualizarElemento('card', document.getElementById('cardId').textContent, true);
          } else {
             alert('Deve haver cards para atualizar');
          }
      }}>Update JSON</button>
      
      <Swiper
       className='swiper'
       onSwiper={(swiper) => setSwiperInstance(swiper)}
       modules={[Navigation]}
       spaceBetween={50} // Espaço entre slides
       slidesPerView={1}
       navigation={{
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
       }}
       pagination={{ clickable: true }}
       scrollbar={{ draggable: true }}
       style={{
        alignItems: 'center',
         width: '1000px',
         height: '100%',
         backgroundColor: 'green',
         padding: '20px', // Adiciona padding ao Swiper para espaço extra
         boxSizing: 'border-box', // Inclui padding e border no tamanho total
       }}
       onSlideChange={handleSlideChange}
      >
        {Object.keys(structData).map((key, index) => (
          <SwiperSlide className="swiper-slide-fixed" key={index}>
            <div >
              <h2 style={{marginTop:'1px'}}>Slide: {index + 1} / {Object.keys(structData).length}</h2>
              <div style={{ fontSize: 'x-large', color: 'black', display: 'flex'}} >
                <div id='cardId'>{specificCardIds[index]}</div>
              </div>
              
              {structData[specificCardIds[index]]?.folder_link ? (
                <h2>
                  Link: <a href={structData[specificCardIds[index]].folder_link} target="_blank" rel="noopener noreferrer">acessar documento</a>
                </h2>
              ) : (
                <div>Sem link</div>
              )}

              <div style={{
                fontSize: 'large',
                color: '#333',
                fontFamily: 'Arial, sans-serif',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#f9f9f9'
              }}>
                {structData[specificCardIds[index]]?.description ? (
                  <>Descrição: {structData[specificCardIds[index]].description}</>
                ) : (
                  <div>Sem descrição</div>
                )}
              </div>

            </div>
            
            <Cards
              cardId={specificCardIds[index]}
              text={texts[specificCardIds[index]] || JSON.stringify(structData[specificCardIds[index]], null, 2) || ''}
              handleChange={handleChange}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
