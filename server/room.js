var Log = require('./log');
module.exports = function (name, log) {
    this.add = function (log) {
        this.log.push(new Log(log));
    }
    this.name = name;
    this.log = [];
    this.add(log);

    this.getStatus = function () {
        return { RoomName: this.name, log: this.log };
    }
}