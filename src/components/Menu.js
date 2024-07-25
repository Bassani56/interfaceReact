import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Carousel.css';
import { getAccountingSummary } from '../buscarDadosSql/buscaFunctionSql'; // Ajuste o caminho aqui

const VerticalMenu = ({onClickRow}) => {
  const [jsonItems, setJsonItems] = useState([]);

  const handleButtonClick = async (event) => {
    event.preventDefault(); // Evita a atualização da página
    try {
      const accountingData = await getAccountingSummary();
      // console.log('Resumo Contábil:', accountingData);
      setJsonItems(accountingData); // Atualiza o estado com os dados obtidos
      
    } catch (error) {
      console.error('Erro ao buscar resumo contábil:', error);
    }
  };

  const handleItemClick = (event, value) => {
    event.preventDefault(); // Evita a atualização da página
    console.log('Valor do botão clicado:', value);
    
    onClickRow(value)
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Buscar Resumo</button>
      
      <Swiper
        direction="vertical"
        spaceBetween={1}
        slidesPerView={6}
        
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        style={{ width: '100%', height: '480px' }}
      >
        {jsonItems.map((item, index) => (
          <SwiperSlide key={index} style={{ height: '80px', borderBottom: '1px solid #000' }}>
            <div className='menu'> 
              <button id='botao' onClick={(event) => handleItemClick(event, item.acc_class)}>{item.acc_class}</button>
              <div className='campos'>"{item.total_value}"</div>
              <div className='campos'>"{item.ind_dc}"</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VerticalMenu;
