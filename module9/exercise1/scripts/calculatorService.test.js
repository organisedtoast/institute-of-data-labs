const calculatorService = require('../services/calculatorService');

describe('calculatorService', () => {
    test('add returns the sum of two numbers', () => {
        expect(calculatorService.add(10, 5)).toBe(15);
    });

    test('subtract returns the difference of two numbers', () => {
        expect(calculatorService.subtract(10, 5)).toBe(5);
    });

    test('multiply returns the product of two numbers', () => {
        expect(calculatorService.multiply(10, 5)).toBe(50);
    });

    test('divide returns an object with the quotient when divisor is not zero', () => {
        expect(calculatorService.divide(10, 5)).toEqual({ result: 2 });
    });

    test('divide returns an error object when divisor is zero', () => {
        expect(calculatorService.divide(10, 0)).toEqual({
            error: 'Cannot divide by zero',
        });
    });
});
