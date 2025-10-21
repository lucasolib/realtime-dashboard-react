import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRealtimeData } from '../hooks/useRealTimeData';
import type { RealtimeData } from '../types/data';
import { io } from 'socket.io-client';

const mockSocket = {
  on: vi.fn(),
  emit: vi.fn(),
  disconnect: vi.fn(),
  connected: false,
};

vi.mock('socket.io-client', () => ({
  io: vi.fn(() => mockSocket),
}));


describe('useRealtimeData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSocket.connected = false;
  });

  it('deve se conectar ao Socket.IO e retornar status inicial de desconectado', () => {
    const { result } = renderHook(() => useRealtimeData());

    expect(io).toHaveBeenCalledWith('http://localhost:3001');
    expect(result.current.isConnected).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(mockSocket.on).toHaveBeenCalledWith('connect', expect.any(Function));
    expect(mockSocket.on).toHaveBeenCalledWith('disconnect', expect.any(Function));
    expect(mockSocket.on).toHaveBeenCalledWith('realtime_update', expect.any(Function));
  });

  it('deve atualizar o status para conectado quando o evento "connect" é emitido', () => {
    let connectCallback: (() => void) | undefined;
    mockSocket.on.mockImplementation((event, callback) => {
      if (event === 'connect') {
        connectCallback = callback;
      }
    });

    const { result } = renderHook(() => useRealtimeData());
    act(() => {
      if (connectCallback) connectCallback();
    });
    expect(result.current.isConnected).toBe(true);
  });

  it('deve adicionar novos dados e limitar o histórico a 50 pontos', () => {
    let updateCallback: ((data: object) => void) | undefined;
    mockSocket.on.mockImplementation((event, callback) => {
      if (event === 'realtime_update') {
        updateCallback = callback;
      }
    });
    const { result } = renderHook(() => useRealtimeData());
    const mockDataPoint: RealtimeData = { timestamp: 1, valueA: 10, valueB: 20, count: 1, metricC: 5 };
    act(() => {
      for (let i = 0; i < 51; i++) {
        if (updateCallback) updateCallback({ ...mockDataPoint, count: i + 1, timestamp: i + 1 });
      }
    });
    expect(result.current.data.length).toBe(50);
    expect(result.current.data[0].count).toBe(2);
    expect(result.current.data[49].count).toBe(51); 
  });

  it('deve desconectar o socket no unmount (cleanup)', () => {
    const { unmount } = renderHook(() => useRealtimeData());
    unmount();
    expect(mockSocket.disconnect).toHaveBeenCalledTimes(1);
  });
});