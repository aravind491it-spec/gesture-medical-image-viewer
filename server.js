import { Server, OPEN } from 'ws';

const wss = new Server({ port: 8080 });

wss.on('connection', function connection(ws) {

    ws.on('message', function message(data) {

        wss.clients.forEach(function each(client) {
            if (client.readyState === OPEN) {
                client.send(data.toString());
            }
        });

    });

});

console.log("WiFi Server running on port 8080");