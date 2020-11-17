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

  countTimer('12 november 2020');

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

  //Слайдер

  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      slider = document.querySelector('.portfolio-content'),
      portfolioDots = document.querySelector('.portfolio-dots');

    const addDots = () => {
      slide.forEach((elem, i) => {
        const li = document.createElement('li');
        if (i === 0) {
          li.classList.add('dot');
          li.classList.add('dot-active');
        } else {
          li.classList.add('dot');
        }
        portfolioDots.append(li);
      });
    };

    addDots();
    const dot = document.querySelectorAll('.dot');

    let currentSlide = 0,
      interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {

      interval = setInterval(autoPlaySlide, time);

    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', event => {
      event.preventDefault();
      const target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', event => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', event => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide(1500);
      }
    });

    startSlide(1500);


  };

  //ourTeam

  const ourTeam = () => {
    const command = document.getElementById('command');

    command.addEventListener('mouseover', event => {
      if (event.target.matches('.command__photo')) {
        event.target.src = event.target.dataset.img;
      }
    });

    command.addEventListener('mouseout', event => {
      if (event.target.matches('.command__photo')) {
        event.target.src = event.target.src.replace(/\d{1}a/, match => match.substring(0, 1));
      }
    });
  };

  //Калькулятор

  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcCount = document.querySelector('.calc-count'),
      calcDay = document.querySelector('.calc-day'),
      totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = +calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value >= 5 && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      return total;
    };

    calcBlock.addEventListener('input', event => {
      const target = event.target;

      if (target.matches('input')) {
        target.value = target.value.replace(/\D/g, '');
      }
    });

    calcBlock.addEventListener('change', event => {
      const target = event.target;

      if (target === calcType || target === calcSquare || target === calcCount || target === calcDay) {
        const total = countSum();

        let index = 0;
        const totalQuater = total / 50;
        if (total === 0) {
          totalValue.textContent = 0;
        }
        const timerTotal = setInterval(() => {
          for (let i = 0; i < totalQuater; i++) {
            index++;
            totalValue.textContent = index;
          }
          if (totalValue.textContent >= total) {
            clearInterval(timerTotal);
          }
        }, 10);

      }
    });
  };

  //send-ajax-form
  const form = document.getElementById('form1'),
    form2 = document.getElementById('form2'),
    form3 = document.getElementById('form3');

  const sendForm = form => {
    const errorMessage = 'Что-то пошло не так...',
      loadMessage = 'Загрузка...',
      successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: yellow';
    const circleMessage = document.createElement('img');
    circleMessage.src = `./images/200.gif`;

    const formBodyArray = [...form.elements];

    // eslint-disable-next-line arrow-body-style
    const postData = (body) => {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', () => {
          if (request.readyState !== 4) {
            return;
          }
          if (request.status === 200) {
            resolve();
          } else {
            reject(request.status);
          }
        });
        request.open('POST', './server.php');
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(body));
      });
    };

    formBodyArray.forEach(item => {
      if (/phone$/.test(item.id)) {
        item.addEventListener('input', () => {
          item.value = item.value.replace(/[^0-9+]/g, '');
        });
      } else if (/name$/.test(item.id) || /message$/.test(item.id)) {
        item.addEventListener('input', () => {
          item.value = item.value.replace(/[^а-я]/gi, '');
        });
      }
    });

    form.addEventListener('submit', event => {
      event.preventDefault();
      form.append(statusMessage);
      form.append(circleMessage);
      const formData = new FormData(form);
      const body = {};
      formData.forEach((item, i) => {
        body[i] = item;
      });

      postData(body)
        .then(() => {
          circleMessage.remove();
          statusMessage.textContent = successMessage;
          formBodyArray.forEach(item => {
            if (item.tagName.toLowerCase() !== 'button') {
              item.value = '';
            }
          });
        })
        .catch(error => {
          console.error(error);
          statusMessage.textContent = errorMessage;
        });
    });
  };

  sendForm(form);
  sendForm(form2);
  sendForm(form3);
  ourTeam();
  calc(100);

  slider();

});
