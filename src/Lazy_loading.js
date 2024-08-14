import React, { useState } from 'react';

// Dados de exemplo
const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

const ItemsPerPage = 10;

const PaginatedList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular o número total de páginas
  const totalPages = Math.ceil(data.length / ItemsPerPage);

  // Calcular os itens a serem exibidos na página atual
  const startIndex = (currentPage - 1) * ItemsPerPage;
  const endIndex = startIndex + ItemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  // Funções de navegação
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <ul>
        {currentItems.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Próxima
        </button>
      </div>
    </div>
  );
};

export default PaginatedList;
