const Room = require('../Database Entries/Room');

const userJoined = (obj) => {
  const { roomCode, user } = obj;
  const room = Room.findRoom(roomCode);
  if(!room) {
      socket.emit('error');
      return;
  }
  socket.join(`room-${roomCode}`);
  console.log(`${user} joined room-${roomCode}`);
  room.players.push({ user: user, id: socket.id });
  io.to(`room-${roomCode}`).emit('new-join', { user: user });
  if(room.players.length === 1) {
      const scramble = generateScramble();
      io.to(`room-${roomCode}`).emit('new-scramble', scramble);
      room.interval = setInterval(() => {
          const results = room.lastRoundResults;
          io.to(`room-${roomCode}`).emit('round-over', results);
          setTimeout(() => {
              const scramble = generateScramble();
              io.to(`room-${roomCode}`).emit('new-scramble', scramble);
          }, (Number)(room.rules.betweenDuration) * 1000);
      }, (Number)(room.rules.roundDuration) * 1000 + (Number)(room.rules.betweenDuration) * 1000);
  }
};

const timeSubmit = (obj) => {
  const { time, user, roomCode} = obj;
  const room = Room.findRoom(roomCode);
  room.lastRoundResults.push({
      time: time,
      user: user
  });
  room.lastRoundResults.sort((a, b) => a.time - b.time);
  io.to(`room-${roomCode}`).emit('new-time-submitted', room.lastRoundResults);
};

const handleDisconnect = async () => {
  const id = socket.id;
  Room.rooms.forEach(room => {
      room.players = room.players.filter(player => player.id !== id);
      if(room.players.length === 0) {
          setTimeout(() => {
              if(room.players.length === 0) {
                  clearInterval(room.interval);
                  Room.rooms = Room.rooms.filter(room => room.length > 0);
              }
          }, 5000);
      }
  });
  io.emit('update-users');
};

module.exports = { userJoined, timeSubmit, handleDisconnect};