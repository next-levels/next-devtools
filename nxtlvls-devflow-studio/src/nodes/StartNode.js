import React from 'react';
import { Handle } from 'reactflow';

const StartNode = ({ data }) => {
  return (
    <div className="helper-node-level0">
      <div className="node start-node helper-node">
        <div className="node-header helper-header">
          <div className="node-title">

          </div>
          <div className="node-title">Start</div>
        </div>

      </div>
      <div className="node-output">
        <Handle
          type="source"
          position="right"
          style={{ background: '#555' }}
          id={'start'}
        />
      </div>
    </div>
  );
};

export default StartNode;
