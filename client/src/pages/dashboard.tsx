import React from 'react';
import { useRealtimeData } from '../hooks/useRealTimeData';
import RealtimeLineChart from '../components/RealtimeLineChart'; // Importe o novo gráfico

const Dashboard: React.FC = () => {
  const { data, isConnected } = useRealtimeData();
  
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Dashboard de Dados em Tempo Real</h1>
      <p style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
        Status do Socket: {isConnected ? '🟢 CONECTADO' : '🔴 DESCONECTADO'}
      </p>
      
      {/* Container para o Gráfico */}
      <div style={{ 
          marginTop: '30px', 
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#fff' 
      }}>
         <h2>Flutuação Métrica A e B</h2>
         {/* Passamos o array de dados para o componente de gráfico */}
         <RealtimeLineChart data={data} />
      </div>
      
      {/* Exibição da Última Atualização (KPI simples) */}
      <div style={{ marginTop: '30px', padding: '15px', borderLeft: '4px solid #007bff' }}>
        <h3>KPIs Recebidos</h3>
        {data.length > 0 ? (
          <p>Último Contador: **{data[data.length - 1].count}** | Métrica C: **{data[data.length - 1].metricC}**</p>
        ) : (
          <p>Aguardando primeiro dado...</p>
        )}
      </div>
      
    </div>
  );
};

export default Dashboard;