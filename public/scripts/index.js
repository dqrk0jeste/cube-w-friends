const getStartedButton = document.getElementById('get-started-button');
const setupElement = document.getElementById('setup');

getStartedButton.addEventListener('click', () => {
  setupElement.scrollIntoView();
});