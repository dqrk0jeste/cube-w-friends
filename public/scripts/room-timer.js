function setupTimer() {
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
    if(e.key === ' ' && roundOn) {
      readyTimer();
    }
}

function checkAndStart(e) {
  if(e.key === ' ' && roundOn) {
    startTimer();
  }
}

function checkAndStop(e) {
  if(e.key === ' ' && roundOn) {
    clearInterval(timerId);
    roundFinished = true;

    displayLocalInfo();

    const submitModal = document.getElementById('submit-modal');
    submitModal.classList.add('open');
    document.getElementById('submit-time').innerHTML = formatTime(time);

    document.removeEventListener('keypress', checkAndStop);
    setTimeout(() => {
      document.addEventListener('keydown', checkAndReady); 
      document.addEventListener('keyup', checkAndStart);
    }, 200);
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

function ao5() {
  let best = timesList[timesList.length - 1]; 
  let worst = timesList[timesList.length - 1];
  let bestIndex = 1;
  let worstIndex = 1;
  let currentTime;
  let sum = 0;
  if(timesList.length >= 5) {
    for(let i = 2; i <= 5; i++) {
      currentTime = timesList[timesList.length - i];
      if(currentTime < best) {
        best = currentTime;
        bestIndex = i;
      } else if(currentTime > worst) {
        worst = currentTime;
        worstIndex = i;
      }
    }

    for(let i = 1; i <= 5; i++) {
      currentTime = timesList[timesList.length - i];
      if(i === bestIndex || i === worstIndex) {
        continue;
      }
      sum += currentTime;
    }

    const average = sum / 3;
    return formatTime(average);
  }
  return '-';
}

function ao12() {
  let best = timesList[timesList.length - 1];
  let worst = timesList[timesList.length - 1];
  let bestIndex = 1;
  let worstIndex = 1;
  let currentTime;
  let sum = 0;
  if(timesList.length >= 12) {
    for(let i = 2; i <= 12; i++) {
      currentTime = timesList[timesList.length - i];
      if(currentTime < best) {
        best = currentTime;
        bestIndex = i;
      } else if(currentTime > worst) {
        worst = currentTime;
        worstIndex = i;
      }
    }

    for(let i = 1; i <= 12; i++) {
      currentTime = timesList[timesList.length - i];
      if(i === bestIndex || i === worstIndex) {
        continue;
      }
      sum += currentTime;
    }

    const average = sum / 10;
    return formatTime(average);
  }
  return '-';
}

function ao50() {
  let currentTime;
  let sum = 0;
  if(timesList.length >= 50) {
    let copy = [];
    for(let i = 0; i < 50; i++) {
      copy[i] = timesList[timesList.length - i - 1];
    }

    copy.sort((a, b) => a - b);

    for(let i = 3; i < 47; i++) {
      sum += copy[i];
    }
    const average = sum / 44;
    return formatTime(average);
  }
  return '-';
}

function ao100() {
  let currentTime;
  let sum = 0;
  if(timesList.length >= 100) {
    let copy = [];
    for(let i = 0; i < 100; i++) {
      copy[i] = timesList[timesList.length - i - 1];
    }

    copy.sort((a, b) => a - b);

    for(let i = 5; i < 95; i++) {
      sum += copy[i];
    }
    const average = sum / 90;
    return formatTime(average);
  }
  return '-';
}

function formatTime(time) {
  if(time >= 60000) {
    return `${Math.floor(time / 60000)}:${((time % 60000) / 1000).toFixed(2)}`;
  } else {
    return `${(time / 1000).toFixed(2)}`;
  }
}

setupTimer();