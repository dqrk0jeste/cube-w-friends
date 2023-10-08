document.getElementById('create-button')
  .addEventListener('click', e => {
    const rules = {
      maxPlayers: document.getElementById('max-players').value,
      roundDuration: document.getElementById('round-duration').value,
      betweenDuration: document.getElementById('between-duration').value
    };
    const roomName = document.getElementById('room-name').value;
    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomName: roomName,
        rules: rules
      })
    }).then((res) => res.json())
      .then((data) => {
        location.assign(`../join-room/${data.roomCode}`);
      })
});