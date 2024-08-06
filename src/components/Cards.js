import React, { useMemo, Suspense, lazy } from 'react';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Lazy load SyntaxHighlighter
const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter').then(module => ({
  default: module.Prism
})));

// Define o componente Cards
const Cards = React.memo(({ cardId, text, handleChange }) => {
  // Memoize the highlighted text to avoid re-rendering unnecessarily
  const highlightedText = useMemo(() => (
    <Suspense fallback={<div>Loading syntax highlighter...</div>}>
      <SyntaxHighlighter language="json" style={dark}>
        {text || ''}
      </SyntaxHighlighter>
    </Suspense>
  ), [text]);

  return (
    <div>
      <div
        className="bg-gray-500 grid place-items-center h-screen"
        id={`textarea-${cardId}`}
        contentEditable
        onInput={(e) => handleChange(cardId, e)}
        style={{
          marginTop: '40px',
          border: '1px solid #ccc',
          padding: '10px',
          marginLeft: '0px',
          height: '100%',
          width: '100%',
          overflowY: 'auto',
          outline: 'none',
          whiteSpace: 'pre-wrap',
          boxSizing: 'border-box'
        }}
      >
        {highlightedText}
      </div>
    </div>
  );
});

export default Cards;