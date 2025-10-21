import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
let lastValueA = 100.0;
let lastValueB = 250.0;
let counter = 0; 

const CLIENT_URL = 'http://localhost:5173'; 
const PORT = 3001;

const io = new Server(httpServer, {
    cors: {
        origin: CLIENT_URL,
        methods: ["GET", "POST"] 
    }
});

function generateMockData() {
    counter += 1;
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

io.on('connection', (socket) => {
    console.log(`[Socket.IO] Usuário conectado: ${socket.id}`);
    const dataInterval = setInterval(() => {
        const data = generateMockData();
        socket.emit('realtime_update', data);
        console.log(`[Socket.IO] Dados enviados (Contador: ${data.count})`);
    }, 2000);
    socket.on('disconnect', () => {
        console.log(`[Socket.IO] Usuário desconectado: ${socket.id}`);
        clearInterval(dataInterval);
    });
});

httpServer.listen(PORT, () => {
    console.log(`
------------------------------------------------
🔥 Servidor de Dados Rodando em: http://localhost:${PORT}
✅ CORS Permitido para o Front-end em: ${CLIENT_URL}
------------------------------------------------
    `);
});