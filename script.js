'use strict';

const calculator = document.querySelector('.calculator');
const key = document.querySelector('.cal-keys');
const display1 = document.querySelector('.current-uperand');
const display2 = document.querySelector('.previous-uperand');
const clearBtn = document.querySelector('.clear');

key.addEventListener('click', function (e) {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const display1Num = display1.textContent;
    const display2Num = display2.textContent;

    console.log(key);
    console.log(action);

    // checking to know which kley is clicked
    if (!action) {
      console.log('Number Key pressed');
      if (display1Num === '0') {
        display1.textContent = keyContent;
        clearBtn.innerHTML = 'C';
      } else {
        display1.textContent = display1Num + keyContent;
        clearBtn.innerHTML = 'C';
      }
    }

    if (action === 'clear') {
      console.log('clear key clicked');
      display1.textContent = '0';
      display2.textContent = '0';
      clearBtn.innerHTML = 'AC';
    }

    if (action === 'delete') {
      console.log('delete key is pressed');
      const display1NumArray = Array.from(display1Num);
      console.log(display1NumArray);
      display1NumArray.pop();
      console.log(display1NumArray);
      display1.textContent = display1NumArray.join('');
      if (display1NumArray.join('') === '') {
        clearBtn.innerHTML = 'AC';
      }
    }

    if (
      action === 'divide' ||
      action === 'multiply' ||
      action === 'add' ||
      action === 'subtract'
    ) {
      console.log('operator key pressed');
      key.classList.add('is-pressed');
      calculator.dataset.firstValue = display1Num;
      calculator.dataset.operator = action;
    }

    if (action === 'decimal') {
      console.log('decimal key is pressed');
      if (!display1Num.includes('.')) {
        display1.textContent = display1Num + '.';
      }
    }

    // Taking all operators key
    const operatorKeys = document.querySelectorAll(
      '[data-action="divide"], [data-action="multiply"], [data-action="add"], [data-action="subtract"]'
    );
    // checking if any of them has the class "is-pressed"
    console.log(operatorKeys);
    const operatorKeyPassed = Array.from(operatorKeys).some(key =>
      key.classList.contains('is-pressed')
    );
    if (operatorKeyPassed && !action) {
      display1.textContent = keyContent;
      operatorKeys.forEach(key => key.classList.remove('is-pressed'));
    }

    if (operatorKeyPassed && action === 'decimal') {
      display1.textContent = '0.';
    }

    if (display1Num === '0.' && !action) {
      display1.textContent = display1Num + keyContent;
    }

    if (action === 'calculate') {
      console.log('equal key is presssed');
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = display1Num;

      const calculate = function (firstValue, operator, secondValue) {
        let result = '';

        if (operator === 'divide') {
          result = parseFloat(firstValue) / parseFloat(secondValue);
        } else if (operator === 'multiply') {
          result = parseFloat(firstValue) * parseFloat(secondValue);
        } else if (operator === 'add') {
          result = parseFloat(firstValue) + parseFloat(secondValue);
        } else if (operator === 'subtract') {
          result = parseFloat(firstValue) - parseFloat(secondValue);
        }
        // I discovered latere that the values are numbers already, so parseFloat is not necessary
        display1.textContent = '';
        return result;
      };

      display2.textContent = calculate(firstValue, operator, secondValue);
    }

    if (action === 'pacentage') {
      console.log('pacentage key clicked');
      display2.textContent = parseFloat(display1Num) / 100;
      display1.textContent = display1Num + keyContent;
    }
  }
});
