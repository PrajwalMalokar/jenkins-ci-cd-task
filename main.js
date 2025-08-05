const http = require('http');
const url = require('url');

const appName = "My JS App";
const version = "1.0.0";
const PORT = 3000;
function getWelcomePage() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${appName}</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                color: white;
            }
            .container {
                text-align: center;
                background: rgba(255, 255, 255, 0.1);
                padding: 3rem;
                border-radius: 20px;
                backdrop-filter: blur(10px);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                max-width: 600px;
            }
            h1 {
                font-size: 3rem;
                margin-bottom: 1rem;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            }
            p {
                font-size: 1.2rem;
                margin-bottom: 1rem;
                opacity: 0.9;
            }
            .info {
                margin-top: 2rem;
                padding: 1rem;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
            }
            .routes {
                margin-top: 2rem;
                text-align: left;
            }
            .route {
                background: rgba(255, 255, 255, 0.1);
                padding: 0.5rem;
                margin: 0.5rem 0;
                border-radius: 5px;
                font-family: monospace;
            }
            a {
                color: #ffd700;
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 Welcome to ${appName}!</h1>
            <p>My JavaScript web server is up and running!</p>

            <div class="info">
                <p><strong>Version:</strong> ${version}</p>
                <p><strong>Server Time:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Port:</strong> ${PORT}</p>
            </div>
            
            <div class="routes">
                <h3>Available Routes:</h3>
                <div class="route"><a href="/">/ - Welcome Page</a></div>
                <div class="route"><a href="/about">/ about - About Page</a></div>
                <div class="route"><a href="/api/time">/ api/time - Current Time API</a></div>
                <div class="route"><a href="/api/status">/ api/status - Server Status API</a></div>
            </div>
        </div>
    </body>
    </html>
    `;
}

function getAboutPage() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>About - ${appName}</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                color: white;
            }
            .container {
                text-align: center;
                background: rgba(255, 255, 255, 0.1);
                padding: 3rem;
                border-radius: 20px;
                backdrop-filter: blur(10px);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                max-width: 600px;
            }
            h1 {
                font-size: 2.5rem;
                margin-bottom: 1rem;
            }
            p {
                font-size: 1.1rem;
                margin-bottom: 1rem;
                line-height: 1.6;
            }
            a {
                color: #ffd700;
                text-decoration: none;
                font-weight: bold;
            }
            a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>📖 About ${appName}</h1>
            <p>This is a simple Node.js web server built with the built-in HTTP module.</p>
            <p>It demonstrates basic routing, HTML templating, and server setup.</p>
            <p>Created with ❤️ using JavaScript and Node.js</p>
            <p><a href="/">← Back to Home</a></p>
        </div>
    </body>
    </html>
    `;
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    switch (path) {
        case '/':
            res.statusCode = 200;
            res.end(getWelcomePage());
            break;

        case '/about':
            res.statusCode = 200;
            res.end(getAboutPage());
            break;

        case '/api/time':
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({
                timestamp: new Date().toISOString(),
                localTime: new Date().toLocaleString(),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            }));
            break;

        case '/api/status':
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({
                status: 'running',
                appName: appName,
                version: version,
                uptime: process.uptime(),
                port: PORT,
                nodeVersion: process.version
            }));
            break;

        default:
            res.statusCode = 404;
            res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>404 - Page Not Found</title>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            text-align: center; 
                            padding: 50px;
                            background: #f0f0f0;
                        }
                        h1 { color: #e74c3c; }
                        a { color: #3498db; text-decoration: none; }
                        a:hover { text-decoration: underline; }
                    </style>
                </head>
                <body>
                    <h1>404 - Page Not Found</h1>
                    <p>The page you're looking for doesn't exist.</p>
                    <p><a href="/">Go back to home</a></p>
                </body>
                </html>
            `);
            break;
    }
});

if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`🚀 ${appName} is running!`);
        console.log(`📍 Server URL: http://localhost:${PORT}`);
        console.log(`📊 Version: ${version}`);
        console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
        console.log('\n📋 Available routes:');
        console.log(`   • http://localhost:${PORT}/`);
        console.log(`   • http://localhost:${PORT}/about`);
        console.log(`   • http://localhost:${PORT}/api/time`);
        console.log(`   • http://localhost:${PORT}/api/status`);
        console.log('\n💡 Press Ctrl+C to stop the server');
    });
}
module.exports = server;

process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    server.close(() => {
        console.log('✅ Server closed successfully');
        process.exit(0);
    });
});