import React, { useRef, useEffect, useCallback } from 'react';

const Cards = React.memo(({ cardId, text, handleChange }) => {
  const editableRef = useRef(null);

  useEffect(() => {
    if (editableRef.current) { editableRef.current.innerText = text || ''; }
  }, [text]);

  const handleInput = useCallback(() => {
    if (editableRef.current) {  handleChange(cardId, editableRef.current.innerText); }
  }, [cardId, handleChange]);

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
          boxSizing: 'border-box',
          outline: 'none',
          tabIndex: 0,
        }}
      >
      </div>
    </div>
  );
});

export default Cards;
