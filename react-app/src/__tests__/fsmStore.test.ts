import { FSMStore } from '../stores/fsmStore';

const config = {
  initialState: 'idle',
  states: [
    { name: 'idle' },
    { name: 'active' },
    { name: 'finished' },
  ],
  transitions: [
    { from: 'idle', to: 'active' },
    { from: 'active', to: 'finished' },
    { from: 'finished', to: 'idle' },
  ],
};

describe('FSMStore', () => {
  it('should initialize with the initial state', () => {
    const fsmStore = new FSMStore('1', config);
    expect(fsmStore.currentState).toBe('idle');
  });

  it('should transition to a valid state', () => {
    const fsmStore = new FSMStore('1', config);
    fsmStore.transitionTo('active');
    expect(fsmStore.currentState).toBe('active');
    fsmStore.transitionTo('finished');
    expect(fsmStore.currentState).toBe('finished');
  });
});
