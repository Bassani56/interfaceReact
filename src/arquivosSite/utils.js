import { supabase } from '../supabaseClient';
// In src/arquivosSite/utils.js
import { getTextAreaValue } from '../buscarDadosSql/buscaTexteArea';
// Função para buscar dados da tabela "cardsn"
import { fetchData } from '../fetchData';
import { fetchUserTable } from '../Subtabelas/FetchUserTable';



async function buscarElemento() {
  var userId = document.getElementById('idInput').value; // Obtém o ID do usuário
  console.log('uerId', userId, ' é um: ', typeof(userId))

  const jsonInputElement = document.getElementById("jsonInput");
  const modeloInputElement = document.getElementById("modeloInput");
  
  
      try {
          const accountingData = await fetchUserTable(userId);
          
          
          console.log('accountData: ', accountingData);
      } catch (error) {
          console.error('Erro ao buscar resumo contábil:', error);
      }


    try {
      const json_text = await fetchData(userId);
      // console.log(json_text);
      if (json_text) {
   
        // console.log("jsonInputElement: ", jsonInputElement)
        if (jsonInputElement && modeloInputElement) {
          jsonInputElement.value = json_text; // Preenche a textarea com o JSON recuperado
          modeloInputElement.value = json_text;
          console.log('json_text: ', json_text) // Preenche a textarea original com o JSON recuperado
        } else {
          console.error('Elementos jsonInput ou modeloInput não encontrados.');
        }
      } else { console.log('Não foi possível encontrar dados para o ID:', userId); }
    } 
    
    catch (error) { console.error('Erro ao buscar dados:', error.message); }
 
}

// Função para validar JSON
function validarJson(ById) {
  var jsonInput = document.getElementById(ById).value;
  console.log(jsonInput);

  try {
    const data = JSON.parse(jsonInput);
    console.log('JSON válido:', data);
    window.alert('JSON válido!');
    return true;
  } catch (error) {
    console.error('JSON inválido:', error.message);
    window.alert('JSON inválido: ' + error.message);
    return false;
  }
}
async function inserirElemento() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const minutes = ('0' + currentDate.getMinutes()).slice(-2);
    const seconds = ('0' + currentDate.getSeconds()).slice(-2);

    // Formatar o ID com a data atual
    const cardId = `${year}.${month}.${day}.${hours}.${minutes}.${seconds}`;

    // Validação do JSON
    validarJson('jsonInput'); // Certifique-se de implementar a função validarJson() corretamente
    let newContent = document.getElementById('jsonInput').value.trim();

    if (!newContent) {
        window.alert('Conteúdo JSON não pode estar vazio!');
        return false;
    }

    try { newContent = JSON.parse(newContent); } 
    catch (e) {
        window.alert('Conteúdo inválido! Certifique-se de inserir um JSON válido.');
        console.error('Erro ao parsear JSON:', e.message);
        return false;
    }

    console.log('Tentando inserir dados para o card_id:', cardId);
    console.log('Conteúdo a ser inserido:', newContent);

    try {
        const { data, error } = await supabase
            .from('cardsn')
            .insert([{ card_id: cardId, struct: newContent }])
            .select(); // Adiciona a seleção para obter os dados inseridos

        if (error) {
            console.error('Erro ao inserir dados:', error);
            window.alert('Erro ao inserir dados: ' + error.message);
            return false;
        }

        console.log('Dados inseridos com sucesso:', data);
        window.alert('Dados inseridos com sucesso!');
        return true;
    } catch (error) {
        console.error('Erro ao inserir dados:', error.message);
        window.alert('Erro ao inserir dados: ' + error.message);
        return false;
    }
}

async function updateElemento({ ById, id, valor }) {
  let newContent;
  let userId = id;

  if(!valor){ newContent = document.getElementById(ById).value; }

  if(valor){ newContent = getTextAreaValue(id); }

  if (!newContent) {
    window.alert('Conteúdo JSON não pode estar vazio!');
    return false;
  }

  try { newContent = JSON.parse(newContent); } 
  catch (e) {
    window.alert('Conteúdo inválido! Certifique-se de inserir um JSON válido.');
    console.error('Erro ao parsear JSON:', e.message);
    return false;
  }

  // console.log('Tentando atualizar dados para o ID:', userId);
  // console.log('Novo conteúdo:', newContent);

  try {
    const { error } = await supabase
      .from('cardsn')
      .update({ struct: newContent })
      .eq('card_id', userId)

    if (error) {
      console.error('Erro ao atualizar dados:', error);
      window.alert('Erro ao atualizar dados: ' + error.message);
      return false;
    }
    else{ return true; }

    
  } catch (error) {
    console.error('Erro ao atualizar dados:', error.message);
    window.alert('Erro ao atualizar dados: ' + error.message);
    return false;
  }
}
  
async function processarEmail() {
  const texto = document.getElementById('emailContent').value;
  const response = await fetch('/processar_email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ texto })
  });
  const data = await response.json();
  document.getElementById('mensagemInput').innerText = data.resultado;
}

export { buscarElemento, validarJson, updateElemento, processarEmail, inserirElemento};