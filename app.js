import { createServer } from 'http';
// import { createServer } from 'https';
import { readFileSync } from 'fs';

import { WebSocketServer } from 'ws';

const server = createServer({
    // cert: readFileSync('/path/to/cert.pem'),
    // key: readFileSync('/path/to/key.pem'),
});
const wss = new WebSocketServer({
    server,
});

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', function message(data) {
        ws.clients.forEach(client => {
            client.send(data);
        });
    });
});

server.listen(8080);
