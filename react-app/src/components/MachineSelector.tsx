import React from 'react';

interface MachineOption {
  label: string;
  config: any;
}

interface MachineSelectorProps {
  machineOptions: MachineOption[];
  selectedMachine: MachineOption;
  setSelectedMachine: (option: MachineOption) => void;
  handleAddMachine: () => void;
}

const MachineSelector: React.FC<MachineSelectorProps> = ({
                                                           machineOptions,
                                                           selectedMachine,
                                                           setSelectedMachine,
                                                           handleAddMachine
                                                         }) => {
  return (
    <div className="d-flex">
      <select
        className="form-select me-2"
        value={selectedMachine.label}
        onChange={(e) =>
          setSelectedMachine(
            machineOptions.find((option) => option.label === e.target.value)!
          )
        }
      >
        {machineOptions.map((option) => (
          <option key={option.label} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>
      <button className="btn btn-primary" onClick={handleAddMachine}>
        Add Machine
      </button>
    </div>
  );
};

export default MachineSelector;
