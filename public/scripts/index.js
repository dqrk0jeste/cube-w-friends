document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(e.target.action, {
    method: 'POST',
    body: new URLSearchParams(new FormData(e.target)) 
  }).then((response) => {
    if(response.status === 200) {
      location.assign('/start');
    } else if(response.status === 401) {
      document.querySelector('.message h3').innerHTML = 'Wrong username or password'
      document.body.classList.add('msg');
      setTimeout(() => {
        document.body.classList.remove('msg');
      }, 3000);
      document.querySelectorAll('input').forEach((i) => {
        i.value = '';
      });
    } else {
      document.querySelector('.message h3').innerHTML = 'Server error, please try again';
      document.body.classList.add('msg');
      setTimeout(() => {
        document.body.classList.remove('msg');
      }, 3000);
    }
  });
});