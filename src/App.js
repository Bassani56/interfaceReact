import React, { useState } from 'react';
import PivotTableComponent from './PivotTable/Teste2';

const App = () => {
  const [headerContent, setHeaderContent] = useState(null);

  return (
    <div className="App">
      <header className='headerOptions'>
        {/* Renderiza o conteúdo passado do componente filho */}
        {headerContent}
      </header>
      
      <PivotTableComponent renderHeader={setHeaderContent} />
    </div>
  );
};

export { App };
