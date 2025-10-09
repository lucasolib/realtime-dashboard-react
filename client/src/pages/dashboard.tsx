import React from 'react';
import { useRealtimeData } from '../hooks/useRealTimeData';
import RealtimeLineChart from '../components/RealtimeLineChart'; // Importe o novo gráfico

const Dashboard: React.FC = () => {
  const { data, isConnected } = useRealtimeData();
  
  return (
    <div className='min-h-screen bg-blue-500/20 sm:p-8'>
      <h1 className='text-4xl mb-3 border-b pb-3'>Dashboard de Dados em Tempo Real</h1>
      <p className={`text-xl font-semibold rounded-full ${
    isConnected ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'
  } px-4 py-2 inline-block transition-all duration-300`}
>
        Status do Socket: {isConnected ? '🟢 Conectado' : '🔴 Desconectado'}
      </p>
      
      {/* Container para o Gráfico */}
      <div className='px-2 py-6 mt-3 rounded-xl shadow-xl bg-orange-500/30'>
         <h2>Flutuação Métrica A e B</h2>
         {/* Passamos o array de dados para o componente de gráfico */}
         <RealtimeLineChart data={data} />
      </div>
    </div>
  );
};

export default Dashboard;