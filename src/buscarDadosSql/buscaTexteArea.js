export const getTextAreaValue = (card_id) => {
  const textarea = document.getElementById(`textarea-${card_id}`);
  console.log("textarea: ", textarea)
  if (textarea) {
    return textarea.textContent;
  } else {
    console.warn(`Textarea with id textarea-${card_id} not found`);
    return null;
  }
};

