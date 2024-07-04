import React from 'react';

interface RemoveButtonProps {
  onRemove: () => void;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ onRemove }) => {
  return (
    <button
      className="btn btn-danger btn-sm position-absolute"
      style={{ top: 8, right: 20 }}
      onClick={onRemove}
    >
      X
    </button>
  );
};

export default RemoveButton;
