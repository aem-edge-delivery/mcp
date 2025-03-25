const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mathMCP = require('./mathMCP');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.post('/calculate', (req, res) => {
    const { operation, params } = req.body;
    const result = mathMCP.execute(operation, params);
    res.json(result);
});

app.post('/natural', (req, res) => {
    const { query } = req.body;
    const result = mathMCP.execute(query);
    res.json(result);
});

// API Documentation route
app.get('/', (req, res) => {
    res.json({
        name: 'MCP Math Server',
        version: '1.0.0',
        endpoints: {
            '/calculate': {
                method: 'POST',
                description: 'Execute a math operation',
                body: {
                    operation: 'String (add, subtract, multiply, divide, sqrt, power)',
                    params: 'Object containing operation parameters'
                },
                example: {
                    operation: 'add',
                    params: { a: 5, b: 3 }
                }
            },
            '/natural': {
                method: 'POST',
                description: 'Process natural language math queries',
                body: {
                    query: 'String (e.g., "what is the square root of 16")'
                },
                example: {
                    query: 'add 5 and 3'
                }
            }
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// Start server
app.listen(port, () => {
    console.log(`MCP Math Server running on port ${port}`);
});