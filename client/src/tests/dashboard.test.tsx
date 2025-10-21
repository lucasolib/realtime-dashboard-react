import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/dashboard';

const mockUseRealtimeData = vi.fn();
vi.mock('../hooks/useRealTimeData', () => ({
  useRealtimeData: () => mockUseRealtimeData(),
}));

vi.mock('../components/RealtimeLineChart', () => ({
  default: () => <div data-testid="chart-mock">Gráfico Mockado</div>,
}));

vi.mock('../components/KPICard', () => ({
    default: ({ title, value }: { title: string, value: string | number }) => (
        <div data-testid="kpi-mock">{title}: {value}</div>
    ),
}));


describe('Dashboard Component', () => {
  it('deve renderizar o status como "Conectado" quando isConnected é true', () => {
    mockUseRealtimeData.mockReturnValue({
      isConnected: true,
      data: [{ timestamp: 1, valueA: 10, valueB: 20, count: 1, metricC: 5 }],
    });
    render(<Dashboard />);
    expect(screen.getByText(/🟢 Conectado/i)).toBeInTheDocument();
  });

  it('deve renderizar o status como "Desconectado" quando isConnected é false', () => {
    mockUseRealtimeData.mockReturnValue({
      isConnected: false,
      data: [],
    });
    render(<Dashboard />);
    expect(screen.getByText(/🔴 Desconectado/i)).toBeInTheDocument();
  });
  
  it('deve renderizar os componentes filhos (Gráfico e Cards)', () => {
      mockUseRealtimeData.mockReturnValue({
          isConnected: true,
          data: [{ timestamp: 1, valueA: 10, valueB: 20, count: 1, metricC: 5 }],
      });
      render(<Dashboard />);
      expect(screen.getByTestId('chart-mock')).toBeInTheDocument();
      expect(screen.getByText(/Métrica A \(Valor Atual\)/i)).toBeInTheDocument();
  });
});