const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, 'build', 'web-desktop');
const mime = {
    '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json',
    '.css': 'text/css', '.bin': 'application/octet-stream', '.ico': 'image/x-icon',
    '.png': 'image/png', '.wasm': 'application/wasm',
};
http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/index.html';
    const f = path.join(root, p);
    fs.readFile(f, (e, d) => {
        if (e) {
            res.writeHead(404); res.end('404'); return;
        }
        res.writeHead(200, {
            'Content-Type': mime[path.extname(f)] || 'application/octet-stream',
            'Cache-Control': 'no-store',
        });
        res.end(d);
    });
}).listen(8899, () => console.log('listening 8899'));
