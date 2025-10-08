import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);

// Variáveis para simular séries temporais (mantendo o estado)
let lastValueA = 100.0;
let lastValueB = 250.0;
let counter = 0; 

// A porta do seu Vite (Front-end) - Padrão 5173
const CLIENT_URL = 'http://localhost:5173'; 
const PORT = 3001;

// 1. Configurar o Socket.IO com CORS
const io = new Server(httpServer, {
    cors: {
        origin: CLIENT_URL,
        // É sempre bom restringir os métodos, mesmo em ambientes de desenvolvimento
        methods: ["GET", "POST"] 
    }
});

// Função para gerar dados simulados com flutuação
function generateMockData() {
    counter += 1;
    
    // Pequena flutuação aleatória para simular dados em série temporal
    const fluctuationA = (Math.random() - 0.5) * 5; 
    const fluctuationB = (Math.random() - 0.5) * 10; 
    
    lastValueA = Math.max(0, lastValueA + fluctuationA); 
    lastValueB = Math.max(0, lastValueB + fluctuationB);

    return {
        timestamp: Date.now(),
        valueA: parseFloat(lastValueA.toFixed(2)),
        valueB: parseFloat(lastValueB.toFixed(2)),
        count: counter,
        metricC: Math.floor(Math.random() * 5) + 10 
    };
}

// 2. Lógica de Conexão e Emissão de Dados
io.on('connection', (socket) => {
    console.log(`[Socket.IO] Usuário conectado: ${socket.id}`);

    // Inicia o envio de dados apenas para este cliente
    const dataInterval = setInterval(() => {
        const data = generateMockData();
        
        // Emite o evento 'realtime_update'
        socket.emit('realtime_update', data);
        console.log(`[Socket.IO] Dados enviados (Contador: ${data.count})`);
    }, 2000); // Envia a cada 2 segundos

    // Lida com a desconexão do cliente
    socket.on('disconnect', () => {
        console.log(`[Socket.IO] Usuário desconectado: ${socket.id}`);
        clearInterval(dataInterval); // Essencial para evitar vazamento de memória
    });
});

// 3. Iniciar o Servidor
httpServer.listen(PORT, () => {
    console.log(`
------------------------------------------------
🔥 Servidor de Dados Rodando em: http://localhost:${PORT}
✅ CORS Permitido para o Front-end em: ${CLIENT_URL}
------------------------------------------------
    `);
});