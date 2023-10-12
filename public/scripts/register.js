document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(e.target.action, {
    method: 'POST',
    body: new URLSearchParams(new FormData(e.target)) 
  }).then((response) => {
    if(response.status === 201) {
      document.querySelector('.message h3').innerHTML = 'Registration successful!';
      document.body.classList.add('msg');
      setTimeout(() => {
        document.body.classList.remove('msg');
        location.replace('/login');
      }, 1000);
      return;
    } else if(response.status === 409) {
      document.querySelector('.message h3').innerHTML = 'Username taken'
      document.body.classList.add('msg');
      setTimeout(() => {
        document.body.classList.remove('msg');
      }, 3000);
      document.querySelectorAll('input').forEach((i) => {
        i.value = '';
      });
      return;
    } else {
      document.querySelector('.message h3').innerHTML = 'Server error, please try again'
      document.body.classList.add('msg');
      setTimeout(() => {
        document.body.classList.remove('msg');
      }, 3000);
      return;
    }
  })
});