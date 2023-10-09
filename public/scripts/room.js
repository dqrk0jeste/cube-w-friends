document.getElementById('submit-button')
  .addEventListener('click', async (e) => {
    user = await getCurrentUser();
    socket.emit('time-submit', {
      time: time,
      user: user,
      roomCode: roomCode
    });
  });

document.getElementById('users-tab')
  .addEventListener('click', (e) => {
    document.getElementById('users-modal').classList.toggle('open');
  });

document.getElementById('close-users-modal-button')
  .addEventListener('click', (e) => {
    document.getElementById('users-modal').classList.toggle('open');
  });

document.getElementById('times-tab')
  .addEventListener('click', (e) => {
    document.getElementById('times-modal').classList.toggle('open');
  });

document.getElementById('close-times-modal-button')
  .addEventListener('click', (e) => {
    document.getElementById('times-modal').classList.toggle('open');
  });

document.getElementById('my-times-button')
  .addEventListener('click', (e) => {
    document.getElementById('my-times-modal').classList.toggle('open');
  });

document.getElementById('my-times-button-in-times')
  .addEventListener('click', (e) => {
    document.getElementById('my-times-modal').classList.toggle('open');
  });


document.getElementById('close-my-times-modal-button')
  .addEventListener('click', (e) => {
    document.getElementById('my-times-modal').classList.toggle('open');
  });

const dnfButton = document.getElementById('dnf-button');
const plusTwoButton = document.getElementById('plus-two-button');

let dnf = false;
let plusTwo = false;

dnfButton.addEventListener('click', (e) => {
    dnfButton.classList.toggle('button-clicked');
    dnf = !dnf;
  });

plusTwoButton.addEventListener('click', (e) => {
  plusTwoButton.classList.toggle('button-clicked');
  plusTwo = !plusTwo;
});

const loadRoomData = async (roomCode) => {
  const res = await fetch(`/room-info/${roomCode}`)
  const data = await res.json();
  return data;
}

const getCurrentUser = async () => {
  const res = await fetch('/current-user');
  const data = await res.json();
  return data.user;
}

const loadUsersModal = (players) => {
  const usersModal = document.getElementById('users-modal-body');

  usersModal.innerHTML = '';

  players.forEach(player => {
    const newLine = document.createElement('p');
    newLine.innerHTML = player.user;
    usersModal.append(newLine);
  });
};

const loadRoomAndConfigureSockets = async () => {
  const roomInfo = await loadRoomData(roomCode);

  const { players } = roomInfo;
  loadUsersModal(players);
  socketHandler(roomInfo);
};

loadRoomAndConfigureSockets();



