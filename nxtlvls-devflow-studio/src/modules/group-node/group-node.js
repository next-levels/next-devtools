import React from 'react';
import { Handle } from 'reactflow';

const GroupNode = ({ data }) => {
  const { contextVars } = data;

  return (
    <div className="group-node">
      <h4>Group Node</h4>
      <div className="group-node-inputs">
        {contextVars.map((contextVar, index) => (
          <div className="group-node-input" key={index}>
            <Handle type="target" position="left" id={`input-${index}`} />
            <div className="group-node-input-label">{contextVar.label}</div>
          </div>
        ))}
      </div>
      <Handle type="source" position="right" id="output" />
    </div>
  );
};

export default GroupNode;
