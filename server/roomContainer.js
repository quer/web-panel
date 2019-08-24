var Room = require('./room');
module.exports = new function () {
    this.sockets = [];
    this.list = [];
    this.add = function (dataString) {
        var data = JSON.parse(dataString);
        if(data.room && data.log){
            var room = this.findRoom(data.room);
            if(room != null){
                room.add(data.log);
            }
            else
            {
                this.list.push(new Room(data.room, data.log));
            }
        }
        this.sendToAll(data);
    }
    this.sendToAll = function (data) {
        for (let i = 0; i < this.sockets.length; i++) {
            const socket = this.sockets[i];
            socket.emit('data', {RoomName: data.room, log: [data.log]});
        }
    }
    this.getStatus = function () {
        var list = [];
        for (let i = 0; i < this.list.length; i++) {
            const room = this.list[i];
            list.push(room.getStatus());
        }
        return list;
    }
    this.findRoom = function (name) {
        for (let i = 0; i < this.list.length; i++) {
            const room = this.list[i];
            if(room.name == name){
                return room;
            }
        }
        return null;
    }
    this.addSocket = function (socket) {
        this.sockets.push(socket);
    }
    this.removeSocket = function (id) {
        for (let i = 0; i < this.sockets.length; i++) {
            const socket = this.sockets[i];
            if(socket.id == id){
                this.sockets.splice(i, 1);
                return;
            }
        }
    }
}