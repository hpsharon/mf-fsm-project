import {FSMConfig} from "fsm-builder";

export const trafficLightConfig: FSMConfig = {
  initialState: 'Red',
  states: [
    { name: 'Red' },
    { name: 'YellowRed' },
    { name: 'Green' },
    { name: 'BlinkGreen' },
    { name: 'YellowAfterGreen' }
  ],
  transitions: [
    { from: 'Red', to: 'YellowRed'  },
    { from: 'YellowRed', to: 'Green' },
    { from: 'Green', to: 'BlinkGreen' },
    { from: 'BlinkGreen', to: 'YellowAfterGreen' },
    { from: 'YellowAfterGreen', to: 'Red' }
  ]
};

export const vendingMachineConfig: FSMConfig = {
  initialState: 'Idle',
  states: [
    { name: 'Idle' },
    { name: 'OneCoin' },
    { name: 'TwoCoins' },
    { name: 'Vending' }
  ],
  transitions: [
    { from: 'Idle', to: 'OneCoin' },
    { from: 'OneCoin', to: 'TwoCoins' },
    { from: 'TwoCoins', to: 'Vending' },
    { from: 'Vending', to: 'Idle' }
  ]
};


export const jsPromiseConfig: FSMConfig = {
  initialState: 'Pending',
  states: [
    { name: 'Pending' },
    { name: 'Fulfilled' },
    { name: 'Rejected' }
  ],
  transitions: [
    { from: 'Pending', to: 'Fulfilled' },
    { from: 'Pending', to: 'Rejected' }
  ]
};

export const elevatorConfig: FSMConfig = {
  initialState: 'Idle',
  states: [
    { name: 'Idle' },
    { name: 'MovingUp' },
    { name: 'MovingDown' },
    { name: 'DoorsOpen' }
  ],
  transitions: [
    { from: 'Idle', to: 'MovingUp' },
    { from: 'Idle', to: 'MovingDown' },
    { from: 'MovingUp', to: 'Idle' },
    { from: 'MovingDown', to: 'Idle' },
    { from: 'Idle', to: 'DoorsOpen' },
    { from: 'DoorsOpen', to: 'Idle' }
  ]
};


export const orderProcessingConfig: FSMConfig = {
  initialState: 'OrderPlaced',
  states: [
    { name: 'OrderPlaced' },
    { name: 'Processing' },
    { name: 'Shipped' },
    { name: 'Delivered' },
    { name: 'Cancelled' }
  ],
  transitions: [
    { from: 'OrderPlaced', to: 'Processing' },
    { from: 'Processing', to: 'Shipped' },
    { from: 'Shipped', to: 'Delivered' },
    { from: 'OrderPlaced', to: 'Cancelled' },
    { from: 'Processing', to: 'Cancelled' }
  ]
};

export const bookingSystemConfig:FSMConfig = {
  initialState: 'Available',
  states: [
    { name: 'Available' },
    { name: 'Reserved' },
    { name: 'Booked' },
    { name: 'Cancelled' }
  ],
  transitions: [
    { from: 'Available', to: 'Reserved' },
    { from: 'Reserved', to: 'Booked' },
    { from: 'Reserved', to: 'Cancelled' },
    { from: 'Booked', to: 'Cancelled' }
  ]
};

export const authenticationConfig:FSMConfig = {
  initialState: 'LoggedOut',
  states: [
    { name: 'LoggedOut' },
    { name: 'LoggingIn' },
    { name: 'LoggedIn' },
    { name: 'Error' }
  ],
  transitions: [
    { from: 'LoggedOut', to: 'LoggingIn' },
    { from: 'LoggingIn', to: 'LoggedIn' },
    { from: 'LoggingIn', to: 'Error' },
    { from: 'Error', to: 'LoggingIn' },
    { from: 'LoggedIn', to: 'LoggedOut' }
  ]
};

export const atmTransactionConfig:FSMConfig = {
  initialState: 'Idle',
  states: [
    { name: 'Idle' },
    { name: 'CardInserted' },
    { name: 'PinEntered' },
    { name: 'SelectingTransaction' },
    { name: 'TransactionInProgress' },
    { name: 'TransactionComplete' },
    { name: 'CardEjected' }
  ],
  transitions: [
    { from: 'Idle', to: 'CardInserted' },
    { from: 'CardInserted', to: 'PinEntered' },
    { from: 'PinEntered', to: 'SelectingTransaction' },
    { from: 'SelectingTransaction', to: 'TransactionInProgress' },
    { from: 'TransactionInProgress', to: 'TransactionComplete' },
    { from: 'TransactionComplete', to: 'CardEjected' },
    { from: 'CardEjected', to: 'Idle' }
  ]
};
