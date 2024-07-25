
export function separaDadosActionEAcc_clas(jsonItems){
        
    // Objeto para armazenar arrays de action_class para cada acc_class
    const accClassMap = {};
  
    // Itera sobre os itens e agrupa os valores de action_class por acc_class
    jsonItems.forEach(item => {
      const { acc_class, action_class } = item;
      
      // Se o acc_class ainda não está no objeto, inicializa um array vazio
      if (!accClassMap[acc_class]) {
        accClassMap[acc_class] = [];
      }
      
      // Adiciona o action_class ao array correspondente
      accClassMap[acc_class].push(action_class);
    });
  
    // Converte o objeto para um array de objetos para exibição ou processamento
    const resultArray = Object.keys(accClassMap).map(key => ({
      acc_class: key,
      action_classes: accClassMap[key]
    }));
  
    // Exibe o resultado
    // console.log(resultArray);
  
    return resultArray;
}