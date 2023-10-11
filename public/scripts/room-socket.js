const socketHandler = async (roomInfo) => {
  const roomCode = (Number)(location.pathname.substring(11));
  const { players, rules, admin } = roomInfo;
  const currentUser = await getCurrentUser();
  socket.emit('user-join', {
    user: currentUser,
    roomCode: roomCode
  });

  socket.on('new-join', data => {
    const newLine = document.createElement('p');
    newLine.innerHTML = data.user;
    usersModal.append(newLine);
  });
  socket.on('update-users', async () => {
    const roomData = await loadRoomData(roomCode);
    loadUsersModal(roomData.players);
  });
  socket.on('round-over', results => {
    roundOn = false;
    clearInterval(timerId);
    document.getElementById('times-modal').classList.remove('open');
    document.getElementById('users-modal').classList.remove('open');
    document.getElementById('my-times-modal').classList.remove('open');
    document.getElementById('submit-modal').classList.remove('open');
    winnersModal.classList.add('open');
    if(results.length === 0) {
      //bravo
    } else if(results.length === 1) {
      resultsList.innerHTML = `
        <h1>&#127942; ${results[0].user} - ${formatTime(results[0].time)}</h1>`
    } else if(results.length === 2) {
      resultsList.innerHTML = `
        <h1>&#127942; ${results[0].user} - ${formatTime(results[0].time)}</h1>
        <h2>&#129352; ${results[1].user} - ${formatTime(results[1].time)}</h2>`
    } else if(results.length === 3) {
      resultsList.innerHTML = `
        <h1>&#127942; ${results[0].user} - ${formatTime(results[0].time)}</h1>
        <h2>&#129352; ${results[1].user} - ${formatTime(results[1].time)}</h2>
        <h2>&#129353; ${results[2].user} - ${formatTime(results[2].time)}</h2>`
    } else {
      resultsList.innerHTML = `
        <h1>&#127942; ${results[0].user} - ${formatTime(results[0].time)}</h1>
        <h2>&#129352; ${results[1].user} - ${formatTime(results[1].time)}</h2>
        <h2>&#129353; ${results[2].user} - ${formatTime(results[2].time)}</h2>`
      for(let i = 3; i < results.length; i++) {
        const newLine = document.createElement('p');
        newLine.innerHTML = `${i + 1}. ${results[i].user} - ${formatTime(results[i].time)}`;
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
    roundOn = true;
    timeSubmitted = false;
    plusTwoPenalty = 0;
    dnfPenalty = false;
    winnersModal.classList.remove('open');
    dnfButton.classList.remove('button-clicked');
    plusTwoButton.classList.remove('button-clicked');
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
      newLine.innerHTML = `${index + 1}. ${result.user} - ${formatTime(result.time)}`;
      timesModal.append(newLine);
    });
    document.querySelectorAll('.player')
      .forEach(el => {
        el.remove();
      });
    for(let i = 0; i < Math.min(results.length, 5); i++) {
      const newEl = document.createElement('div');
      newEl.classList.add('player');
      newEl.innerHTML = `${results[i].user} - ${formatTime(results[i].time)}`;
      finishers.insertBefore(newEl, usersTabElement);
    }
  });
  socket.on('error', () => {
    location.replace('/error');
  });
};

