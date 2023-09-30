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


document.getElementById('close-my-times-modal-button')
  .addEventListener('click', (e) => {
    document.getElementById('my-times-modal').classList.toggle('open');
  });