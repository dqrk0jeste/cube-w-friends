const { random } = require("../util");

class Room {
  static rooms = [];
  players = [];
  constructor(obj) {
    this.roomName = obj.roomName;
    this.rules = obj.rules;
    this.admin = obj.admin;
    let code = random(1000000);
    while(!codeAvailable(code)) {
      code = random(1000000);
    }
    this.roomCode = code;
    Room.rooms.push(this);
  }
  static findRoom(code) {
    for(let i = 0; i < Room.rooms.length; i++) {
      if(Room.rooms[i].roomCode === code) {
        return Room.rooms[i];
      }
    }
    return null;
  };
}

const codeAvailable = (code) => {
  if(code < 100000) {
    return false;
  }
  for(let i = 0; i < Room.rooms.length; i++) {
    if(Room.rooms[i].roomCode === code) {
      return false;
    }
  }
  return true;
};

module.exports = Room;
