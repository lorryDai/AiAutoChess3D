@echo off
setlocal
title AutoChess3D - Web Player
set "PORT=8899"
set "ROOT=%~dp0"
cd /d "%ROOT%build\web-desktop"

if not exist "index.html" (
    echo [ERROR] build\web-desktop\index.html not found. Please build the web package first.
    pause
    exit /b 1
)

where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js not found. A local static server is required to run the web build.
    pause
    exit /b 1
)

netstat -ano | findstr /r /c:":%PORT% .*LISTENING" >nul
if not errorlevel 1 (
    echo [INFO] Port %PORT% is already in use, opening browser directly.
    start "" "http://127.0.0.1:%PORT%/index.html"
    exit /b 0
)

set "TMPJS=%TEMP%\autochess3d_server.js"
> "%TMPJS%" echo const http=require('http'),fs=require('fs'),path=require('path');
>> "%TMPJS%" echo const root=process.argv[2],port=Number(process.argv[3]);
>> "%TMPJS%" echo const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon','.wasm':'application/wasm','.bin':'application/octet-stream','.mp3':'audio/mpeg','.ttf':'font/ttf','.svg':'image/svg+xml','.webp':'image/webp'};
>> "%TMPJS%" echo http.createServer(function(req,res){var u=decodeURIComponent(req.url.split('?')[0]);if(u==='/')u='/index.html';var f=path.join(root,u);fs.readFile(f,function(e,d){if(e){res.writeHead(404);res.end('404');return;}var t=mime[path.extname(f).toLowerCase()];if(!t)t='application/octet-stream';res.writeHead(200,{'Content-Type':t,'Cache-Control':'no-store'});res.end(d);});}).listen(port,'127.0.0.1',function(){console.log('Serving: http://127.0.0.1:'+port+'/');});

echo [INFO] Starting local server at http://127.0.0.1:%PORT%/ ...
echo [INFO] Close this window to stop the server.
start "" /min cmd /c "timeout /t 2 >nul & start http://127.0.0.1:%PORT%/index.html"
node "%TMPJS%" "%CD%" %PORT%
echo.
echo [INFO] Server stopped.
pause
