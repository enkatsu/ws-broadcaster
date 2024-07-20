require('dotenv').config()
const isHttps = process.env.HTTPS === 'true'
const createServer = isHttps ? require('https').createServer : require('http').createServer
const readFileSync = require('fs').readFileSync
const WebSocketServer = require('ws').WebSocketServer

const serverOption = isHttps ? {
    cert: readFileSync(process.env.CERT_PEM, 'utf8'),
    ca: readFileSync(process.env.CA_PEM, 'utf8'),
    key: readFileSync(process.env.KEY_PEM, 'utf8'),
} : { }

const server = createServer(serverOption)
const wss = new WebSocketServer({ server })

wss.on('connection', function connection(ws) {
    console.log(`client count: ${wss.clients.size}`)
    ws.on('error', console.error)
    ws.on('message', function message(data) {
        console.log(data.toString('UTF-8'))
        wss.clients.forEach(client => {
            client.send(data.toString('UTF-8'))
        })
    })
})

server.listen(Number(process.env.PORT))
