
/* ============================================
   STEP 1: GET REFERENCES TO HTML ELEMENTS
   We need to access HTML elements to read/write their values
   ============================================ */

/**
 * getElementById() finds an HTML element by its unique ID
 * We store these in variables so we can use them throughout the code
 */

// Get the first number input field
const firstNumberInput = document.getElementById('first-number');

// Get the second number input field
const secondNumberInput = document.getElementById('second-number');

// Get the result display area (the container)
const resultDisplay = document.getElementById('result-display');

// Get the result value span (where we display the actual number)
const resultValue = document.getElementById('result-value');

// Get the status message area (for errors)
const statusMessage = document.getElementById('status-message');

// Get all operation buttons (for highlighting the selected one)
const operationButtons = document.querySelectorAll('.op-btn');

/* ============================================
   STEP 2: STORE THE CURRENTLY SELECTED OPERATION
   We need to remember which operation (+, -, ×, ÷) the user chose
   ============================================ */

// Variable to store the selected operation
// Starts as null (no operation selected yet)
let selectedOperation = null;

/* ============================================
   STEP 3: CREATE THE selectOperation FUNCTION
   This function is called when user clicks an operation button
   ============================================ */

/**
 * selectOperation - Handles when user clicks an operation button
 * @param {string} operation - The operation symbol ('+', '-', '×', or '÷')
 */
function selectOperation(operation) {
    // Store the selected operation in our variable
    selectedOperation = operation;
    
    // Log to console for debugging (press F12 in browser to see)
    console.log('Selected operation:', operation);
    
    // Update button styling to show which operation is selected
    highlightSelectedButton(operation);
    
    // Optional: Give visual feedback that operation was selected
    showStatus('Operation selected: ' + operation, false);
}

/* ============================================
   STEP 4: CREATE THE highlightSelectedButton FUNCTION
   This function highlights the currently selected operation button
   ============================================ */

/**
 * highlightSelectedButton - Visually highlights the selected operation button
 * @param {string} operation - The operation symbol to highlight
 */
function highlightSelectedButton(operation) {
    // Loop through all operation buttons
    operationButtons.forEach(function(button) {
        // Remove 'selected' class from all buttons first
        button.classList.remove('selected');
        
        // Check if this button's text matches the selected operation
        if (button.textContent === operation) {
            // Add 'selected' class to highlight this button
            button.classList.add('selected');
        }
    });
}

/* ============================================
   STEP 5: CREATE THE calculate FUNCTION
   This is the main function that performs the calculation
   ============================================ */

/**
 * calculate - Performs the calculation based on inputs and selected operation
 * This function follows the application flow diagram:
 * 1. Get the two numbers
 * 2. Check if operation is selected
 * 3. Check for division by zero
 * 4. Calculate the result
 * 5. Display the result
 */
function calculate() {
    // ============================================
    // STEP 5a: GET THE INPUT VALUES
    // ============================================
    
    // Get the value from the first input field
    // .value gets the text inside the input
    const firstValue = firstNumberInput.value;
    
    // Get the value from the second input field
    const secondValue = secondNumberInput.value;
    
    // Log the values for debugging
    console.log('First number:', firstValue);
    console.log('Second number:', secondValue);
    
    // ============================================
    // STEP 5b: VALIDATE INPUTS
    // Check if both inputs have values
    // ============================================
    
    // Check if first input is empty
    if (firstValue === '') {
        // Show error message
        showStatus('Please enter the first number', true);
        return;  // Stop the function here
    }
    
    // Check if second input is empty
    if (secondValue === '') {
        // Show error message
        showStatus('Please enter the second number', true);
        return;  // Stop the function here
    }
    
    // ============================================
    // STEP 5c: CHECK IF OPERATION IS SELECTED
    // ============================================
    
    if (selectedOperation === null) {
        // No operation selected yet
        showStatus('Please select an operation (+, -, ×, ÷)', true);
        return;  // Stop the function here
    }
    
    // ============================================
    // STEP 5d: CONVERT STRINGS TO NUMBERS
    // Input values are strings, we need numbers for math
    // ============================================
    
    // parseFloat converts a string to a decimal number
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(secondValue);
    
    // Log the converted numbers
    console.log('Number 1:', num1);
    console.log('Number 2:', num2);
    
    // ============================================
    // STEP 5e: CHECK FOR DIVISION BY ZERO
    // According to the app flow diagram, we must check this
    // ============================================
    
    // Check if operation is division AND second number is zero
    if (selectedOperation === '÷' && num2 === 0) {
        // Division by zero is undefined - show error
        showStatus('Error: Division by Zero', true);
        
        // Clear the result display
        resultValue.textContent = 'Error';
        
        // Stop the function here
        return;
    }
    
    // ============================================
    // STEP 5f: PERFORM THE CALCULATION
    // Use a switch statement to handle different operations
    // ============================================
    
    // Variable to store the result
    let result;
    
    // Switch statement checks the value of selectedOperation
    switch (selectedOperation) {
        case '+':
            // Addition: add the two numbers
            result = num1 + num2;
            console.log('Performing addition:', num1, '+', num2, '=', result);
            break;  // Exit the switch
            
        case '-':
            // Subtraction: subtract second from first
            result = num1 - num2;
            console.log('Performing subtraction:', num1, '-', num2, '=', result);
            break;  // Exit the switch
            
        case '×':
            // Multiplication: multiply the two numbers
            result = num1 * num2;
            console.log('Performing multiplication:', num1, '×', num2, '=', result);
            break;  // Exit the switch
            
        case '÷':
            // Division: divide first by second
            result = num1 / num2;
            console.log('Performing division:', num1, '÷', num2, '=', result);
            break;  // Exit the switch
            
        default:
            // This runs if operation is somehow invalid
            showStatus('Invalid operation', true);
            return;  // Stop the function
    }
    
    // ============================================
    // STEP 5g: DISPLAY THE RESULT
    // Show the calculated result in the display area
    // ============================================
    
    // Round to 2 decimal places if needed, then convert to string
    // toFixed(2) rounds to 2 decimal places
    // But we don't want trailing zeros, so we check if it's a whole number
    if (Number.isInteger(result)) {
        // If result is a whole number, display as-is
        resultValue.textContent = result;
    } else {
        // If result has decimals, round to 2 decimal places
        resultValue.textContent = result.toFixed(2);
    }
    
    // Clear any previous status message
    hideStatus();
    
    // Log success
    console.log('Result displayed:', resultDisplay.textContent);
}

/* ============================================
   STEP 6: CREATE THE resetCalculator FUNCTION
   This function clears all inputs and resets the calculator
   ============================================ */

/**
 * resetCalculator - Clears all inputs, result, and selected operation
 * This allows the user to start fresh
 */
function resetCalculator() {
    // ============================================
    // STEP 6a: CLEAR THE INPUT FIELDS
    // Set both input values back to "0"
    // ============================================
    
    firstNumberInput.value = '0';      // Reset first input to 0
    secondNumberInput.value = '0';     // Reset second input to 0
    
    // ============================================
    // STEP 6b: CLEAR THE RESULT DISPLAY
    // Set the result back to "0"
    // ============================================
    
    resultValue.textContent = '0';       // Reset result to 0
    
    // ============================================
    // STEP 6c: RESET THE SELECTED OPERATION
    // Clear the stored operation
    // ============================================
    
    selectedOperation = null;          // No operation selected
    
    // ============================================
    // STEP 6d: REMOVE BUTTON HIGHLIGHTING
    // Remove the 'selected' class from all buttons
    // ============================================
    
    operationButtons.forEach(function(button) {
        button.classList.remove('selected');
    });
    
    // ============================================
    // STEP 6e: CLEAR ANY STATUS MESSAGES
    // Hide error or info messages
    // ============================================
    
    hideStatus();                      // Hide status message
    
    // Log that reset was performed
    console.log('Calculator reset');
}

/* ============================================
   STEP 7: CREATE HELPER FUNCTIONS FOR STATUS MESSAGES
   These functions show and hide error/info messages
   ============================================ */

/**
 * showStatus - Displays a message to the user
 * @param {string} message - The message to display
 * @param {boolean} isError - Whether this is an error message
 */
function showStatus(message, isError) {
    // Set the message text
    statusMessage.textContent = message;
    
    // Set the color based on whether it's an error
    if (isError) {
        statusMessage.style.color = '#e74c3c';      // Red for errors
        statusMessage.style.backgroundColor = '#ffe6e6';  // Light red background
    } else {
        statusMessage.style.color = '#27ae60';      // Green for info
        statusMessage.style.backgroundColor = '#e6ffe6';  // Light green background
    }
    
    // Make the message visible by adding the 'visible' class
    statusMessage.classList.add('visible');
}

/**
 * hideStatus - Hides the status message
 */
function hideStatus() {
    // Remove the 'visible' class to hide the message
    statusMessage.classList.remove('visible');
}

/* ============================================
   STEP 8: ADD KEYBOARD SUPPORT (OPTIONAL ENHANCEMENT)
   Allow user to press Enter to calculate
   ============================================ */

/**
 * Add an event listener for the Enter key
 * This lets users press Enter instead of clicking the = button
 */

// Add event listener to both input fields
firstNumberInput.addEventListener('keypress', function(event) {
    // Check if the pressed key is Enter
    if (event.key === 'Enter') {
        // Move focus to second input, or calculate if already there
        if (document.activeElement === firstNumberInput) {
            secondNumberInput.focus();  // Move to second input
        }
    }
});

secondNumberInput.addEventListener('keypress', function(event) {
    // Check if the pressed key is Enter
    if (event.key === 'Enter') {
        // Calculate when Enter is pressed in second input
        calculate();
    }
});

// ============================================
// INITIALIZATION MESSAGE
// This logs a message when the page loads
// ============================================

console.log('Calculator app loaded successfully!');
console.log('Enter two numbers, select an operation, and press = to calculate.');
