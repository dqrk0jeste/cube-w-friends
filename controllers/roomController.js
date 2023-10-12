const path = require('path');

const Room = require('../Database Entries/Room');

const createRoom = (req, res) => {
  const roomName = req.body.roomName;
  const rules = {
    maxPlayers: (Number)(req.body.maxPlayers) || 1000,
    roundDuration: (Number)(req.body.roundDuration),
    betweenDuration: (Number)(req.body.betweenDuration)
  }
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
  res.redirect(`../join-room/${room.roomCode}`);
};

const joinRoomWRoomCode = (req, res) => {
  const user = req.user;
  const roomCode = (Number)(req.params.roomCode);
  if(!user) {
    res.sendStatus(401);
    return;
  }
  const foundRoom = Room.findRoom(roomCode);
  
  if(!foundRoom) {
    res.sendStatus(404);
    return;
  }

  if(foundRoom.rules.maxPlayers === foundRoom.players.length) {
    res.json({
      msg: 'room is full'
    });
    return;
  }

  res.sendFile(path.join(__dirname, '..', 'public', 'views', 'room.html'));
};

const getRoomInfo = (req, res) => {
  const room = Room.findRoom((Number)(req.params.roomCode));
  if(room) {
    res.json({
      players: room.players,
      roomName: room.roomName,
      rules: room.rules,
      admin: room.admin,
      roomCode: room.roomCode
    });
    return;
  }
  res.sendStatus(404);
  return;
};

module.exports = getRoomInfo;

// const joinRoom = (req, res) => {
//   const user = req.body.user;
//   const roomCode = req.body.roomCode;
//   if(!user) {
//     res.sendStatus(401);
//     return;
//   }
//   const foundRoom = Room.findRoom(roomCode);
  
//   if(!foundRoom) {
//     res.sendStatus(404);
//     return;
//   }
//   if(foundRoom.players.includes(user)) {
//     res.sendStatus(403);
//     return;
//   }
//   foundRoom.players.push(user);
//   res.status(201).json(foundRoom);
// };

module.exports = { createRoom, joinRoomWRoomCode, getRoomInfo};