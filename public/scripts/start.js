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
  if(e.key !== 'Backspace') 
  input2.focus();
});
input2.addEventListener('keyup', (e) => {
  if(e.key !== 'Backspace') 
  input3.focus();
});
input3.addEventListener('keyup', (e) => {
  if(e.key !== 'Backspace') 
  input4.focus();
});
input4.addEventListener('keyup', (e) => {
  if(e.key !== 'Backspace') 
  input5.focus();
});
input5.addEventListener('keyup', (e) => {
  if(e.key !== 'Backspace') 
  input6.focus();
});

document.querySelector('.join-button')
  .addEventListener('click', (e) => {
    const code = (Number)(input1.value + input2.value + input3.value + input1.value + input4.value + input5.value + input6.value)
    console.log(code);
    //TODO join a room
  });

document.querySelector('.logout-button')
  .addEventListener('click', (e) => {
    location.replace('../logout');
  })