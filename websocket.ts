import express from 'express';
import http from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*'
  }
});

app.get('/', (req: any, res: any) => {
    res.send('Socket running')
})

io.on('connection', (socket: Socket) => {
  console.log('Cliente WebSocket conectado');

  socket.on('apiEvent', (data) => {
    console.log(data);
    io.emit('apiEvent', data);
  });

  socket.on('disconnect', () => {
    console.log('Cliente WebSocket desconectado');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor WebSocket escuchando en el puerto ${PORT}`);
});