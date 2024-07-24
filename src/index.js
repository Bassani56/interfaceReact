import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa o ReactDOM diretamente do pacote 'react-dom/client'

import App from './App'; // Importa o componente principal App
import reportWebVitals from './reportWebVitals'; // Importa a função para reportar métricas web

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div id="geral">
      <App />
    </div>
  </React.StrictMode>
);

reportWebVitals();



/*O arquivo index.js configura o ponto de entrada da sua aplicação React, 
onde o componente App é montado dentro do root, utilizando 
ReactDOM.createRoot para suportar as novas funcionalidades do React 18.
Além disso, React.StrictMode é utilizado para garantir melhores práticas 
de desenvolvimento, enquanto reportWebVitals oferece insights sobre o 
desempenho da sua aplicação.*/