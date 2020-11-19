function countTimer(deadline) {
  const timerDiv = document.getElementById('timer');

  function getTimeRemaining() {
    const dateStop = new Date(deadline).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      seconds = Math.floor(timeRemaining % 60),
      minutes = Math.floor((timeRemaining / 60) % 60),
      hours = Math.floor(timeRemaining / 3600);

    return { timeRemaining, hours, minutes, seconds };
  }

  function addNull(elem) {
    if (elem < 10) {
      elem = '0' + elem;
    }
    return elem;
  }

  function updateClock() {
    const timer = getTimeRemaining();

    if (timer.timeRemaining <= 0) {
      clearInterval(idInterval);
      timerDiv.innerHTML = `
      <span id="timer-hours">${'00'}</span>
      <span>:</span>
      <span id="timer-minutes">${'00'}</span>
      <span>:</span>
      <span id="timer-seconds">${'00'}</span>
    `;
    } else {
      timerDiv.innerHTML = `
    <span id="timer-hours">${addNull(timer.hours)}</span>
    <span>:</span>
    <span id="timer-minutes">${addNull(timer.minutes)}</span>
    <span>:</span>
    <span id="timer-seconds">${addNull(timer.seconds)}</span>
    `;
    }

  }

  const idInterval = setInterval(updateClock, 1000);

}

export default countTimer;
