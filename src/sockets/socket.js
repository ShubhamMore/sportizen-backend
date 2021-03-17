class Sockets {
  static sockets = {};

  constructor(userId, socket) {
    Sockets.sockets[userId] = socket;
  }

  static setSocket(userId, socket) {
    Sockets.sockets[userId] = socket;
  }

  static getSocket(userId) {
    return Sockets.sockets[userId];
  }

  static deleteSocket(userId) {
    Sockets.sockets[userId] = null;
  }
}

module.exports = Sockets;
