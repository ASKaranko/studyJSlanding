const toggleMenu = () => {

  const btnMenu = document.querySelector('.menu'),
    menu = document.querySelector('menu');
  //Плавный скролл
  const serviceScroll = document.querySelector('main>a');

  serviceScroll.addEventListener('click', e => {
    e.preventDefault();
    const id = serviceScroll.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: "smooth", block: 'start' });
  });

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

export default toggleMenu;
