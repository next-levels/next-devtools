import React from 'react';
import { Handle } from 'reactflow';
import {FiRotateCw} from "react-icons/fi";

const ForNodeStart = ({ data }) => {
  return (
    <div className="node for-node-start operation-node">
      <div className="node-title"><FiRotateCw /></div>
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

export default ForNodeStart;
