require('dotenv').config()
const isHttps = process.env.HTTPS === 'true'
const createServer = isHttps ? require('https').createServer : require('http').createServer
const readFileSync = require('fs').readFileSync
const WebSocketServer = require('ws').WebSocketServer

const serverOption = isHttps ? {
    cert: readFileSync('/path/to/cert.pem'),
    key: readFileSync('/path/to/key.pem'),
} : {
}

const server = createServer(serverOption)
const wss = new WebSocketServer({ server })

wss.on('connection', function connection(ws) {
    ws.on('error', console.error)
    ws.on('message', function message(data) {
        console.log(data.toString('UTF-8'))
        wss.clients.forEach(client => {
            client.send(data.toString('UTF-8'))
        })
    })
})

server.listen(Number(process.env.PORT))
