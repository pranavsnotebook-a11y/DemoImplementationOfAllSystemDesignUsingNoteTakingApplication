import { createServer } from 'http';
import { createHash } from 'crypto';
import { Buffer } from 'node:buffer';
import {handleHttpRequest} from './httpHandler.js';

const PORT = 1337;

const server = createServer((req, res) => {
    handleHttpRequest(req, res);
}).listen(PORT, () => console.log('server listening to', PORT));

// Keep track of all connected clients
const clients = new Set();

server.on('upgrade', (req, socket) => {
    const magic = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

    const acceptKey = createHash('sha1')
        .update(req.headers['sec-websocket-key'] + magic)
        .digest('base64');

    const headers = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        `Sec-WebSocket-Accept: ${acceptKey}`,
        '',
        ''
    ].join('\r\n');

    socket.write(headers);

    // Add client to the set
    clients.add(socket);

    socket.on('error', (err) => {
        console.log('Socket error:', err.message);
        clients.delete(socket);
    });

    socket.on('close', () => {
        clients.delete(socket);
    });

    socket.on('data', (chunk) => {
        const secondByte = chunk[1];
        const isMasked = (secondByte >> 7) & 1;
        let length = secondByte & 127;
        let offset = 2;

        // ✅ handle extended payload length
        if (length === 126) {
            length = chunk.readUInt16BE(offset);
            offset += 2;
        } else if (length === 127) {
            length = Number(chunk.readBigUInt64BE(offset));
            offset += 8;
        }

        // ✅ extract mask
        const mask = chunk.slice(offset, offset + 4);
        offset += 4;

        // ✅ extract payload
        const payload = chunk.slice(offset, offset + length);

        // ✅ unmask
        const decoded = payload.map((byte, i) => byte ^ mask[i % 4]);

        const message = Buffer.from(decoded).toString();

        console.log('RECEIVED:', message);

        // ✅ broadcast to all clients except sender
        broadcast(message, socket);
    });
});


// ✅ correct WebSocket sender
function sendToClient(socket, data) {
    const payload = Buffer.from(data);
    const length = payload.length;

    let header;

    if (length < 126) {
        header = Buffer.from([0x81, length]);
    } else if (length < 65536) {
        header = Buffer.alloc(4);
        header[0] = 0x81;
        header[1] = 126;
        header.writeUInt16BE(length, 2);
    } else {
        header = Buffer.alloc(10);
        header[0] = 0x81;
        header[1] = 127;
        header.writeBigUInt64BE(BigInt(length), 2);
    }

    const frame = Buffer.concat([header, payload]);
    socket.write(frame);
}

// Broadcast message to all connected clients
function broadcast(message, sender) {
    for (const client of clients) {
        if (client !== sender) {
            sendToClient(client, message);
        }
    }
}