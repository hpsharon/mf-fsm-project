export const trafficLightConfig = {
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

export const vendingMachineConfig = {
  states: [
    { name: 'Idle' },
    { name: 'OneCoin' },
    { name: 'TwoCoins' },
    { name: 'Vending' }
  ],
  transitions: [
    { from: 'Idle', to: 'OneCoin' },
    { from: 'OneCoin', to: 'TwoCoins' },
    { from: 'TwoCoins', to: 'Vending', delay: 0 },
    { from: 'Vending', to: 'Idle', delay: 3000 }
  ]
};

export const jsPromiseConfig = {
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

export const retryMachineConfig = {
  states: [
    { name: 'Idle' },
    { name: 'Running' },
    { name: 'Success' },
    { name: 'Failure' }
  ],
  transitions: [
    { from: 'Idle', to: 'Running' },
    { from: 'Running', to: 'Success' },
    { from: 'Running', to: 'Failure' },
    { from: 'Failure', to: 'Running', delay: 3000 }
  ]
};
