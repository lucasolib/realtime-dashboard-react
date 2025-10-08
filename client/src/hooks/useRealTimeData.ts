import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import type { RealtimeData } from '../types/data';

// URL do nosso servidor Node.js/Socket.IO
const SOCKET_URL = 'http://localhost:3001';

export const useRealtimeData = () => {
  // Onde armazenaremos o histórico de dados
  const [data, setData] = useState<RealtimeData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    // 1. Inicializa a conexão
    // Nota: O Socket.IO tentará se reconectar automaticamente em caso de falha.
    const socket: Socket = io(SOCKET_URL);

    // 2. Ouvir eventos de status
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Front-end conectado ao servidor Socket.IO.');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Front-end desconectado.');
    });

    // 3. Ouvir o evento de atualização de dados (Nome do evento: 'realtime_update')
    socket.on('realtime_update', (newData: RealtimeData) => {
      // Adiciona o novo ponto e limita o array para manter o desempenho (ex: 50 pontos)
      setData(prevData => [...prevData, newData].slice(-50));
    });

    // 4. Cleanup: Desconectar ao desmontar/recarregar
    return () => {
      socket.disconnect();
    };
  }, []); 

  return { data, isConnected };
};