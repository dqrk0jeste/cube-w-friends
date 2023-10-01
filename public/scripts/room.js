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

const loadStartPage = async () => {
  const roomCode = (Number)(location.pathname.substring(11));
  const currentUser = await getCurrentUser();
  const roomInfo = await loadRoomData(roomCode);
  const isAdmin = (currentUser === roomInfo.admin);

  const { players, admin, rules } = roomInfo;

  loadUsersModal(players);

  
  const timesModal = document.getElementById('times-modal-body');

};

loadStartPage();



