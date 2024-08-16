// Primeiro, certifique-se de ter importado o cliente Supabase
import { supabase } from "../supabaseClient";  // Caminho para o seu arquivo supabaseClient.js

export async function fetchUserTable(cardIdList) {
  // Converta a lista de card_ids para uma string no formato necessário para a query
  const formattedCardIdList = `{${cardIdList.map(id => `"${id}"`).join(',')}}`;

  // Execute a query chamando a função SQL e passando a lista de card_ids
  const { data, error } = await supabase
    .rpc('user_table', { card_id_list: formattedCardIdList });

  if (error) {
    console.error('Erro ao buscar dados:', error);
    return;
  }

  return data;
  
  // Manipule os dados retornados conforme necessário
  console.log('Dados retornados:', data);
}


