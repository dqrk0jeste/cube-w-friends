const router = require('express').Router();
const Room = require('../Database Entries/Room');

router.post('/:roomCode', (req, res) => {
  const roomCode = (Number)(req.params.roomCode);
  const user = req.body.user;
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
    res.send('../views/room.html');
  } else {
    res.redirect(`/joinRoom/${roomCode}`);
  }
});

module.exports = router;