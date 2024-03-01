const http = require("http");

const server = http.createServer();

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("Se ha conectado un cliente");

  socket.on('subscribeToApi', () => {
    console.log('APIIII conectado');
    // Simplemente llamamos al método de la API hexagonal que devuelve los datos
    const jsonData = apiHexagonal.getData();
    socket.emit('apiData', jsonData);
  });

  // Suscripción para que un cliente en el frontend escuche eventos de la API hexagonal
  socket.on('subscribeToApiEvents', () => {
    // Escuchamos eventos de la API hexagonal y los emitimos al cliente en el frontend
    apiHexagonal.on('newData', (data) => {
      socket.emit('newData', data);
    });
  });

  socket.on("disconnect", () => {
    console.log("Cliente de Socket.IO desconectado");
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Servidor esta escuchando en el puerto ${PORT}`);
});

io.on("disconnet", (socket) => {
  console.log("Desconectado", socket);
});
