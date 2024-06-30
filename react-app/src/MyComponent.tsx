import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FSMComponent } from 'fsm-builder';
import { fsmConfig, fsmConfig2 } from './fsmConfig';
import { createFSMStore, FSMStoreType } from './fsmStore';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

const MyComponent: React.FC = observer(() => {
  const [fsmStore1, setFSMStore1] = useState<FSMStoreType | null>(null);
  const [fsmStore2, setFSMStore2] = useState<FSMStoreType | null>(null);

  const handleTransition1 = (nextState: string) => {
    if (fsmStore1) {
      fsmStore1.transitionTo(nextState);
    }
  };

  const handleTransition2 = (nextState: string) => {
    if (fsmStore2) {
      fsmStore2.transitionTo(nextState);
    }
  };

  const handleCreateSuccess1 = () => {
    if (!fsmStore1) {
      const id = Math.random().toString(36).substring(7);
      const store = createFSMStore(id, 'idle');
      setFSMStore1(store);
    }
  };

  const handleCreateSuccess2 = () => {
    if (!fsmStore2) {
      const id = Math.random().toString(36).substring(7);
      const store = createFSMStore(id, 'StepA');
      setFSMStore2(store);
    }
  };

  const handleReset1 = () => {
    if (fsmStore1) {
      fsmStore1.transitionTo('idle');
    }
  };

  const handleReset2 = () => {
    if (fsmStore2) {
      fsmStore2.transitionTo('StepA');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-6 mb-3">
          <div className="border p-3">
            <h2 className="my-3">FSM 1</h2>
            <FSMComponent
              config={fsmConfig}
              currentState={fsmStore1?.currentState || 'idle'}
              onTransition={handleTransition1}
              onCreateSuccess={handleCreateSuccess1}
              resetOptions={{ allowReset: true, onReset: handleReset1 }}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-3">
          <div className="border p-3">
            <h2 className="my-3">FSM 2</h2>
            <FSMComponent
              config={fsmConfig2}
              currentState={fsmStore2?.currentState || 'StepA'}
              onTransition={handleTransition2}
              onCreateSuccess={handleCreateSuccess2}
              resetOptions={{ allowReset: true, onReset: handleReset2 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default MyComponent;
