// import the useState hook from React to manage state in the functional component
import { useState } from 'react';

// create a functional component named Calculator 
// this component will render a simple calculator interface
// with input fields, operator selection and result display
export default function Calculator() {
  
  // declare state variables for input numbers, operator and result
  const [inputNumber1, setInputNumber1] = useState('');
  const [inputNumber2, setInputNumber2] = useState('');
  const [operator, setOperator] = useState('add');
  const [result, setResult] = useState(null);

  // declare a function to handle calculation based on the selected operator
  const handleCalculate = () => {

    // parse the input numbers to floats for calculation
    // this allows for decimal calculations and ensures the inputs are treated as numbers
    const num1 = parseFloat(inputNumber1);
    const num2 = parseFloat(inputNumber2);
    
    // Validate inputs
    switch (operator) {
      case 'add':
        setResult(num1 + num2);
        break;
      case 'subtract':
        setResult(num1 - num2);
        break;
      case 'multiply':
        setResult(num1 * num2);
        break;
      case 'divide':
        // Handle division by zero case
        // If num2 is zero, set result to an error message instead of performing division
        setResult(num2 !== 0 ? num1 / num2 : 'Error: Division by zero');
        break;
      default:
        setResult(null);
    }
  };

  return (

    // The main container for the calculator, styled with inline styles for simplicity
    <div style={{ 
      maxWidth: '400px', 
      padding: '20px', 
      margin: '20px auto', 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      backgroundColor: '#fff'
    }}>

      {/* The header and description of the calculator, styled for better presentation   */}
      <h2 style={{ 
        fontSize: '1.5rem', 
        marginBottom: '10px', 
        color: '#333',
        textAlign: 'center'
      }}>
        Man Utd Finance: Personal Loan Calculator
      </h2>
      <p style={{ 
        color: '#666', 
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        Can't afford our merchandise? Take out a personal loan with Man Utd Finance, exclusive to genuine fans only!
      </p>

      {/* Input field for the first number, styled for better user experience */}
      <div className="input-field" style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Number 1:</label>
        <input
          type="number"
          className="input-field"
          value={inputNumber1}
          onChange={(e) => setInputNumber1(e.target.value)}
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>

      {/* Input field for the second number, styled similarly to the first input field */}
      <div className="input-field" style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Number 2:</label>
        <input
          type="number"
          className="input-field"
          value={inputNumber2}
          onChange={(e) => setInputNumber2(e.target.value)}
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>

      {/* Dropdown for selecting the operator, styled for better user experience */}
      <div className="operator-dropdown" style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Operator:</label>
        <select
          className="operator-dropdown"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        >
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
          <option value="multiply">Multiply (×)</option>
          <option value="divide">Divide (÷)</option>
        </select>
      </div>


    {/* Calculate button, styled for better user experience */}
    <button
        className="calculate-button"
        onClick={handleCalculate}
        style={{ 
          width: '100%', 
          padding: '10px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: 'bold',
          marginBottom: '15px'
        }}
      >
        Calculate
      </button>

      {/* Result display panel, styled to differentiate it from the input section and highlight the result       */}
      <div className="result-panel" style={{ 
        padding: '15px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '4px', 
        border: '1px solid #dee2e6',
        textAlign: 'center'
      }}>

        {/* Display the result with a label, styled to make the result stand out */}
        <span style={{ fontWeight: 'bold', marginRight: '10px' }}>Result:</span>
        <span style={{ fontSize: '1.2rem', color: '#28a745' }}>
          {result !== null ? result : '-'}
        </span>
      </div>
    </div>
  );
}
