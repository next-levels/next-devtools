// src/components/CodeEditor.js
import React, { useState } from 'react';
import './code-editor.css';

const CodeEditor = ({ onSave, initialValue }) => {
  const [value, setValue] = useState(initialValue || '');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSave = () => {
    onSave(value);
  };

  return (
    <div className="code-editor">
      <textarea value={value} onChange={handleChange} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default CodeEditor;
