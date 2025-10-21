import React from 'react';
import { useRealtimeData } from '../hooks/useRealTimeData';
import RealtimeLineChart from '../components/RealtimeLineChart';
import KPICard from '../components/KPICard';

const Dashboard: React.FC = () => {
  const { data, isConnected } = useRealtimeData();
  const latestData = data.length > 0 ? data[data.length - 1] : null;
  
  return (
    <div className='min-h-screen bg-gray-50 p-4 sm:p-8'>
      <div className="max-w-7xl mx-auto px-4 bg-zinc-400 p-6 rounded-xl shadow-lg">
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 border-b pb-4 bg-white rounded-xl shadow-lg p-2'>
          <h1 className='text-3xl font-bold text-gray-800'>
            Dashboard de Dados em Tempo Real
          </h1>
          <p
            className={`
              px-3 py-1 text-xl font-semibold rounded-full whitespace-nowrap
              ${isConnected ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'}
            `}
          >
            Status: {isConnected ? '🟢 Conectado' : '🔴 Desconectado'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KPICard 
            title="Métrica A (Valor Atual)" 
            value={latestData ? latestData.valueA.toFixed(2) : "0.00"}
            unit="unidades"
            color="blue"
          />
          <KPICard 
            title="Métrica B (Valor Atual)" 
            value={latestData ? latestData.valueB.toFixed(2) : "0.00"}
            unit="ptos"
            color="green"
          />
          <KPICard 
            title="Métrica C (KPI Chave)" 
            value={latestData?.metricC || 0} 
            unit="eventos"
            color="purple"
          />
        </div>
        <div className='p-6 mt-3 rounded-xl shadow-lg bg-white'>
            <h2 className='text-xl font-semibold mb-4'>Flutuação Métrica A e B</h2>
            <div className="h-[400px] w-full">
               <RealtimeLineChart data={data} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;