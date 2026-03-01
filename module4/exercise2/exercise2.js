
// STEP 1: ACCESS KEY HTML ELEMENTS AND STORE IN VARIABLES

// The key HTML elements are those that we want our JS to interact with (i.e. read or change).
    // That includes the two number input fields, the operation buttons, and the area where we show the result and status messages.

// We will store these key HTML elements in variables for easy access later.
    // If we don't store them in variables, we would have to call document.getElementById() or document.querySelectorAll() every time we wanna use these elements.
    // This would be inefficient and make our JS harder to read.

// We use the keyword const to declare variables that will hold references to HTML elements.
    // Since these variables will always refer to the same elements, const is the appropriate choice.
    // const prevents us from accidentally reassigning these variables to something else later in the code.
    // If we were going to reassign these variables, we would have used the keyword let instead, but in this case, const is the best choice for clarity and safety.

// We use the document.getElementById() to get elements by their ID (for input fields and display areas)
    // document = the global object that represents the webpage
    // getElementById() = a JS method that finds an element by its unique ID and returns it

// We use document.querySelectorAll() to get all elements with a certain class (for operation buttons)
    // querySelectorAll() = a JS method that returns a static NodeList of all elements that match a specified CSS selector

// Step 1a: declare a variable "firstNumberInput" to store the HTML element with ID "first-number"
const firstNumberInput = document.getElementById('first-number');

// Step 1b: declare a variable "secondNumberInput" to store the HTML element with ID "second-number"
const secondNumberInput = document.getElementById('second-number');

// Step 1c: declare a variable "resultDisplay" to store the HTML element with ID "result-display"
const resultDisplay = document.getElementById('result-display');

// Step 1d: declare a variable "resultValue" to store the HTML element with ID "result-value"
const resultValue = document.getElementById('result-value');

// Step 1e: declare a variable "statusMessage" to store the HTML element with ID "status-message"
const statusMessage = document.getElementById('status-message');

// Step 1f: declare a variable "operationButtons" to store all HTML elements with class "op-btn"
const operationButtons = document.querySelectorAll('.op-btn');

//STEP 2: CREATE A VARIABLE TO STORE THE CURRENTLY SELECTED OPERATION
// We need to remember which operation (+, -, ×, ÷) the user chose

// We use the keyword let to declare a variable that will store the currently selected operation
// let is appropriate as we will be changing this variable when the user clicks different operation buttons

// Declare a variable "selectedOperation" to store the currently selected operation
let selectedOperation = null;
    // null = we initialize the variable with null to indicate that no operation is selected at the start
    // this is a common practice to show that the variable is intentionally empty until the user selects an operation

// STEP 3: CREATE SELECT OPERATION FUNCTION FOR WHEN USER CLICKS ANY OPERATION BUTTON ( '+' '-' '×' '÷' )

// Step 3a: Create a function named "selectOperation" that takes one parameter "operation"
function selectOperation(operation) {
// function = we use this keyword to define a reusable block of code that performs a specific task
// selectOperation = the name of our function, which describes what it does (selects an operation)
// (operation) = the parameter that will receive the value of the operation button that was clicked (e.g. '+' '-' '×' '÷')
// It's important to have a parameter here because we want this function to work for all operation buttons, and the parameter allows us to know which specific operation was selected when the function is called
// When user clicks an operation button, this function will be called with the corresponding operation symbol as the argument
// For example, if user clicks "+" button, this function will be called as selectOperation('+'), and the parameter "operation" will receive the value '+'

    // Step 3b: Store the parameter "operation" in the variable "selectedOperation" (in other words, assign the value of "operation" to "selectedOperation")
    // We need to save the selected operation so that when user clicks "=" button, we know which operation to perform in the yet-to-be-created calculate() function
    // This is part of the application flow: when user selects an operation, we store it for later use in the calculation step
    // For example, if user clicks "+" button, we want to store '+' in selectedOperation so that when user eventually clicks "=", we know that we have to perform addition
        selectedOperation = operation;
    
    // Step 3c: Log the parameter "operation" to the console for debugging
    // This will help us verify that the correct operation is being passed to the function when a button is clicked
    // For example, if user clicks "+" button, we should see "Selected operation: +" in the console
    console.log('Selected operation:', operation);
    
    // Step 3d: call a yet-to-be-created function "highlightSelectedButton" and pass the parameter "operation" to it
    highlightSelectedButton(operation);
    // "highlightSelectedButton" is a function we will create in the next step
    // The intention here is to visually highlight the selected operation button for a better user experience

    // Step 3e: give visual feedback that operation was selected
    // Our intention here will be to show this message in the status message area, which is a good way to provide feedback to the user about what they have done
    showStatus('Operation selected: ' + operation, false);
}

// STEP 4: CREATE HIGHLIGHT OPERATOR FUNCTION UPON USER SELECTION
// This function will add a CSS class to the selected operation button to visually indicate an operation is currently selected

// Step 4a: create a function named "highlightSelectedButton" that takes one parameter "operation"
function highlightSelectedButton(operation) {
   
    // Step 4b: create a forEach loop to go through each button in the "operationButtons" NodeList
    // We want to check each operation button to see if it matches the selected operation, and if so, we will add a CSS class to highlight it
        operationButtons.forEach(function(button) {
        // operationButtons = a NodeList of all elements with class "op-btn" i.e. our operation buttons   
        // forEach() = a method that executes a provided function once for each element in the NodeList
        // function(button) = a callback function that will be executed for each button in the NodeList, where "button" is the current button being processed in the loop
        
        // Step 4c: remove 'selected' class from all buttons first
        // This ensures that only the currently selected button will be highlighted, and any previously selected button will be un-highlighted
        button.classList.remove('selected');
        
        // Step 4d: check if the text content of the button matches the "operation" parameter
        // button.textContent gives us the text inside the button (e.g. '+', '-', '×', '÷')
        if (button.textContent === operation) {
            
            // Step 4e: add 'selected' class to highlight this button
            button.classList.add('selected');
        } // close the if statement
    }); // close the forEach loop 
} // close the function highlightSelectedButton


// STEP 5: CREATE CALCULATE FUNCTION UPON USER CLICKING "=" ACTION BUTTON
// This function will be called when user clicks the "=" button.
// It will perform a calculation based on the two input numbers and the selected operation

// Step 5a: declare a function named "calculate" that takes no parameters
function calculate() {
// calculate = this is the name of our function, which describes what it does (performs the calculation based on user input and selected operation)
// () = this function does not take any parameters, because it will access the input values and selected operation directly from the variables we have already defined at the top of our code (firstNumberInput, secondNumberInput, selectedOperation)
// This function will be called when user clicks the "=" button, and it will read the current values from the input fields and the selected operation to perform the calculation and display the result
 
//This function follows the calc_appflow.jpg application flow diagram I uploaded, which outlines the steps we need to take to perform the calculation correctly and handle any potential errors (like missing inputs or division by zero). 
// The steps are as follows:
 // 1. Get the two input values from the input fields
 // 2. Check if an operation has been selected
 // 3. Check for division by zero 
 // 4. Calculate the result
 // 5. Display the result


    // Step 5b: declare a const variable called "firstValue" and assign it the value of the first input field
    const firstValue = firstNumberInput.value;
    // const = we don't intend to reassign this variable after we get the value from the input field
    // firstNumberInput = the variable we defined above that holds the reference to the first input field element
    // .value = a JS property that gets the current value of an input field (the text that the user has entered)

    // .value gets the text inside the input

    // Step 5c: declare a const variable called "secondValue" and assign it the value of the second input field
    const secondValue = secondNumberInput.value;
    
    // Step 5d: use console.log to log the values of "firstValue" and "secondValue" for debugging
    console.log('First number:', firstValue);
    console.log('Second number:', secondValue);
    
        // STEP 5c: use an if statement to check if "firstValue" is an empty string (i.e. user did not enter a number in the first input field)
        if (firstValue === '') {
        
        // show error message to user using the yet-to-be-defined showStatus function
        showStatus('Please enter the first number', true);

        return; // use return to stop the function here, because we can't perform a calculation without the first number

    } // close the if statement for firstValue check
    
    // STEP 5d: use an if statement to check if "secondValue" is an empty string (i.e. user did not enter a number in the second input field)
    if (secondValue === '') {
        
        showStatus('Please enter the second number', true);
        return;  
    } // close the if statement for secondValue check
    

    // STEP 6: CREATE IF STATEMENT TO STOP CALCULATION IF USER PRESSES "=" WITHOUT SELECTING AN OPERATION BEFOREHAND
    // If user has not selected an operation prior to clicking "=", we should show an error message and not attempt to perform a calculation
    // This is important for user experience and also to prevent errors in our code when we try to perform a calculation without knowing which operation to use

    // Step 6a: use an if statement to check if "selectedOperation" is null (i.e. no operation has been selected)    
    if (selectedOperation === null) {
        // selectedOperation = the variable we defined at the top to store the currently selected operation, and we initialized it to null to indicate that no operation is selected at the start
        // === means we are checking if selectedOperation is exactly equal to null
        // null is a special JS value that represents the intentional absence of any object value. In our case, null indicates the user has not selected any operation yet

        // Step 6b: use showStatus function to show an error message to the user, telling them to select an operation before calculating
        showStatus('Please select an operation (+, -, ×, ÷)', true);
        // true = we pass true to indicate that this is an error message. This will make the showStatus function style it accordingly (e.g. red color)

        return; // use return to stop the function here, because we can't perform a calculation if no operation was selected
    } // close the if statement for selectedOperation check
    

    // STEP 7: CREATE VARIABLES TO STORE THE NUMERIC VALUES OF THE INPUTS
    // The current values we get from the input fields are strings (text).
    // We need to convert text into numbers so that we can perform mathematical operations on them.

    
    // Step 7a: declare a variable "num1" and use parseFloat() to convert "firstValue" from a string to a number
    const num1 = parseFloat(firstValue);

    // parseFloat = a built-in JS function that parses a string and returns a floating point number.
    // It reads the string until it reaches a character that is not part of a valid number, then returns the number it has parsed up to that point.
    // If the string does not start with a valid number, parseFloat returns NaN (Not-a-Number).

    // Step 7b: declare a variable "num2" and use parseFloat() to convert "secondValue" from a string to a number
    const num2 = parseFloat(secondValue);
    
    // Step 7c: use console.log to log the numeric values of num1 and num2 for debugging purposes
    console.log('Number 1:', num1);
    console.log('Number 2:', num2);
    
    // Step 7d: use an if statement to check if either num1 or num2 is NaN (Not-a-Number)
    // This happens if the user entered something that couldn't be converted to a valid number
    // According to the app flow diagram, we must check this
        
    // Check if operation is division AND second number is zero
    if (selectedOperation === '÷' && num2 === 0) {
        // Division by zero is undefined - show error
        showStatus('Error: Division by Zero. You are a Fool.', true);
        
        // Clear the result display
        resultValue.textContent = 'Error';
        
        // Stop the function here
        return;
    } // close the if statement for division by zero check
    

    // STEP 8: PERFORM THE CALCULATION BASED ON THE SELECTED OPERATION USING A SWITCH STATEMENT 

    // Step 8a: declare a variable "result" to store the result of the calculation
    let result;
    
    // Step 8b: use a switch statement to perform the calculation based on the selected operation
    // We use switch because we have multiple possible operations to perform. Switch allows us to handle each case (operation) in a clear and organized way
    switch (selectedOperation) {
    // switch = a control statement that allows us to execute different blocks of code based on the value of a variable (in this case, selectedOperation)
    // selectedOperation = the variable that holds the currently selected operation (e.g. '+', '-', '×', '÷')

        // for each case (operation), we perform the corresponding calculation and store the result in the "result" variable, then we break out of the switch statement to avoid executing the code for other cases

        // for addition
        case '+':
            result = num1 + num2;
            // We perform the addition operation and store the result in the variable "result"

            console.log('Performing addition:', num1, '+', num2, '=', result);
            // console.log() = a built-in JS function that outputs a message to the web console
            // Here we log the operation being performed and the result for verification.

            break;  
            // break = this tells the switch statement to stop executing further cases once it has found a match and executed the code for that case. Without break, it would continue to execute the code for the next cases, which we don't want.
        
        // for subtraction    
        case '-':
            result = num1 - num2;
            console.log('Performing subtraction:', num1, '-', num2, '=', result);
            break;
            
        // for multiplication
        case '×':
            result = num1 * num2;
            console.log('Performing multiplication:', num1, '×', num2, '=', result);
            break;
            
        // for division
        case '÷':
            result = num1 / num2;
            console.log('Performing division:', num1, '÷', num2, '=', result);
            break;
        
        // for any other case (which should not happen if our buttons are set up correctly), we show an error message and stop the function    
        default:
            showStatus('Invalid operation', true);
            return;  // return = stop the function here, because we can't perform a calculation if the operation is invalid
    } // close the switch statement

    
    // STEP 9: DISPLAY THE RESULT IN THE RESULT DISPLAY AREA

    // Round to 2 decimal places if needed, then convert to string
    // toFixed(2) rounds to 2 decimal places
    // But we don't want trailing zeros, so we check if it's a whole number


    // Step 9a: use an if statement to check if the result is an integer (i.e. has no decimal places)
    if (Number.isInteger(result)) {
    // .isInteger() = a built-in JS method that checks if a value is an integer (a whole number with no decimal places).
    // It returns true if the value is an integer, and false otherwise.

        // if result is an integer, we can display it as is without rounding
        resultValue.textContent = result.toLocaleString();
        // resultValue = the variable we defined at the top that holds the reference to the HTML element where we display the result
        // .textContent = a JS property that sets or gets the text content of an element.
        // result = here, set the text content to the value of the result variable, which is the outcome of our calculation
        // .toLocaleString() = a built-in JS method that formats a number with locale-specific separators.
        // For example, in English locale, it adds commas as thousands separators (e.g., 1000000 becomes "1,000,000").

        } // close the if statement for integer check

        // Step 9b: use an else statement to handle the case where the result has decimal places
        else {

        // if result has decimal places, we round it to 2 decimal places for better readability
        resultValue.textContent = result.toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
        // .toLocaleString('en-AU', { ... }) = formats a number using Australian English locale conventions.
        // 'en-AU' = the locale code for Australian English, which uses commas for thousands separators and periods for decimals.
        // minimumFractionDigits: 0 = don't show decimal places if they are not needed (e.g., 5.00 becomes "5").
        // maximumFractionDigits: 2 = show up to 2 decimal places if needed (e.g., 1234.567 becomes "1,234.57").

    } // close the if-else statement for result display

    
    // Step 9c: use the in-built JS function hideStatus() to clear any previous status messages, since we have successfully performed a calculation and displayed the result
    hideStatus();
    
    // Step 9d: use console.log to log the final result that is displayed for debugging purposes
    console.log('Result displayed:', resultDisplay.textContent);
} // close the calculate function


// STEP 10: CREATE FUNCTION TO RESET THE CALCULATOR
// This function will be called when user clicks the "C" (clear) button, and it will reset all inputs, result, and selected operation to their initial state.
// This way, the user can start fresh with a new calculation.

// Step 10a: declare a function named "resetCalculator" that takes no parameters
function resetCalculator() {
      
    // Step 10b: reset both firstNumberInput and secondNumberInput fields to 0
    firstNumberInput.value = '0';      
    secondNumberInput.value = '0';     
    
    // Step 10c: reset the result display to an empty string 0
    
    resultValue.textContent = '0';
    
    // Step 10d: reset the selectedOperation variable to null, indicating that no operation is currently selected
    
    selectedOperation = null;
    
    // Step 10e: use a forEach loop to go through each button in the "operationButtons" NodeList and remove the 'selected' class from all buttons
    // This way, we clear any previous highlighting of selected operation

    
    operationButtons.forEach(function(button) {
        button.classList.remove('selected');
    }) 
    // forEach(   ) = a method that executes a provided function once for each element in the NodeList
    // function(button) { } = a callback function that will be executed for each button in the NodeList, where "button" is the current button being processed in the loop
    // { button.classList.remove('selected') } = this is a part of the callback function that removes the 'selected' class from the current button, which un-highlights it if it was previously selected

    ;
    
    // Step 10f: use the in-built JS function hideStatus() to clear any previous status messages, since we are resetting the calculator and starting fresh
    hideStatus();                      
    
    // Step 10g: use console.log to log a message indicating that the calculator has been reset, for debugging purposes
    console.log('Calculator reset');
} // close the resetCalculator function

// Step 10h: use console.log to log a message indicating that the calculator app has loaded successfully, and provide instructions to the user on how to use the calculator, for debugging purposes
console.log('Calculator app loaded successfully!');
console.log('Enter two numbers, select an operation, and press = to calculate.');



// STEP 11: CREATE FUNCTIONS TO SHOW AND HIDE STATUS MESSAGES TO THE USER
// These functions will be used to provide feedback to the user about what they have done (e.g. if they forgot to enter a number, or if they successfully selected an operation). 
// This is important for user experience and helps guide the user through the application.

// Step 11a: declare a function named "showStatus" that takes two parameters: "message" and "isError"
function showStatus(message, isError) {
    
    // Step 11b: set the text content of the "statusMessage" element to the "message" parameter
    statusMessage.textContent = message;
    
    // Step 11c: use an if statement to check if "isError" is true, and if so, style the status message with red color and light red background to indicate an error
    if (isError) {
        statusMessage.style.color = '#e74c3c';
        statusMessage.style.backgroundColor = '#ffe6e6';
    } // close the if statement for error styling
    
    // Step 11d: use an else statement to style the status message with green color and light green background for non-error informational messages
    else {
        statusMessage.style.color = '#27ae60';
        statusMessage.style.backgroundColor = '#e6ffe6';
    } // close the else statement for non-error styling
    
    // Step 11e: add the 'visible' class to the statusMessage element to make it visible on the webpage
    statusMessage.classList.add('visible');
    // statusMessage = the variable we defined at the top that holds the reference to the HTML element where we show status messages to the user
    // .classList = a JS property that returns the class names of an element as a DOMTokenList, which has methods to manipulate the classes (e.g. add, remove, toggle)
    // .add('visible') = a method that adds the specified class (in this case, 'visible') to the element's class list. 
    // This will trigger any CSS styles associated with the 'visible' class, which we can use to show the status message on the webpage.
    
} // close the showStatus function

// Step 11f: declare a function named "hideStatus" that takes no parameters
function hideStatus() {
    
    // Step 11g: as per above, use classList.remove() to remove the 'visible' class from the statusMessage element, which will hide it from the webpage
    statusMessage.classList.remove('visible');
    // removing the 'visible' class will trigger the CSS to hide the status message
    // this is useful when we want to clear previous messages after a successful calculation or when resetting the calculator

} // close the hideStatus function using curly brackets

// STEP 12: ADD KEYBOARD SUPPORT (OPTIONAL ENHANCEMENT)
// This step is optional, but it can enhance the user experience
// Keyboard support is a common feature in calculator applications, making it more convenient for users

// Step 12a: use the addEventListener() method to add an event listener for the 'keypress' event on both input fields (firstNumberInput and secondNumberInput)
firstNumberInput.addEventListener('keypress', function(event) {
// firstNumberInput = the variable we defined at the top that holds the reference to the first input field element
// addEventListener( ) = a method that attaches an event handler to an element without overwriting existing event handlers.
// 'keypress' = the event that occurs when the user presses a key on the keyboard while the input field is focused
// function(event) {...} = a callback function that will be executed when the 'keypress' event occurs, where "event" is an object that contains information about the event (e.g. which key was pressed)


    // Step 12b: use if statement to define event handling logic for when the user presses the "Enter" key while focused on either input field
    if (event.key === 'Enter') {
        
        // Step 12c: use if statement to check which input field is currently focused (i.e. which one the user is currently typing in)
        if (document.activeElement === firstNumberInput) {
        // document = the global object that represents the webpage
        // activeElement = a property that returns the currently focused element in the document
        // firstNumberInput = the variable we defined at the top that holds the reference to the first input field element
        
            // If the user is currently focused on the first input field and presses Enter, we want to move the focus to the second input field for convenience
            secondNumberInput.focus();  
            // secondNumberInput = the variable we defined at the top that holds the reference to the second input field element
            // .focus() = a method that sets focus on the specified element, allowing the user to start typing in it immediately

        } // close the if statement for first input focus check
    } // close the if statement for Enter key check
}); // close the callback function using curly brackets, close the addEventListener method using parentheses

// Step 12D: add a similar event listener for the second input field to allow pressing Enter to trigger the calculation when user is focused on the second input field
secondNumberInput.addEventListener('keypress', function(event) {
    
    if (event.key === 'Enter') {
    
        calculate();
    }
});

