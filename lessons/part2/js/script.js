window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  function currentDate (deadline) {
    const timeMessage = document.querySelector('.date-a'),
    week = ['Восресенье', 'Понедельник', 'Вторник', 'Среда',      'Чертверг', 'Пятница', 'Суббота'];

    function updateClock() {
      let dateStop = new Date(deadline).getTime(),
        date = new Date(),
        dateNow = date.getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        days = Math.floor(timeRemaining / 3600 / 24),
        hours = date.getHours(),
        dayOfTheWeek = date.getDay(),
        locale = date.toLocaleTimeString('en'),
        dayOfTheWeekStr = '';

        week.forEach(function (item, i, arr) {
          if (i === dayOfTheWeek) {
            dayOfTheWeekStr = item;
          }
        });

        timeMessage.innerHTML = `${dayTime(hours)} <br>
        Сегодня:  ${dayOfTheWeekStr} <br>
        Текущее время: ${locale} <br>
        До Нового Года осталось ${days} дней
      `;

    }

    function dayTime (hours) {
      if (hours < 4) {
        return 'Доброй ночи';
      } else if (hours >= 4 && hours < 12) {
        return 'Доброе утро';
      } else if (hours >= 12 && hours < 17) {
        return 'Добрый день';
      } else if (hours >= 17) {
        return 'Добрый вечер';
      } 
    }

    let idInterval = setInterval(updateClock, 1000);

  }

  currentDate('01 january 2021');

});