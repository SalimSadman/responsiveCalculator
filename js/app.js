// Get references to DOM elements
const userInput = document.getElementById("userinput");
const buttons = {
  clear: document.getElementById("clear"),
  delete: document.getElementById("delete"),
  percent: document.getElementById("percent"),
  divide: document.getElementById("divide"),
  seven: document.getElementById("seven"),
  eight: document.getElementById("eight"),
  nine: document.getElementById("nine"),
  multiply: document.getElementById("multiply"),
  four: document.getElementById("four"),
  five: document.getElementById("five"),
  six: document.getElementById("six"),
  subtract: document.getElementById("subtract"),
  one: document.getElementById("one"),
  two: document.getElementById("two"),
  three: document.getElementById("three"),
  add: document.getElementById("add"),
  zero: document.getElementById("zero"),
  decimal: document.getElementById("decimal"),
  equals: document.getElementById("equals"),
};

// Initialize variables
let currentInput = "";  // Current number or expression being entered
let lastResult = null;  // Last calculated result
let operator = "";      // Current operator (+, -, *, /, etc.)

// Function to update display
function updateDisplay(value) {
  userInput.textContent = value;
}

// Function to handle button clicks
function handleButtonClick(buttonValue) {
  if (!isNaN(buttonValue) || buttonValue === ".") {
    // Handle numbers and decimal points
    if (buttonValue === "." && currentInput.includes(".")) return; // Prevent multiple decimals
    currentInput += buttonValue;
    updateDisplay(currentInput);
  } else if (buttonValue === "+" || buttonValue === "-" || buttonValue === "X" || buttonValue === "/" || buttonValue === "%") {
    // Handle operators
    if (currentInput === "" && lastResult !== null) {
      operator = buttonValue; // Allow chaining calculations
    } else {
      if (currentInput !== "") calculate(); // Perform any pending calculations
      operator = buttonValue;
      lastResult = currentInput || lastResult; // Save the current input as the last result
      currentInput = ""; // Reset for the next input
    }
  } else if (buttonValue === "=") {
    // Calculate result
    calculate();
    operator = ""; // Reset operator after calculation
  } else if (buttonValue === "AC") {
    // Clear everything
    currentInput = "";
    lastResult = null;
    operator = "";
    updateDisplay("0");
  } else if (buttonValue === "DEL") {
    // Delete last character
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || "0");
  }
}

// Function to perform calculation
function calculate() {
  if (!lastResult || !currentInput || !operator) return; // Avoid invalid calculations

  const num1 = parseFloat(lastResult);
  const num2 = parseFloat(currentInput);

  if (operator === "+") {
    lastResult = num1 + num2;
  } else if (operator === "-") {
    lastResult = num1 - num2;
  } else if (operator === "X") {
    lastResult = num1 * num2;
  } else if (operator === "/") {
    lastResult = num2 !== 0 ? num1 / num2 : "Error"; // Avoid division by zero
  } else if (operator === "%") {
    lastResult = (num1 * 0.01* num2);
  }

  updateDisplay(lastResult);
  currentInput = ""; // Reset current input
}

// Attach event listeners to each button
Object.keys(buttons).forEach(key => {
  buttons[key].addEventListener("click", () => handleButtonClick(buttons[key].textContent));
});
