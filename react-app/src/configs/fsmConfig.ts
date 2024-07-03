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
    { from: 'Red', to: 'YellowRed', delay: 5000 },
    { from: 'YellowRed', to: 'Green', delay: 2000 },
    { from: 'Green', to: 'BlinkGreen', delay: 5000 },
    { from: 'BlinkGreen', to: 'YellowAfterGreen', delay: 2000 },
    { from: 'YellowAfterGreen', to: 'Red', delay: 2000 }
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
    { from: 'TwoCoins', to: 'Vending', delay: 2000 },
    { from: 'Vending', to: 'Idle', delay: 2000 }
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
    { from: 'CardInserted', to: 'PinEntered' }, // 0.5 second delay for entering the PIN
    { from: 'PinEntered', to: 'SelectingTransaction' }, // 1 second delay for selecting transaction
    { from: 'SelectingTransaction', to: 'TransactionInProgress', delay: 2000 }, // 2 second delay for processing transaction
    { from: 'TransactionInProgress', to: 'TransactionComplete', delay: 3000 }, // 3 seconds delay for completing transaction
    { from: 'TransactionComplete', to: 'CardEjected', delay: 2000 }, // 2 seconds delay for ejecting the card
    { from: 'CardEjected', to: 'Idle', delay: 1000 }
  ]
};
