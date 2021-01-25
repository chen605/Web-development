const keys = document.querySelector('.calculator-keys');

const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }

  console.log(calculator);
} 

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
  	calculator.displayValue = '0.'
    calculator.waitingForSecondOperand = false;
    return
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  toggle = true;
  calculator.displayValue = '';
  const inputValue = parseFloat(displayValue);
  if (operator && calculator.waitingForSecondOperand)  {
    calculator.operator = nextOperator;
    console.log(calculator)
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

function updateDisplay() {
  // select the element with class of `calculator-screen`
  const display = document.querySelector('.calculator-screen');
  // update the value of the element with the contents of `displayValue`
  display.value = calculator.displayValue;
}

updateDisplay();

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  } else if (operator === '%') {
    return firstOperand % secondOperand;
  }

  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

let toggle = true;
function plusMinus(sym){  
  if (calculator.waitingForSecondOperand === true) {
  	calculator.displayValue = '';
    calculator.waitingForSecondOperand = false;
    return;
  }
  if (!calculator.displayValue.includes(sym)) {
    if(calculator.displayValue == 0){
      calculator.displayValue = '' ;
    }
    calculator.displayValue = '-' + calculator.displayValue;
    toggle = false;   
  }
}

function positive(){
 toggle = true; 
 if(calculator.displayValue.includes('-')){
   calculator.displayValue = calculator.displayValue.replace('-', '');
 }
}

keys.addEventListener('click', event => {
  const { target } = event;
  const { value } = target;
  if (!target.matches('button')) {
    return;
  }
  let buttons = document.querySelectorAll('.orange');
  let modButton = document.querySelector('.gray')
  switch (value) {
    case '+':
      buttons.forEach(el => el.style.backgroundColor = "orange");
      modButton.style.backgroundColor = 'rgb(206, 197, 197)';
      event.target.style.backgroundColor = "green";
      toggle = true;
      handleOperator(value);
      break;

    case '-':
      modButton.style.backgroundColor = 'rgb(206, 197, 197)';
      buttons.forEach(el => el.style.backgroundColor = "orange");
      event.target.style.backgroundColor = "green";
      toggle = true;
      handleOperator(value);
      break;

    case '*':
      modButton.style.backgroundColor = 'rgb(206, 197, 197)';
      buttons.forEach(el => el.style.backgroundColor = "orange");
      event.target.style.backgroundColor = "green";
      toggle = true;
      handleOperator(value);
      break;

    case '/':
      modButton.style.backgroundColor = 'rgb(206, 197, 197)';
      modButton.style.backgroundColor = 'rgb(206, 197, 197)';
      buttons.forEach(el => el.style.backgroundColor = "orange");
      event.target.style.backgroundColor = "green";
      toggle = true;
      handleOperator(value);
      break;

    case '%':
      buttons.forEach(el => el.style.backgroundColor = "orange");
      event.target.style.backgroundColor = "green";
      toggle = true;
      handleOperator(value);
      break;

    case '=':
      modButton.style.backgroundColor = 'rgb(206, 197, 197)';
      buttons.forEach(el => el.style.backgroundColor = "orange")
      toggle = true;
      handleOperator(value);
      break;
    
    case '.':
      inputDecimal(value);
      break;
    case 'all-clear':
      modButton.style.backgroundColor = 'rgb(206, 197, 197)';
      buttons.forEach(el => el.style.backgroundColor = "orange")
      toggle = true;
      resetCalculator();
      break;
    case '+/-':
      toggle ? plusMinus()  : positive();
      
      break;
    default:
      // check if the key is an integer
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});

