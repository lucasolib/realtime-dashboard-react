import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import type { RealtimeData } from '../types/data';

interface RealtimeLineChartProps {
  data: RealtimeData[];
}

const timeFormatter = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR');
};

const valueFormatter = (value: number) => {
    return `${value.toFixed(0)}`;
};

const RealtimeLineChart: React.FC<RealtimeLineChartProps> = ({ data }) => {
  if (data.length < 2) {
    return <p>Aguardando mais dados para exibir o gráfico...</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis 
          dataKey="timestamp" 
          tickFormatter={timeFormatter}
          type="number"
          domain={['auto', 'auto']}
        />
        <YAxis domain={['auto', 'auto']} tickFormatter={valueFormatter} /> 
        <Tooltip 
            labelFormatter={timeFormatter}
            formatter={(value, name) => [valueFormatter(value as number), name]}
        />    
        <Legend />
        <Line 
          type="monotone" 
          dataKey="valueA" 
          name="Valor A"
          stroke="#007bff"
          strokeWidth={3}
          dot={false}
          isAnimationActive={false}
        />
        <Line 
          type="monotone" 
          dataKey="valueB" 
          name="Valor B"
          stroke="#28a745"
          strokeWidth={3}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RealtimeLineChart;