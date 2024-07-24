export const getTextAreaValue = (card_id) => {
    const textarea = document.getElementById(`textarea-${card_id}`);
    if (textarea) {
      return textarea.value;
    } else {
      console.warn(`Textarea with id textarea-${card_id} not found`);
      return null;
    }
};

//Buscar uma maneira de acessar o textearea e buscar o card_id por lá, esta é a pira talkei 