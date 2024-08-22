const net = require('net');

async function sendStringToServer(message) {
    const serverHost = '127.0.0.1';
    const serverPort = 5556;

    return new Promise((resolve, reject) => {
        const client = new net.Socket();

        client.connect(serverPort, serverHost, () => {
            console.log('Connected to server');
            client.write(message);
        });

        client.on('data', (data) => {
            const received = String.fromCharCode(...data);
            client.destroy(); // Close the connection after receiving data
            resolve(received);
        });

        client.on('close', () => {
            console.log('Connection closed');
        });

        client.on('error', (err) => {
            console.error('Error:', err);
            reject(err);
        });
    });
}

module.exports = { sendStringToServer };
