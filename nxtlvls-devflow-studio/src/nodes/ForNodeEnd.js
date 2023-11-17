import React from 'react';
import { Handle } from 'reactflow';
import {FiRotateCcw} from "react-icons/fi";

const ForNodeEnd = ({ data }) => {
  return (
    <div className="node for-node-end operation-node">
      <div className="node-title"><FiRotateCcw /></div>
      <div className="node-input">
        <div className="input-label"></div>
        <Handle type="target" position="left" style={{ background: '#555' }} />
      </div>
      <div className="node-output">
        <Handle type="source" position="right" style={{ background: '#555' }} />
        <div className="output-label"></div>
      </div>
    </div>
  );
};

export default ForNodeEnd;
