import React from 'react';
import { Handle } from 'reactflow';
import {CloudUpload} from "grommet-icons";

const EndNode = ({ data }) => {
  return (
    <div className="helper-node-level0">
      <div className="node end-node helper-node">
        <div className="node-header helper-header">
          <div className="node-title">

          </div>
          <div className="node-title">End</div>
        </div>

      </div>
      <div className="node-input">
        <Handle
          type="target"
          position="left"
          style={{ background: '#555' }}
        />
      </div>
    </div>
  );
};

export default EndNode;
