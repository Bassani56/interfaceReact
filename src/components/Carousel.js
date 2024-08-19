import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../arquivosSite/site.css';
import { Navigation } from 'swiper/modules'; // Importação corrigida
import Cards from './Cards';
import { buscaStruct } from '../buscarDadosSql/buscaStruct';
import IndiceDeCards from './IndiceDeCards';

import slices from './Slices';


const Carousel = ({ targetValue, setBusca, mostrarCarousel}) => {
  const [specificCardIds, setSpecificCardIds] = useState([]);
  const [texts, setTexts] = useState({});
  const [structData, setStructData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // console.log("targetValue: ", targetValue)
  useEffect(() => {
  setSpecificCardIds(targetValue);
  
  if (specificCardIds.length > 0) {
    setBusca(true);
    
    const atualizar = async () => {

        const data = await buscaStruct(specificCardIds);
       
        if (data) {
          // Mescla os novos dados com os dados anteriores
          setStructData(data);
          
        }
    };
   
    atualizar();
  }

  if (swiperInstance) {
    swiperInstance.slideTo(0); // Navega para o primeiro slide
  }
 

}, [specificCardIds, swiperInstance, targetValue]);

  const handleChange = (id, event) => {
    if (event && event.target) {
      console.log('agora tem conteudo')
      setTexts(prevTexts => ({
        ...prevTexts,
        [id]: event.target.value
      }));
    } 
    
    else { console.warn('event.target é undefined'); }
  };

  const handleSlideChange = (swiper) => {   
    if (structData && Object.keys(structData).length > 0) {
      slices(structData, currentIndex);
    } else {
      console.warn('structData está vazio ou null na função handleSlideChange');
    }
    setCurrentIndex(swiper.activeIndex);
  };

  
  // if(slices != null) {console.log("slices: ", slices)}
  
  return (
    <div >

      {mostrarCarousel && !targetValue && <p id='mensagem'>Clique na tabela para pesquisar por Cards Específicos</p>}
      {mostrarCarousel ? (

        <div>
          <div className="swiper-button-prev">{"<"}</div>
           
          <Swiper
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            modules={[Navigation]} // Usando o módulo de navegação
            spaceBetween={50}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            style={{ width: '1200px', height: '100%' }}
            onSlideChange={handleSlideChange} // Evento para mudança de slide
          >
            { 

              Object.keys(structData).map((key, index) => (

                <SwiperSlide key={index}>
                  <div>
                    <h2 style={{marginTop:'1px'}}>Slide: {index + 1} / {Object.keys(structData).length}</h2>
                    <div style={{ fontSize: 'x-large', color: 'black', display: 'flex'}} >
                      <div id='cardId'>{specificCardIds[index]}</div>
                      
                    </div>
                    
                    {
                      structData[specificCardIds[index]]?.folder_link ? (
                        <h2>
                          Link: <a href={structData[specificCardIds[index]].folder_link} target="_blank" rel="noopener noreferrer">acessar documento</a>
                        </h2>
                      ) : (
                        <div>Sem link</div>
                      )
                    }

                    <div style={{
                      fontSize: 'large',
                      color: '#333',        // Cor do texto
                      fontFamily: 'Arial, sans-serif', // Fonte
                      padding: '10px',      // Espaçamento interno
                      border: '1px solid #ddd', // Borda
                      borderRadius: '4px',  // Cantos arredondados
                      backgroundColor: '#f9f9f9' // Cor de fundo
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
              ))
            }

          </Swiper>
          <div className="swiper-button-next">{">"}</div>
        </div>

      ) : (
        <div>Tabela Cards esta oculta</div>
      )}

      
      
    </div>
  );
  };

export default Carousel;