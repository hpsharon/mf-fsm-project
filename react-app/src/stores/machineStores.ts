import { FSMStore } from './fsmStore';
import { makeObservable, override } from 'mobx';

export class RetryMachineStore extends FSMStore {
  constructor(id: string, initialState: string, config: any) {
    super(id, initialState, config);
    makeObservable(this, {
      handleAutomaticTransitions: override
    });
  }

  handleAutomaticTransitions() {
    if (this.currentState === 'Running') {
      const successChance = Math.random() > 0.5;
      const nextState = successChance ? 'Success' : 'Failure';
      const delay = successChance ? 0 : 3000;
      setTimeout(() => {
        this.transitionTo(nextState);
      }, delay);
    } else if (this.currentState === 'Failure') {
      setTimeout(() => {
        this.transitionTo('Running');
      }, 3000);
    } else {
      super.handleAutomaticTransitions();
    }
  }
}

export class TrafficLightStore extends FSMStore {
  constructor(id: string, initialState: string, config: any) {
    super(id, initialState, config);
    makeObservable(this, {
      handleAutomaticTransitions: override
    });
  }
}

export class VendingMachineStore extends FSMStore {
  constructor(id: string, initialState: string, config: any) {
    super(id, initialState, config);
    makeObservable(this, {
      handleAutomaticTransitions: override
    });
  }
}

export class JavaScriptPromiseStore extends FSMStore {
  constructor(id: string, initialState: string, config: any) {
    super(id, initialState, config);
    makeObservable(this, {
      handleAutomaticTransitions: override
    });
  }
}
