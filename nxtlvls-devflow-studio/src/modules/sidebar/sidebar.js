import React from 'react';
import './sidebar.css';

const nodeTypes = [
  {
    type: 'inputNode',
    label: 'Input',
    inputs: [],
    outputs: ['output1'],
  },
  {
    type: 'processNode',
    label: 'Task',
    inputs: ['input1'],
    outputs: ['output1'],
  },
  {
    type: 'outputNode',
    label: 'Output',
    inputs: ['input1'],
    outputs: [],
  },
  {
    type: 'promptProcessNode',
    label: 'Prompt',
    inputs: ['input1'],
    outputs: ['output1'],
  },
  {
    type: 'ifNode',
    label: 'Condition',
    inputs: ['input1'],
    outputs: ['output1', 'output2'],
  },
  {
    type: 'execFlowNode',
    label: 'Flow',
    inputs: ['input1'],
    outputs: ['output1'],
  },
];

const Sidebar = ({ onDragStart }) => {
  return (
    <div className="sidebar">
      <ul className="node-types-list">
        {nodeTypes.map((nodeType, index) => (
          <li
            key={index}
            className="node-type-item"
            draggable={true}
            onDragStart={(event) => onDragStart(event, nodeType)}
          >
            {nodeType.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
