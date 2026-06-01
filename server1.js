import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws, req) => {
    const clientIP = req.socket.remoteAddress;
    console.log(`New client connected: ${clientIP}`);

    ws.on('message', (data) => {
        const message = data.toString();
        console.log(`Received: ${message}`);

        // Broadcast to all OTHER clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log(`Client disconnected: ${clientIP}`);
    });

    ws.on('error', (err) => {
        console.error(`Error from ${clientIP}:`, err.message);
    });
});

console.log("🚀 WebSocket Server running on ws://localhost:8080");