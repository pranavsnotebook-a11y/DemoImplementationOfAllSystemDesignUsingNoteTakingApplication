import {createServer} from 'http'
import {createHash} from 'crypto'
const PORT = 1337

const server=createServer((request , response )=>{
    response.writeHead(200)
    response.end('hey there')


})
.listen(1337, ()=> console.log('server listening to ',PORT));

// [
//     "uncaughtException",
//     "unhandledRejection",
 
// ].forEach(event=>
//     process.on(event,(err)=>{
//         console.error(`something bad haooened ! events:${event},msg:${err.stack||err} `)
//     })

    
// )
server.on('upgrade',(req , socket,head)=>{
    const magicstring='258EAFA5-E914-47DA-95CA-C5AB0DC85B11'

    console.log({

        head: req.headers["sec-websocket-key"]
    });
    const acceptKey = createHash('sha1')
        .update(req.headers["sec-websocket-key"] + magicstring)
        .digest('base64');

    const headers=[
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        `Sec-WebSocket-Accept: ${acceptKey}`,
        ''
    ].map(line=>line.concat('\r\n')).join('')
    socket.write(headers)

})
