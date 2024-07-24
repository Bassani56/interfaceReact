// src/exportar.js
const handleButtonClick = (event, id) => {
  event.preventDefault(); // Evita a atualização da página
  console.log(`Botão clicado com ID: ${id}`);
};

export default handleButtonClick;
