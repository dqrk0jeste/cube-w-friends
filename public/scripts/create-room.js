document.getElementById('create-button')
  .addEventListener('click', e => {
    const rules = {
      password: document.getElementById('password').value,
      maxPlayers: document.getElementById('max-players').value,
      roundDuration: document.getElementById('round-duration').value
    };
    const roomName = document.getElementById('room-name');
    fetch('', {
      method: 'POST',
      body: {
        roomName: roomName,
        rules: rules
      }
    }).then(response => response.json())
      .then((data) => {
      location.assign(`../join-room/${data.roomCode}`);
    });
  });