const addListeners = () => {
  submitButton
  .addEventListener('click', async (e) => {
    user = await getCurrentUser();
    if(dnfPenalty) {
      socket.emit('time-submit', {
        user: user,
        time: 'DNF',
        roomCode: roomCode
      });
      timesList.push('DNF');
    } else {
      socket.emit('time-submit', {
        time: time + plusTwoPenalty,
        user: user,
        roomCode: roomCode
      });
      timesList.push(time + plusTwoPenalty);
    }
    timeSubmitted = true;
    submitModal.classList.remove('open');
    displayLocalInfo();
  });

plusTwoButton
  .addEventListener('click', () => {
    if(plusTwoPenalty) {
      plusTwoPenalty = 0;
    } else {
      plusTwoPenalty = 2000;
    }
    plusTwoButton.classList.toggle('button-clicked');
    submitTime.innerHTML = formatTime(time + plusTwoPenalty);
  });

dnfButton
  .addEventListener('click', () => {
    dnfPenalty = !dnfPenalty;
    dnfButton.classList.toggle('button-clicked');
    submitTime.innerHTML = dnfPenalty ? 'DNF' : formatTime(time + plusTwoPenalty);
  });

document.getElementById('users-tab')
  .addEventListener('click', (e) => {
    document.getElementById('users-modal').classList.toggle('open');
  });

document.getElementById('users-tab')
  .addEventListener('touchstart', (e) => {
    e.stopPropagation();
  });

document.getElementById('users-tab')
  .addEventListener('touchend', (e) => {
    e.stopPropagation();
  });

document.getElementById('close-users-modal-button')
  .addEventListener('click', (e) => {
    document.getElementById('users-modal').classList.toggle('open');
  });

document.getElementById('times-tab')
  .addEventListener('click', (e) => {
    document.getElementById('times-modal').classList.toggle('open');
  });

document.getElementById('times-tab')
  .addEventListener('touchstart', (e) => {
    e.stopPropagation();
  });

document.getElementById('times-tab')
  .addEventListener('touchend', (e) => {
    e.stopPropagation();
  });

document.getElementById('close-times-modal-button')
  .addEventListener('click', (e) => {
    document.getElementById('times-modal').classList.toggle('open');
  });

document.getElementById('my-times-button')
  .addEventListener('click', (e) => {
    document.getElementById('my-times-modal').classList.toggle('open');
  });

document.getElementById('my-times-button')
  .addEventListener('touchstart', (e) => {
    e.stopPropagation();
  });

document.getElementById('my-times-button')
  .addEventListener('touchend', (e) => {
    e.stopPropagation();
  });

document.getElementById('my-times-button-in-times')
  .addEventListener('click', (e) => {
    document.getElementById('my-times-modal').classList.toggle('open');
  });

document.getElementById('my-times-button-in-times')
  .addEventListener('touchstart', (e) => {
    e.stopPropagation();
  });

document.getElementById('my-times-button-in-times')
  .addEventListener('touchend', (e) => {
    e.stopPropagation();
  });

document.getElementById('close-my-times-modal-button')
  .addEventListener('click', (e) => {
    document.getElementById('my-times-modal').classList.toggle('open');
  });

document.getElementById('times-modal')
  .addEventListener('touchstart', e => {
    e.stopPropagation();
  });

document.getElementById('times-modal')
  .addEventListener('touchend', e => {
    e.stopPropagation();
  });

  document.getElementById('users-modal')
  .addEventListener('touchstart', e => {
    e.stopPropagation();
  });

  document.getElementById('users-modal')
  .addEventListener('touchend', e => {
    e.stopPropagation();
  });

  document.getElementById('my-times-modal')
  .addEventListener('touchstart', e => {
    e.stopPropagation();
  });

  document.getElementById('my-times-modal')
  .addEventListener('touchend', e => {
    e.stopPropagation();
  });
}

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

addListeners();
loadRoomAndConfigureSockets();



