class MathMCP {
    constructor() {
        this.operations = {
            add: this.add.bind(this),
            subtract: this.subtract.bind(this),
            multiply: this.multiply.bind(this),
            divide: this.divide.bind(this),
            sqrt: this.sqrt.bind(this),
            power: this.power.bind(this)
        };
    }

    // Basic arithmetic operations
    add(a, b) {
        return this.formatResult(parseFloat(a) + parseFloat(b));
    }

    subtract(a, b) {
        return this.formatResult(parseFloat(a) - parseFloat(b));
    }

    multiply(a, b) {
        return this.formatResult(parseFloat(a) * parseFloat(b));
    }

    divide(a, b) {
        b = parseFloat(b);
        if (b === 0) {
            throw new Error("Division by zero is not allowed");
        }
        return this.formatResult(parseFloat(a) / b);
    }

    // Advanced operations
    sqrt(number) {
        number = parseFloat(number);
        if (number < 0) {
            throw new Error("Cannot calculate square root of negative number");
        }
        return this.formatResult(Math.sqrt(number));
    }

    power(base, exponent) {
        return this.formatResult(Math.pow(parseFloat(base), parseFloat(exponent)));
    }

    // Utility functions
    formatResult(result) {
        return Number.isInteger(result) ? result : parseFloat(result.toFixed(4));
    }

    // Natural language processing for math operations
    processNaturalLanguage(query) {
        query = query.toLowerCase();
        const numbers = this.extractNumbers(query);

        try {
            // Handle square root queries first
            if (query.includes('square root') || query.includes('sqrt')) {
                if (numbers.length > 0) {
                    return {
                        success: true,
                        result: this.sqrt(numbers[0])
                    };
                }
            }

            // Handle other operations
            if (numbers.length >= 2) {
                if (query.includes('add') || query.includes('plus') || query.includes('+')) {
                    return {
                        success: true,
                        result: this.add(numbers[0], numbers[1])
                    };
                } else if (query.includes('subtract') || query.includes('minus') || query.includes('-')) {
                    return {
                        success: true,
                        result: this.subtract(numbers[0], numbers[1])
                    };
                } else if (query.includes('multiply') || query.includes('times') || query.includes('*')) {
                    return {
                        success: true,
                        result: this.multiply(numbers[0], numbers[1])
                    };
                } else if (query.includes('divide') || query.includes('divided by') || query.includes('/')) {
                    return {
                        success: true,
                        result: this.divide(numbers[0], numbers[1])
                    };
                } else if (query.includes('power') || query.includes('^')) {
                    return {
                        success: true,
                        result: this.power(numbers[0], numbers[1])
                    };
                }
            }

            return {
                success: false,
                error: 'Could not understand the math operation'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    extractNumbers(text) {
        const numbers = text.match(/-?\d+\.?\d*/g);
        return numbers ? numbers.map(n => parseFloat(n)) : [];
    }

    // Main handler for math operations
    execute(operation, params) {
        try {
            if (typeof operation === 'string' && operation.trim().length > 0) {
                // Handle natural language queries
                if (operation.includes(' ') || operation.length > 10) {
                    return this.processNaturalLanguage(operation);
                }
                
                // Handle direct operation calls
                const op = this.operations[operation.toLowerCase()];
                if (op) {
                    const result = op(...Object.values(params));
                    return {
                        success: true,
                        result: result
                    };
                }
            }
            
            return {
                success: false,
                error: 'Invalid operation'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}

module.exports = new MathMCP();