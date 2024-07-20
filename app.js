require('dotenv').config()
const createServer = require('http').createServer
const WebSocketServer = require('ws').WebSocketServer

const serverOption = { }
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
    ws.on('close', function () {
        console.log(`client count: ${wss.clients.size}`)
    })
})

server.listen(Number(process.env.PORT))
