import { supabase } from './supabaseClient';
import { getAccountingSummary } from './bucarDadosSql/buscaFunctionSql'; // Atualize o caminho aqui

export async function fetchData() {
  try {
    const { data, error } = await supabase
      .from('cardsn')
      .select('card_id');

    if (error) {
      console.error('Erro ao buscar IDs:', error.message);
      return [];
    }

    // console.log('IDs buscados:', data);

    const accountingData = await getAccountingSummary();
    //console.log('Resumo Contábil:', accountingData);

    return data;
  } catch (error) {
    console.error('Erro ao executar a consulta:', error.message);
    return [];
  }
}
