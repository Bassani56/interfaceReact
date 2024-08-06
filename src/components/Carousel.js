import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../arquivosSite/site.css';
import { getAccountingSummary } from '../buscarDadosSql/buscaFunctionSql'; // Ajuste o caminho aqui
import { Navigation } from 'swiper/modules'; // Importação corrigida
import { supabase } from '../supabaseClient';
import Cards from './Cards';
const Carousel = ({ targetValue, setBusca, mostrarCarousel}) => {
  const [specificCardIds, setSpecificCardIds] = useState([]);
  const [texts, setTexts] = useState({});
  const [structData, setStructData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    setSpecificCardIds(targetValue);
    if(specificCardIds.length > 0 ){
      setBusca(true)
      const atualizar = async () => {
        await buscaStruct(specificCardIds);
      };
      
      atualizar();
    }

    if (swiperInstance) {
      swiperInstance.slideTo(0); // Navega para o primeiro slide
    }
    
  }, [specificCardIds, swiperInstance, targetValue]);

  const buscaStruct = async (specificCardIds) => {
    try {
      const { data, error } = await supabase
        .from('cardsn')
        .select('struct, card_id')
        .in('card_id', specificCardIds);

      if (error) {
        console.error(`Erro ao executar a query:`, error);
      } else {
        const newStructData = {};
        data.forEach(item => {
          newStructData[item.card_id] = JSON.stringify(item.struct, null, 2);
        });
        // Ordena structData de acordo com a ordem de specificCardIds
        const orderedStructData = specificCardIds.reduce((acc, id) => {
          if (newStructData[id]) {
            acc[id] = newStructData[id];
          }
          return acc;
        }, {});
        setStructData(orderedStructData);
      }
    } catch (error) {
      console.error(`Erro ao executar a query:`, error);
    }
  };

  const handleChange = (id, event) => {
    setTexts(prevTexts => ({
      ...prevTexts,
      [id]: event.target.value
    }));
    
  };

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
  };

  
  return (
    <div className='swiper'>
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
                    style={{ width: '100%', height: '100%' }}
                    onSlideChange={handleSlideChange} // Evento para mudança de slide
                  >
                    {
                      Object.keys(structData).map((key, index) => (
                        <SwiperSlide key={index}>
                          <div>
                            <h2 style={{marginTop:'1px'}}>Slide: {index + 1} / {Object.keys(structData).length} </h2>
                            <label style={{ fontSize: 'x-large', color: 'black'}} id='cardId'>
                              {specificCardIds[index]}      
                            </label>
                          </div>
                          
                          <Cards
                            cardId={specificCardIds[index]}
                            text={texts[specificCardIds[index]] || structData[specificCardIds[index]] || ''}
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