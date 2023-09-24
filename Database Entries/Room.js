const { random } = require("../util");

class Room {
  static rooms = [];
  players = [];
  constructor(obj) {
    this.roomName = obj.roomName;
    this.rules = obj.rules;
    this.admin = obj.admin;
    this.players.push(obj.admin);
    let code = random(1000000);
    while(!codeAvailable(code)) {
      code = random(1000000);
    }
    this.roomCode = code;
    Room.rooms.push(this);
  }
}

const codeAvailable = (code) => {
  Room.rooms.forEach((room) => {
    if(room.roomCode === code) {
      return false;
    }
  });
  return true;
};

module.exports = Room;
