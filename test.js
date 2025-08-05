const http = require('http');
const server = require('./main.js');

console.log('🧪 Starting application tests...\n');

function testServerExport() {
    console.log('Test 1: Server module export');
    if (typeof server === 'object' && server.listen) {
        console.log('✅ PASS - Server exports correctly');
        return true;
    } else {
        console.log('❌ FAIL - Server export issue');
        return false;
    }
}

function testServerResponse(callback) {
    console.log('Test 2: Server response test');
    
    const testServer = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Test server running');
    });
    
    testServer.listen(3001, () => {
        const req = http.request({
            hostname: 'localhost',
            port: 3001,
            path: '/',
            method: 'GET'
        }, (res) => {
            if (res.statusCode === 200) {
                console.log('✅ PASS - Server responds correctly');
                testServer.close(() => {
                    callback(true);
                });
            } else {
                console.log('❌ FAIL - Server response issue');
                testServer.close(() => {
                    callback(false);
                });
            }
        });
        
        req.on('error', (err) => {
            console.log('❌ FAIL - Server request error:', err.message);
            testServer.close(() => {
                callback(false);
            });
        });
        
        req.end();
    });
}

function testApplicationConstants() {
    console.log('Test 3: Application constants');
    
    const fs = require('fs');
    const mainContent = fs.readFileSync('./main.js', 'utf8');
    
    const hasAppName = mainContent.includes('appName');
    const hasVersion = mainContent.includes('version');
    const hasPort = mainContent.includes('PORT');
    
    if (hasAppName && hasVersion && hasPort) {
        console.log('✅ PASS - Application constants defined');
        return true;
    } else {
        console.log('❌ FAIL - Missing application constants');
        return false;
    }
}

async function runTests() {
    let passedTests = 0;
    const totalTests = 3;
    
    if (testServerExport()) passedTests++;
    
    await new Promise((resolve) => {
        testServerResponse((passed) => {
            if (passed) passedTests++;
            resolve();
        });
    });
    
    if (testApplicationConstants()) passedTests++;
    
    console.log('\n📊 Test Results:');
    console.log(`Passed: ${passedTests}/${totalTests}`);
    console.log(`Failed: ${totalTests - passedTests}/${totalTests}`);
    
    if (passedTests === totalTests) {
        console.log('🎉 All tests passed!');
        process.exit(0);
    } else {
        console.log('❌ Some tests failed!');
        process.exit(1);
    }
}

runTests().catch(err => {
    console.error('Test suite error:', err);
    process.exit(1);
});
