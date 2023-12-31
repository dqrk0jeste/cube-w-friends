fetch('/current-user')
  .then(response => response.json())
  .then(data => {
    document.querySelector('.user span').innerHTML = `Logged in as ${data.user}`;
  });

const input1 = document.getElementById('1');
const input2 = document.getElementById('2');
const input3 = document.getElementById('3');
const input4 = document.getElementById('4');
const input5 = document.getElementById('5');
const input6 = document.getElementById('6');

input1.addEventListener('keyup', (e) => {
  const key = e.key;
  if(key !== 'Backspace' && key !== 'Delete') {
    input2.focus();
  }
});
input2.addEventListener('keyup', (e) => {
  const key = e.key;
  if(key === 'Backspace' && input2.value === '') {
    input1.focus();
  } else if(key !== 'Delete') {
    input3.focus();
  }
});
input3.addEventListener('keyup', (e) => {
  const key = e.key;
  if(key === 'Backspace' && input3.value === '') {
    input2.focus();
  } else if(key !== 'Delete') {
    input4.focus();
  }
});
input4.addEventListener('keyup', (e) => {
  const key = e.key;
  if(key === 'Backspace' && input4.value === '') {
    input3.focus();
  } else if(key !== 'Delete') {
    input5.focus();
  }
});
input5.addEventListener('keyup', (e) => {
  const key = e.key;
  if(key === 'Backspace' && input5.value === '') {
    input4.focus();
  } else if(key !== 'Delete') {
    input6.focus();
  }
});

input6.addEventListener('keyup', (e) => {
  const key = e.key;
  if(key === 'Backspace' && input6.value === '') {
    input5.focus();
  } if(key === 'Enter') {
    const code = input1.value + input2.value + input3.value + input4.value + input5.value + input6.value;
    location.assign(`../join-room/${code}`);
  }
});

document.querySelector('.join-button')
  .addEventListener('click', (e) => {
    const code = input1.value + input2.value + input3.value + input4.value + input5.value + input6.value;
    location.assign(`../join-room/${code}`);
  });

document.querySelector('.logout-button')
  .addEventListener('click', (e) => {
    location.replace('../logout');
  })

document.querySelector('.create-button')
  .addEventListener('click', (e) => {
    location.assign('../create-room')
  });