import { ao5, ao12, ao50, ao100, formatTime } from './calculateAverges';

function displayLocalInfo() {
  const timesListElement = document.querySelector('.times');
  for(let i = 1; i <= 5; i++) {
    if(timesList.length >= i) {
      const currentTime = timesList[timesList.length - i];
      const newTime = document.createElement('div');
      newTime.classList.add('time');
      newTime.innerHTML = timesList[timesList.length - i];
      timesListElement.append(newTime);
    }
  }
  document.getElementById('ao5').innerHTML = `ao5: ${ao5()}`;
  document.getElementById('ao12').innerHTML = `ao5: ${ao12()}`;
  document.getElementById('ao50').innerHTML = `ao5: ${ao50()}`;
  document.getElementById('ao100').innerHTML = `ao5: ${ao100()}`;
}

function checkAndReady(e) {
    if(e.key === ' ') {
      readyTimer();
    }
}

function checkAndStart(e) {
  if(e.key === ' ') {
    startTimer();
  }
}

function checkAndStop(e) {
  if(e.key === ' ') {
    clearInterval(timerId);
    timesList.push(time);

    displayTimes();

    document.querySelector('.js-times-list').classList.remove('hidden');
    document.querySelector('.js-average-container').classList.remove('hidden');
    document.querySelector('.js-scramble-container').classList.remove('hidden');
    document.querySelector('.js-timer').classList.remove('bigger-font');

    document.body.removeEventListener('keypress', checkAndStop); 
  }
}

function readyTimer() {
  document.getElementById('timer').style.color = 'rgba('
  time = 0;
}

function startTimer() {

  let timer = document.querySelector('.js-timer');

  document.removeEventListener('keydown', checkAndReady);
  document.removeEventListener('keyup', checkAndStart);

  document.addEventListener('keypress', checkAndStop);

  const startTime = Date.now();
  timerId = setInterval(() => {
    time = Date.now() - startTime;
    if(time < 6000) {
      timer.innerHTML = `${(time / 100).toFixed(2)}`;
    } else {
      timer.innerHTML = `${Math.floor(time / 6000)}:${((time % 6000) / 100).toFixed(2)}
      `;
    }
  }, 10);
}

let time;
let timerId;

document.body.addEventListener('keydown', checkAndReady);
document.body.addEventListener('keyup', checkAndStart);