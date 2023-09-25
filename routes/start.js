const router = require('express').Router();
const Room = require('../Database Entries/Room');
const path = require('path');

// router.post('/:roomCode', (req, res) => {
//   const roomCode = (Number)(req.params.roomCode);
//   const user = req.body.user;
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
//     res.send('../views/room.html');
//   } else {
//     res.redirect(`/joinRoom/${roomCode}`);
//   }
// });

router.get('/',(req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'views', 'start.html'));
});

router.use('/create-room', require('./createRoom'));

router.use('/joinRoom', require('./joinRoom'));

module.exports = router;