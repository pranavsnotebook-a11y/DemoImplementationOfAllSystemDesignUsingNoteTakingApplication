import { promises as fs } from 'fs';
import path from 'path';

export async function handleHttpRequest(req, res) {
    let filePath = './public' + req.url;
    if (req.url === '/') {
        filePath = './public/index.html';
    } else if (req.url.startsWith('/src/')) {
        filePath = '.' + req.url;
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }

    try {
        const content = await fs.readFile(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(500);
            res.end('Server error: ' + error.code);
        }
    }
}