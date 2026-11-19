import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const contentTypes = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.webp': 'image/webp' };
const server = http.createServer(async (request, response) => {
    try {
        const url = new URL(request.url, 'http://localhost');
        const filePath = path.resolve(root, `.${decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname)}`);
        if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
            response.writeHead(403).end('Forbidden');
            return;
        }
        const content = await fs.readFile(filePath);
        response.writeHead(200, { 'Content-Type': contentTypes[path.extname(filePath)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
        response.end(content);
    } catch {
        response.writeHead(404).end('Not found');
    }
});
const port = Number(process.argv[2]) || 4173;
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
