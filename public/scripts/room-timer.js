import { ao5, ao12, ao50, ao100, formatTime } from './calculateAverages.js';

export let time;
export let timerId;

export function setupTimer() {
  document.addEventListener('keydown', checkAndReady);
  document.addEventListener('keyup', checkAndStart);
}

function displayLocalInfo() {
  const timesListElement = document.querySelector('.times');
  for(let i = 1; i <= 5; i++) {
    if(timesList.length >= i) {
      const currentTime = timesList[timesList.length - i];
      const newTime = document.createElement('div');
      newTime.classList.add('time');
      newTime.innerHTML = currentTime;
      timesListElement.append(newTime);
    }
  }
  document.getElementById('ao5').innerHTML = `ao5: ${ao5()}`;
  document.getElementById('ao12').innerHTML = `ao12: ${ao12()}`;
  document.getElementById('ao50').innerHTML = `ao50: ${ao50()}`;
  document.getElementById('ao100').innerHTML = `ao100: ${ao100()}`;
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

    displayLocalInfo();

    const submitModal = document.getElementById('submit-modal');
    submitModal.classList.add('open');
    document.getElementById('submit-time').innerHTML = formatTime(time);

    document.removeEventListener('keypress', checkAndStop); 
    document.addEventListener('keydown', checkAndReady); 
    document.addEventListener('keyup', checkAndStart);
  }
}

function readyTimer() {
  document.getElementById('timer').classList.add('ready-timer');
  time = 0;
}

function startTimer() {

  const timer = document.getElementById('timer');
  timer.classList.remove('ready-timer');

  document.removeEventListener('keydown', checkAndReady);
  document.removeEventListener('keyup', checkAndStart);

  document.addEventListener('keypress', checkAndStop);

  const startTime = Date.now();
  timerId = setInterval(() => {
    time = Date.now() - startTime;
    timer.innerHTML = formatTime(time);
  }, 10);
}
