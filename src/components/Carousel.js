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

const Carousel = ({ targetValue }) => {
  const [specificCardIds, setSpecificCardIds] = useState([]);
  const [texts, setTexts] = useState({});
  const [structData, setStructData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    setSpecificCardIds(targetValue);
  }, [targetValue]);

  useEffect(() => {
    if(specificCardIds.length > 0){
      const atualizar = async () => {
        await buscaStruct(specificCardIds);
      };
      
      atualizar();
    }

    if (swiperInstance) {
      swiperInstance.slideTo(0); // Navega para o primeiro slide
    }
    
  }, [specificCardIds, swiperInstance]);

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
        style={{ width: '800px', height: '900px' }}
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

              <div
                  id={`textarea-${specificCardIds[index]}`}
                  contentEditable
                  onInput={(e) => handleChange(specificCardIds[index], e)}
                  style={{
                      marginTop: '40px',
                      border: '1px solid #ccc',
                      padding: '10px',
                      marginLeft: '20px',
                      maxWidth: '700px',
                      minHeight: '400px',
                      maxHeight: '100%', // Define a altura máxima para garantir que a rolagem apareça quando necessário
                      width: '100%',
                      overflowY: 'auto', // Habilita a rolagem vertical
                      outline: 'none',
                      whiteSpace: 'pre-wrap', // Preserve whitespace and line breaks
                      boxSizing: 'border-box' // Inclui padding e border no cálculo da altura e largura total
                  }}
                  dangerouslySetInnerHTML={{ __html: texts[specificCardIds[index]] || structData[specificCardIds[index]] || '' }} // Use for initial content
              ></div>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <div className="swiper-button-next">{">"}</div>
    </div>
  );
};

export default Carousel;