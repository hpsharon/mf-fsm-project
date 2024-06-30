import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FSMComponent } from 'fsm-builder';
import { fsmConfig } from './fsmConfig';
import { createFSMStore, FSMStoreType } from './fsmStore';

const MyComponent: React.FC = observer(() => {
  const [fsmStore, setFSMStore] = useState<FSMStoreType | null>(null);

  const handleTransition = (nextState: string) => {
    if (fsmStore) {
      fsmStore.transitionTo(nextState);
    }
  };

  const handleCreateSuccess = () => {
    if (!fsmStore) {
      const id = Math.random().toString(36).substring(7);
      const store = createFSMStore(id, 'idle');
      setFSMStore(store);
    }
  };

  return (
    <FSMComponent
      config={fsmConfig}
      currentState={fsmStore?.currentState || 'idle'}
      onTransition={handleTransition}
      onCreateSuccess={handleCreateSuccess}
    />
  );
});

export default MyComponent;
