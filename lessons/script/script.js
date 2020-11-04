window.addEventListener('DOMContentLoaded', () => {

  // eslint-disable-next-line strict
  "use strict";

  //Timer
  function countTimer(deadline) {
    const timerHours = document.getElementById('timer-hours'),
      timerMinutes = document.getElementById('timer-minutes'),
      timerSeconds = document.getElementById('timer-seconds');

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

    const idInterval = setInterval(updateClock, 1000);

  }

  countTimer('05 november 2020');

  //Меню
  const toggleMenu = () => {

    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);

    closeBtn.addEventListener('click', handlerMenu);

    menuItems.forEach(elem => {
      elem.addEventListener('click', handlerMenu);
    });

  };

  toggleMenu();

  const animatePopUp = function(elem) {

    function draw(timePassed) {
      elem.style.left = timePassed / 25 + '%';
    }

    const start = Date.now();

    const timer = setInterval(() => {
      const timePassed = Date.now() - start;

      if (timePassed > 1000) {
        clearInterval(timer);
        return;
      }

      draw(timePassed);
    }, 20);

  };

  //Pop-up
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupContent = document.querySelector('.popup-content'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close');

    popupBtn.forEach(elem => {
      elem.addEventListener('click', () => {
        popup.style.display = 'block';
        if (window.screen.width >= 768) {
          popupContent.style.left = 0;
          animatePopUp(popupContent);
        }
      });
    });

    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });

  };

  togglePopUp();

});
