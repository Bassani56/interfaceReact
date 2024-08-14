import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa ReactDOM diretamente do pacote 'react-dom/client'

import { App } from './App'; // Importa o componente principal App
import reportWebVitals from './reportWebVitals'; // Importa a função para reportar métricas web
// import PaginatedList from './Lazy_loading'
// Cria a raiz do React no elemento com id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente App dentro do StrictMode
root.render(
  <React.StrictMode>
    <App />
    {/* <PaginatedList/> */}
  </React.StrictMode>
);

// Relata as métricas web
reportWebVitals();





/*O arquivo index.js configura o ponto de entrada da sua aplicação React, 
onde o componente App é montado dentro do root, utilizando 
ReactDOM.createRoot para suportar as novas funcionalidades do React 18.
Além disso, React.StrictMode é utilizado para garantir melhores práticas 
de desenvolvimento, enquanto reportWebVitals oferece insights sobre o 
desempenho da sua aplicação.*/