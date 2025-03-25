# MCP Math Server

A Node.js server that handles mathematical calculations and natural language math queries.

## Features

- Basic arithmetic operations (add, subtract, multiply, divide)
- Advanced operations (square root, power)
- Natural language processing for math queries
- RESTful API endpoints
- CORS enabled
- Error handling

## Installation

```bash
npm install
```

## Usage

Start the server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## API Endpoints

### 1. Calculate Endpoint

```
POST /calculate
```

Body:
```json
{
    "operation": "add",
    "params": { "a": 5, "b": 3 }
}
```

### 2. Natural Language Endpoint

```
POST /natural
```

Body:
```json
{
    "query": "what is 5 plus 3"
}
```

## Supported Operations

- Addition: "add", "plus", "+"
- Subtraction: "subtract", "minus", "-"
- Multiplication: "multiply", "times", "*"
- Division: "divide", "divided by", "/"
- Square Root: "square root", "sqrt"
- Power: "power", "^"

## License

MIT