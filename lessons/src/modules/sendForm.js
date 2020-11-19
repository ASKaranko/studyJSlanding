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
  const postData = body => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
  };

  formBodyArray.forEach(item => {
    if (/phone$/.test(item.id)) {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^0-9+]/g, '');
      });
    } else if (/name$/.test(item.id)) {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^а-я]/gi, '');
      });
    } else if (/message$/.test(item.id)) {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^а-я \W]/gi, '');
      });
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    form.appendChild(statusMessage);
    form.appendChild(circleMessage);
    const formData = new FormData(form);
    const body = {};
    formData.forEach((item, i) => {
      body[i] = item;
    });

    function clearMessage () {
      statusMessage.remove();
      console.log('Готово');
    }

    postData(body)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Server not found');
        }
        circleMessage.remove();
        statusMessage.textContent = successMessage;
        setTimeout(clearMessage, 3000);
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

export { form, form2, form3 };
export default sendForm;
