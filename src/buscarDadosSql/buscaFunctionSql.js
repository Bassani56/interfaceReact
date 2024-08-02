import { supabase } from '../supabaseClient'; // Ajuste o caminho se necessário

const getAccountingSummary = async () => {
  try {
    const { data, error } = await supabase.rpc('get_accounting_summary_with_action_class');
    
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching accounting summary:', error);
  }
};

export { getAccountingSummary };

