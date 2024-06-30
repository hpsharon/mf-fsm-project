import { FSMConfig } from 'fsm-builder';

export const fsmConfig: FSMConfig = {
  states: [
    { name: 'idle', metadata: { description: 'The initial state' } },
    { name: 'loading', metadata: { description: 'The state when loading data' } },
    { name: 'success', metadata: { description: 'The state when data loading is successful' } },
    { name: 'error', metadata: { description: 'The state when there is an error loading data' } },
  ],
  transitions: [
    { from: 'idle', to: 'loading' },
    { from: 'loading', to: 'success' },
    { from: 'loading', to: 'error' },
    { from: 'error', to: 'idle' },
  ],
};

export const fsmConfig2: FSMConfig = {
  states: [
    { name: 'StepA', metadata: { description: 'Step A' } },
    { name: 'StepB', metadata: { description: 'Step B' } },
    { name: 'StepC', metadata: { description: 'Step C' } },
    { name: 'StepD', metadata: { description: 'Step D' } },
    { name: 'StepE', metadata: { description: 'Step E' } },
  ],
  transitions: [
    { from: 'StepA', to: 'StepB' },
    { from: 'StepB', to: 'StepC' },
    { from: 'StepC', to: 'StepB' },
    { from: 'StepC', to: 'StepD' },
    { from: 'StepD', to: 'StepE' },
  ],
};
