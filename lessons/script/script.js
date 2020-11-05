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
      menu = document.querySelector('menu');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);

    menu.addEventListener('click', event => {
      let target = event.target;
      event.preventDefault();

      if (target.classList.contains('close-btn')) {
        handlerMenu();
      } else {
        target = target.closest('ul>li');

        if (target) {
          handlerMenu();
          const blockId = target.querySelector('li>a').getAttribute('href');
          document.querySelector(`${blockId}`).scrollIntoView({ behavior: "smooth", block: 'start' });
        }
      }
    });
  };

  toggleMenu();

  //Плавный скролл
  const serviceScroll = document.querySelector('main>a');

  serviceScroll.addEventListener('click', e => {
    e.preventDefault();
    const id = serviceScroll.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: "smooth", block: 'start' });
  });

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
      popupBtn = document.querySelectorAll('.popup-btn');

    popupBtn.forEach(elem => {
      elem.addEventListener('click', () => {
        popup.style.display = 'block';
        if (window.screen.width >= 768) {
          popupContent.style.left = 0;
          animatePopUp(popupContent);
        }
      });
    });

    popup.addEventListener('click', event => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popup.style.display = 'none';
        }
      }
    });
  };

  togglePopUp();

  //Табы

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = index => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tabContent[i].classList.add('d-none');
          tab[i].classList.remove('active');
        }
      }
    };

    tabHeader.addEventListener('click', event => {
      let target = event.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();

});
