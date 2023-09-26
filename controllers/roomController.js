const Room = require('../Database Entries/Room');

const createRoom = (req, res) => {
  const roomName = req.body.roomName;
  const rules = req.body.rules;
  const user = req.user;
  if(!user) {
    res.sendStatus(401);
    return;
  }
  const room = new Room({
    roomName: roomName,
    rules: rules,
    admin: user,
  });
  res.status(201).json(room);
};

const joinRoom = (req, res) => {
  const user = req.body.user;
  const roomCode = req.body.roomCode;
  if(!user) {
    res.sendStatus(401);
    return;
  }
  const foundRoom = Room.findRoom(roomCode);
  
  if(!foundRoom) {
    res.sendStatus(404);
    return;
  }
  if(foundRoom.players.includes(user)) {
    res.sendStatus(403);
    return;
  }
  foundRoom.players.push(user);
  res.status(201).json(foundRoom);
};

const joinRoomWRoomCode = (req, res) => {
  const user = req.user;
  const roomCode = (Number)(req.params.roomCode);
  if(!user) {
    res.sendStatus(401);
    return;
  }
  const foundRoom = Room.findRoom(roomCode);
  console.log(foundRoom);
  
  if(!foundRoom) {
    res.status(404);
    return;
  }
  if(foundRoom.players.includes(user)) {
    res.sendStatus(403);
    return;
  }
  foundRoom.players.push(user);
  res.status(201).json(foundRoom);
};

module.exports = { createRoom, joinRoom, joinRoomWRoomCode };