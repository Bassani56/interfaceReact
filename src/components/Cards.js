import React, { useRef, useEffect } from 'react';
import './Carousel';

const Cards = React.memo(({ cardId, text, handleChange }) => {
  const editableRef = useRef(null);

  useEffect(() => {
    // Atualiza o conteúdo inicial se `text` mudar
    if (editableRef.current) {
      editableRef.current.innerText = text || '';
    }
  }, [text]);

  const handleInput = () => {
    if (editableRef.current) {
      handleChange(cardId, editableRef.current.innerText);
    }
  };

  return (
    <div>
      <div
        ref={editableRef}
        
        id={`textarea-${cardId}`}
        contentEditable
        onInput={handleInput}
        style={{
          marginTop: '40px',
          border: '1px solid #ccc',
          padding: '10px',
          marginLeft: '0px',
          height: '100%',
          width: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          outline: 'none',
          whiteSpace: 'pre-wrap',
          boxSizing: 'border-box'
        }}
      >
        
        {/* Evite usar conteúdo diretamente aqui */}
      </div>
    </div>
  );
});

export default Cards;