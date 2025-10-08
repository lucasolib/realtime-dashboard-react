import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import type { RealtimeData } from '../types/data'; // Importamos o tipo que definimos

interface RealtimeLineChartProps {
  data: RealtimeData[];
}

// Formata o timestamp (eixo X) para exibir apenas a hora legível
const timeFormatter = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR');
};

// Formata o valor (Tooltip) para ter 2 casas decimais
const valueFormatter = (value: number) => {
    return `${value.toFixed(2)}`;
};

const RealtimeLineChart: React.FC<RealtimeLineChartProps> = ({ data }) => {
  if (data.length < 2) {
    return <p>Aguardando mais dados para exibir o gráfico...</p>;
  }

  return (
    // ResponsiveContainer garante que o gráfico ocupe 100% do seu contêiner pai
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        {/* Linhas horizontais e verticais de grade */}
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        
        {/* Eixo X: Usamos o 'timestamp' como chave e nosso formatador */}
        <XAxis 
          dataKey="timestamp" 
          tickFormatter={timeFormatter}
          type="number" // Trata o timestamp como um número crescente
          domain={['auto', 'auto']}
        />
        
        {/* Eixo Y: Escala ajustável automaticamente */}
        <YAxis domain={['auto', 'auto']} tickFormatter={valueFormatter} /> 
        
        {/* Tooltip: Exibe os detalhes ao passar o mouse */}
        <Tooltip 
            labelFormatter={timeFormatter}
            formatter={(value, name) => [valueFormatter(value as number), name]}
        />
        
        <Legend />
        
        {/* SÉRIE 1: valueA (Flutuação mais suave) */}
        <Line 
          type="monotone" 
          dataKey="valueA" 
          name="Valor A"
          stroke="#007bff" // Azul primário
          strokeWidth={2}
          dot={false} // Oculta os pontos para melhor visualização em tempo real
          isAnimationActive={false} // Crucial: desliga animação para evitar lentidão
        />
        
        {/* SÉRIE 2: valueB (Flutuação mais intensa) */}
        <Line 
          type="monotone" 
          dataKey="valueB" 
          name="Valor B"
          stroke="#28a745" // Verde
          strokeWidth={2}
          dot={false}
          isAnimationActive={false} // Desliga animação
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RealtimeLineChart;