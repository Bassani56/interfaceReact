import { supabase } from '../supabaseClient'; // Ajuste o caminho se necessário

const getAccountingSummary = async () => {
  try {
    const { data, error } = await supabase.rpc('get_accounting_summary');
    
    if (error) {
      throw error;
    }

    //console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching accounting summary:', error);
  }
};

export { getAccountingSummary };
