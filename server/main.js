const server = require('http').createServer();
const io = require('socket.io')(server);
const roomContainer = require('./roomContainer');
io.on('connection', client => {
	client.emit('currentStatus', roomContainer.getStatus());
	roomContainer.addSocket(client);
	client.on('data2', function (data) { 
		console.log("data");
		roomContainer.add(data);
	});
	client.on('disconnect', () => { 
		roomContainer.removeSocket(client.id);
	});
	client.on('error', () => {
		console.log("client error");
	})
});
server.listen(3000);