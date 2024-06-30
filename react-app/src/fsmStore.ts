import { makeAutoObservable } from 'mobx';

class FSMStore {
  id: string;
  currentState: string;

  constructor(id: string, initialState: string) {
    this.id = id;
    this.currentState = initialState;
    makeAutoObservable(this);
  }

  transitionTo(nextState: string) {
    this.currentState = nextState;
  }
}

export const createFSMStore = (id: string, initialState: string) => new FSMStore(id, initialState);
export type FSMStoreType = FSMStore;
