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

export default calc;