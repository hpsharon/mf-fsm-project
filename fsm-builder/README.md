
# FSM Builder

`fsm-builder` is a TypeScript library for creating and managing finite state machines (FSM) in React.js applications. It provides a flexible and extensible way to define states and transitions, manage state logic, and visualize state changes.

## Features

- Define states and transitions with optional delays.
- Handle state transitions programmatically.
- Visualize the current state and available transitions.
- Timer support for delayed state transitions.
- Easy integration with React applications.


## Installation

To install the `fsm-builder` package, run:

```bash
npm install fsm-builder
```

## Example

Here is a complete example of how to use `fsm-builder` to create and manage a traffic light FSM in a React application.

```typescript
import React, { useState } from 'react';
import FSMComponent from 'fsm-builder';

const trafficLightConfig = {
    initialState: 'red',
    states: [
        { name: 'red' },
        { name: 'yellow' },
        { name: 'green' }
    ],
    transitions: [
        { from: 'red', to: 'green', delay: 1000 },
        { from: 'green', to: 'yellow', delay: 1000 },
        { from: 'yellow', to: 'red', delay: 1000 }
    ]
};

const App: React.FC = () => {
    const [currentState, setCurrentState] = useState(trafficLightConfig.initialState);
    
    const handleTransition = (nextState: string) => {
      setCurrentState(nextState);
    };
    
    return (
    <div className="App">
        <FSMComponent
        config={trafficLightConfig}
        currentState={currentState}
        onTransition={handleTransition}
        />
    </div>
  );
};

export default App;
```

## Development

### Build the Package

To build the `fsm-builder` package, run:

```bash
npm run build
```

### Watch for Changes

To watch for changes and rebuild automatically, run:

```bash
npm run watch
```
