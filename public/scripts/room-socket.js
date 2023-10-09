let roundFinished = false;
const roomCode = (Number)(location.pathname.substring(11));
const socket = io();
const socketHandler = async (roomInfo) => {
  const roomCode = (Number)(location.pathname.substring(11));
  const { players, rules, admin } = roomInfo;
  const currentUser = await getCurrentUser();
  socket.emit('user-join', {
    user: currentUser,
    roomCode: roomCode
  });

  const usersModal = document.getElementById('users-modal-body');
  const timesModal = document.getElementById('times-modal-body');
  const finishers = document.getElementById('finishers');
  const scrambleElement = document.getElementById('scramble');
  const winnersModal = document.getElementById('winners-modal');
  const nextRoundTimer = document.getElementById('next-round-timer');
  const resultsList = document.querySelector('#winners-modal .modal-body');

  socket.on('new-join', data => {
    const newLine = document.createElement('p');
    newLine.innerHTML = data.user;
    usersModal.append(newLine);
  });
  socket.on('update-users', async () => {
    const roomData = await loadRoomData(roomCode);
    loadUsersModal(roomData.players);
  });
  let nextRoundInterval;
  socket.on('round-over', results => {
    document.getElementById('times-modal').classList.remove('open');
    document.getElementById('users-modal').classList.remove('open');
    document.getElementById('my-times-modal').classList.remove('open');
    document.getElementById('submit-modal').classList.remove('open');
    winnersModal.style.display = 'flex';
    if(results.length === 0) {
      //bravo
    } else if(results.length === 1) {
      resultsList.innerHTML = `
        <h1>&#127942; ${results[0].user} - ${results[0].time}</h1>`
    } else if(results.length === 2) {
      resultsList.innerHTML = `
        <h1>&#127942; ${results[0].user} - ${results[0].time}</h1>
        <h2>&#129352; ${results[1].user} - ${results[1].time}</h2>`
    } else if(results.length === 3) {
      resultsList.innerHTML = `
        <h1>&#127942; ${results[0].user} - ${results[0].time}</h1>
        <h2>&#129352; ${results[1].user} - ${results[1].time}</h2>
        <h2>&#129353; ${results[2].user} - ${results[2].time}</h2>`
    } else {
      resultsList.innerHTML = `
        <h1>&#127942; ${results[0].user} - ${results[0].time}</h1>
        <h2>&#129352; ${results[1].user} - ${results[1].time}</h2>
        <h2>&#129353; ${results[2].user} - ${results[2].time}</h2>`
      for(let i = 3; i < results.length; i++) {
        const newLine = document.createElement('p');
        newLine.innerHTML = `${i + 1}. ${results[i].user} - ${results[i].time}`;
        resultsList.append(newLine);
      }
    }
    const startTime = Date.now();
    const { betweenDuration } = rules;
    nextRoundTimer.innerHTML = `Next round in ${betweenDuration}s...`;
    nextRoundInterval = setInterval(() => {
      const timeLeft = betweenDuration - Math.floor((Date.now() - startTime)/1000);
      nextRoundTimer.innerHTML = `Next round in ${timeLeft}s...`;
    }, 200);
  }); 
  socket.on('new-scramble', scramble => {
    clearInterval(nextRoundInterval);
    roundFinished = false;
    winnersModal.style.display = 'none';
    scrambleElement.innerHTML = scramble;
    timesModal.innerHTML = '';
    document.querySelectorAll('.player')
      .forEach(el => {
        el.remove();
      });
  });
  socket.on('new-time-submitted', results => {
    timesModal.innerHTML = '';
    results.forEach((result, index) => {
      const newLine = document.createElement('p');
      newLine.innerHTML = `${index + 1}. ${result.user} - ${result.time}`;
    });
    const usersTabElement = document.getElementById('users-tab');
    for(let i = 0; i < Math.min(results.length, 5); i++) {
      const newEl = document.createElement('div');
      newEl.classList.add('player');
      newEl.innerHTML = `${results[i].user} - ${results[i].time}`;
      finishers.insertBefore(newEl, usersTabElement);
    }
  });
  socket.on('error', () => {
    location.replace('/error404');
  });
};

