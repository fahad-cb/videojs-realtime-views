const host =  '127.0.0.1';
const port = 3000;

//connection creation
const http = require('http');
const server = http.createServer();
server.listen(port,host);
var io = require('socket.io').listen(server);


//sockets connections
io.sockets.on('connection',function(socket){

  socket.on('message',function(message){
    console.log("Socket connected");
    url = message;
    io.sockets.emit('pageview', { 'url' : url,'connections': io.engine.clientsCount, 'timestamp': new Date()});
  });

  socket.on('disconnect', function () {
    console.log("Socket disconnected");
    io.sockets.emit('pageview', { 'connections': io.engine.clientsCount});
  });
 
});
