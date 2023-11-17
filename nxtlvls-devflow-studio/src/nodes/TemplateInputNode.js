import React, { useState } from 'react';
import Modal from "../components/modal/modal";
import CodeEditor from "../components/code-editor/code-editor";


const TemplateInputNode = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filledStatus = data.value ? 'filled' : 'unfilled';

  return (
    <div className="node template-input-node">
      <div className="node-title">{data.label}</div>
      <button onClick={openModal} className={`edit-button ${filledStatus}`}>Edit</button>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <CodeEditor onSave={closeModal} initialValue={data.value} />
      </Modal>
    </div>
  );
};

export default TemplateInputNode;
