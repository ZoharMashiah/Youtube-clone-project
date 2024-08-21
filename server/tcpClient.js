const net = require('net');

function sendStringToServer(message) {
    const serverHost = '127.0.0.1';
    const serverPort = 5555;

    const client = new net.Socket();
    let recived = '';

    client.connect(serverPort, serverHost, () => {
        console.log('Connected to server');
        console.log('Sending:', message);
        client.write(message);
    });

    client.on('data', (data) => {
        recived = String.fromCharCode(...data);
        client.destroy();
    });

    client.on('close', () => {
        console.log('Connection closed');
    });

    client.on('error', (err) => {
        console.error('Error:', err);
    });

    return recived;
}

module.exports = {sendStringToServer};