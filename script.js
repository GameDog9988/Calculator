// Selections
const clearButton = document.querySelector(".c");
const currentScreenDisplay = document.querySelector(".current-line");
const previousScreenDisplay = document.querySelector(".previous-line");
const equalButton = document.querySelector(".equal");
const numberButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operator");

let previousResult = "";
let currentOperation = "";
let a;
let b;
let operator;
let result;

clearButton.addEventListener("click", () => {
  currentScreenDisplay.textContent = "";
  previousScreenDisplay.textContent = "";
  previousResult = "";
  currentOperation = "";
  a = undefined;
  b = undefined;
  operator = undefined;
  updateScreen();
});

equalButton.addEventListener("click", operate);

for (let i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener("click", () => {
    if (currentOperation.length < 17) {
      appendNum(numberButtons[i].textContent);
      updateScreen();
    }
  });
}

for (let i = 0; i < operatorButtons.length; i++) {
  operatorButtons[i].addEventListener("click", () => {
    selectOperator(operatorButtons[i].textContent);
  });
}

function operate() {
  if (
    !previousResult.includes("=") &&
    a != undefined &&
    currentOperation != ""
  ) {
    previousResult += currentOperation + " = ";
    b = Number(currentOperation);

    switch (operator) {
      case "+":
        result = add(a, b);
        break;
      case "-":
        result = subtract(a, b);
        break;
      case "*":
        result = multiply(a, b);
        break;
      case "/":
        if (b == 0) {
          alert("No dividing by 0!");
          clear();
          return;
        }
        result = divide(a, b);
    }

    currentOperation = result.toString();
    updateScreen();
    a = undefined;
    b = undefined;
    operator = undefined;
    result = undefined;
  }
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function appendNum(number) {
  if (previousResult.includes("=")) {
    currentOperation = "";
    previousResult = "";
  }
  if (currentOperation.length < 17) {
    if (number != "." || !currentOperation.includes(".")) {
      currentOperation += number;
    }
    updateScreen();
  }
}

function updateScreen() {
  currentScreenDisplay.textContent = currentOperation;
  previousScreenDisplay.textContent = previousResult;
}

function selectOperator(op) {
  if (operator != undefined) {
    operate();
  }
  if (currentOperation != "") {
    a = Number(currentOperation);
    operator = op;
    previousResult = currentOperation + " " + operator + " ";
    currentOperation = "";
  }
  updateScreen();
}
