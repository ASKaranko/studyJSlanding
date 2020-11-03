window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  //Timer
  function countTimer(deadline) {
    let timerHours = document.getElementById('timer-hours'),
      timerMinutes = document.getElementById('timer-minutes'),
      timerSeconds = document.getElementById('timer-seconds');

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      seconds = Math.floor(timeRemaining % 60),
      minutes = Math.floor((timeRemaining / 60) % 60),
      hours = Math.floor(timeRemaining / 3600);

      return {timeRemaining, hours, minutes, seconds};
    }

    function addNull (elem) {
      if (elem < 10) {
        elem = '0' + elem;
      } 
      return elem;
    }

    function updateClock() {
      let timer = getTimeRemaining();

      timerHours.textContent = addNull(timer.hours);
      timerMinutes.textContent = addNull(timer.minutes);
      timerSeconds.textContent = addNull(timer.seconds);

      if (timer.timeRemaining <= 0) {
        clearInterval(idInterval);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    }

    let idInterval = setInterval(updateClock, 1000);

  }

  countTimer('05 november 2020');

});