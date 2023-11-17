// AddFlowModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';

const AddFlowModal = ({ isOpen, onRequestClose, onAddFlow }) => {
  const [flowName, setFlowName] = useState('');
  const [contextVariables, setContextVariables] = useState('');

  const handleSubmit = () => {
    onAddFlow({ flowName, contextVariables });
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} appElement={document.getElementById('root')}>
      <h2>Add Flow</h2>
      <label htmlFor="flowName">Flow Name:</label>
      <input
        type="text"
        id="flowName"
        value={flowName}
        onChange={(e) => setFlowName(e.target.value)}
      />
      <br />
      <label htmlFor="contextVariables">Context Variables:</label>
      <input
        type="text"
        id="contextVariables"
        value={contextVariables}
        onChange={(e) => setContextVariables(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Add Flow</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
};

export default AddFlowModal;
