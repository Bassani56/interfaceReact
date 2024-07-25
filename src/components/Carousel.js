import React, { useRef,useEffect, useState } from 'react';
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

  // Função para buscar dados quando o componente é montado
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountingData = await getAccountingSummary();
        // Filtrar o item com base em total_value e obter card_ids
        const targetItem = accountingData.find(item => item.action_class === targetValue);

        if (targetItem) {
          setSpecificCardIds(targetItem.card_ids || []);
          console.log("Card IDs específicos:", targetItem.card_ids);
        } else {
          console.log("Nenhum item encontrado com o acc_class:", targetValue);
        }
      } catch (error) {
        console.error('Erro ao buscar resumo contábil:', error);
      }
    };

    fetchData();
  }, [targetValue]); // Executa toda vez que mudar o targetValue - atualiza o carousel com os ids

  useEffect(() => {
    if (specificCardIds.length > 0) {
      const atualizar = async () => {
        await buscaStruct(specificCardIds);
      };

      atualizar();
    }
  }, [specificCardIds]);

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
        console.log("newStructData: ", newStructData);
        setStructData(newStructData);
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
  };

  return (
    <div className='swiper'>
      <div className="swiper-button-prev">{"<"}</div>
      <Swiper
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
        {specificCardIds.map((id, index) => (
          <SwiperSlide key={index}>
            <div>
              <h2>Slide : {index + 1} / {specificCardIds.length}</h2>
              <div style={{ fontSize: 'x-large', color: 'black' }} id='cardId'>{specificCardIds[currentIndex]}</div>
            </div>
            <textarea
              id={`textarea-${id}`}
              className="card"
              value={structData[id] || ''}
              onChange={(e) => handleChange(id, e)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-next">{">"}</div>
    </div>
  );
};

export default Carousel;
