export function ao5() {
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

export function ao12() {
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

export function ao50() {
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

export function ao100() {
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

export const formatTime = (time)=> {
  if(time >= 60000) {
    return `${Math.floor(time / 60000)}:${((time % 60000) / 1000).toFixed(2)}`;
  } else {
    return `${(time / 1000).toFixed(2)}`;
  }
}
