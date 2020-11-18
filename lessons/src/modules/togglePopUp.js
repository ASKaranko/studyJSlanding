const togglePopUp = () => {
  const popup = document.querySelector('.popup'),
    popupContent = document.querySelector('.popup-content'),
    popupBtn = document.querySelectorAll('.popup-btn');

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

export default togglePopUp;
