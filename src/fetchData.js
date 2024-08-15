import { supabase } from './supabaseClient';
import { useState } from 'react';
export async function fetchData(id) {
    try {
      const { data, error } = await supabase
        .from('cardsn')
        .select('struct')
        .eq('card_id', id)
        
      if (error) {
        console.error('Erro ao buscar dados:', error);
        return null;
      }
      if (data && data.length > 0) {
        const json_text = JSON.stringify(data[0].struct, null, 2); // Ajustado para 'struct'
        return json_text;
      } else {
        console.log('Nenhum dado encontrado para o ID:', id);
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error.message);
      return null;
    }
  }

  export default function TicketsPage({ tickets }) {
    const [loadedTickets, setLoadedTickets] = useState(tickets);
  
    return (
      <div>
        {loadedTickets.map((ticket, index) => (
          <div key={index}>
            {/* Render ticket details here */}
          </div>
        ))}
      </div>
    );
  }
  
  // Função para obter dados do servidor
  export async function getServerSideProps() {
    const { data: tickets, error } = await supabase
      .from('cardsn')
      .select('struct')
      .order('createdAt', { ascending: false })
      .limit(20);
  
    if (error) {
      console.error('Error fetching tickets:', error);
      return { props: { tickets: [] } };
    }
  
    return {
      props: {
        tickets,
      },
    };
  }
  