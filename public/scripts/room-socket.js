const socketHandler = async () => {
  const roomCode = (Number)(location.pathname.substring(11));
  const currentUser = await getCurrentUser();
  const socket = io();
  socket.emit('user-join', {
    user: currentUser,
    roomCode: roomCode
  });

  const usersModal = document.getElementById('users-modal-body');
  const timesModal = document.getElementById('times-modal-body');

  socket.on('new-join', data =>{
    const newLine = document.createElement('p');
    newLine.innerHTML = data.user;
    usersModal.append(newLine);
  });
  socket.on('update-users', async () => {
    const roomData = await loadRoomData(roomCode);
    loadUsersModal(roomData.players);
  });
  socket.on('new-scramble', scramble => {
    console.log(scramble);
  });
  socket.on('error', () => {
    location.replace('/error404');
  });
};

socketHandler();

