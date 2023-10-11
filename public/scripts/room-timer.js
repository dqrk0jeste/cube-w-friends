function setupTimer() {
  document.addEventListener('keydown', checkAndReady);
  document.addEventListener('keyup', checkAndStart);
}

function displayLocalInfo() {
  timesListElement.innerHTML = '';
  for(let i = 1; i <= 5; i++) {
    if(timesList.length >= i) {
      const currentTime = timesList[timesList.length - i];
      const newTime = document.createElement('div');
      newTime.classList.add('time');
      newTime.innerHTML = formatTime(currentTime);
      timesListElement.append(newTime);
    }
  }

    const currentTime = timesList[timesList.length - 1];
    const newTime = document.createElement('p');
    newTime.innerHTML = formatTime(currentTime);
    myTimesModal.insertBefore(newTime, myTimesModal.firstChild);

  ao5Element.innerHTML = `ao5: ${ao5()}`;
  ao12Element.innerHTML = `ao12: ${ao12()}`;
  ao50Element.innerHTML = `ao50: ${ao50()}`;
  ao100Element.innerHTML = `ao100: ${ao100()}`;
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
    roundOn = false;

    submitModal.classList.add('open');
    submitTime.innerHTML = formatTime(time);

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
  let sum = 0;
  if(timesList.length >= 5) {
    let copy = [];
    for(let i = 0; i < 5; i++) {
      copy[i] = timesList[timesList.length - i - 1];
    }

    copy.sort((a, b) => {
      if(a === 'DNF') {
          return 1;
      } else if(b === 'DNF') {
          return -1;
      } else {
          return a - b;
      }
    });

      if(copy[3] === 'DNF') {
        return 'DNF';
      }
    
      for(let i = 1; i < 4; i++) {
        sum += copy[i];
      }
      const average = sum / 3;
      return formatTime(average);
  }
  return '-';
}

function ao12() {
  let sum = 0;
  if(timesList.length >= 12) {
    let copy = [];
    for(let i = 0; i < 12; i++) {
      copy[i] = timesList[timesList.length - i - 1];
    }

    copy.sort((a, b) => {
      if(a === 'DNF') {
          return 1;
      } else if(b === 'DNF') {
          return -1;
      } else {
          return a - b;
      }
    });

    if(copy[10] === 'DNF') {
      return 'DNF';
    }

    for(let i = 1; i < 11; i++) {
      sum += copy[i];
    }
    const average = sum / 10;
    return formatTime(average);
  }
  return '-';
}

function ao50() {
  let sum = 0;
  if(timesList.length >= 50) {
    let copy = [];
    for(let i = 0; i < 50; i++) {
      copy[i] = timesList[timesList.length - i - 1];
    }

    copy.sort((a, b) => {
      if(a === 'DNF') {
          return 1;
      } else if(b === 'DNF') {
          return -1;
      } else {
          return a - b;
      }
    });

    if(copy[46] === 'DNF') {
      return 'DNF';
    }

    for(let i = 3; i < 47; i++) {
      sum += copy[i];
    }
    const average = sum / 44;
    return formatTime(average);
  }
  return '-';
}

function ao100() {
  let sum = 0;
  if(timesList.length >= 100) {
    let copy = [];
    for(let i = 0; i < 100; i++) {
      copy[i] = timesList[timesList.length - i - 1];
    }

    copy.sort((a, b) => {
      if(a.time === 'DNF') {
          return 1;
      } else if(b.time === 'DNF') {
          return -1;
      } else {
          return a.time - b.time;
      }
  });

    if(copy[94] === 'DNF') {
      return 'DNF';
    }

    for(let i = 5; i < 95; i++) {
      sum += copy[i];
    }
    const average = sum / 90;
    return formatTime(average);
  }
  return '-';
}

function formatTime(time) {
  if(time === 'DNF') {
    return 'DNF';
  } else if(time >= 60000) {
    return `${Math.floor(time / 60000)}:${((time % 60000) / 1000).toFixed(2)}`;
  } else {
    return `${(time / 1000).toFixed(2)}`;
  }
}

setupTimer();