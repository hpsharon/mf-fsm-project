import React from 'react';
import { FSMComponent } from 'fsm-builder';

interface Machine {
  id: string;
  label: string;
  store: any;
  currentState: string;
}

interface MachineCardProps {
  machine: Machine;
  onTransition: (id: string, nextState: string) => void;
  onRemove: (id: string) => void;
}

const MachineCard: React.FC<MachineCardProps> = React.memo(({ machine, onTransition, onRemove }) => (
  <div className="col-lg-4 col-md-6 mb-3 position-relative">
    <div className="border p-3">
      <button
        className="btn btn-danger btn-sm position-absolute"
        style={{ top: 10, right: 10 }}
        onClick={() => onRemove(machine.id)}
      >
        X
      </button>
      <h2 className="my-3">{machine.label}</h2>
      <FSMComponent
        config={machine.store.config}
        currentState={machine.currentState}
        onTransition={(nextState: string) => onTransition(machine.id, nextState)}
      />
    </div>
  </div>
));

export default MachineCard;
