
export default function slices({structData, current}){
    // Supondo que structData seja um array ou um objeto cujas chaves você está usando para a contagem.
    
    if (structData) {
      const pageSize = 20;
      const totalItems = Object.keys(structData).length;
      
      // Calcular o início e o fim do próximo slice
      let start = Math.floor(current / pageSize) * pageSize;
      let end = start + pageSize;
      
      // Ajustar o fim se exceder o total de itens
      if (end > totalItems) {
        end = totalItems;
      }
    
      // Retornar o slice dos itens
      console.log("a: ", Object.keys(structData).slice(start, end))
      // return Object.keys(structData).slice(start, end);

    } else {
      console.warn("Dados recebidos são null ou undefined");
    }


      
}