import React, { useState } from 'react';
import { Handle } from 'reactflow';
import { DropButton, TextInput } from 'grommet';
import { useDispatch } from 'react-redux';
import { updateNode } from '../flowSlice';
import { Connect, CloudDownload } from 'grommet-icons';
import DropContent from '../components/node-menu/node-menu';

const InputNode = ({ id, data }) => {
  const dispatch = useDispatch();

  const handleOutputNameChange = (event) => {
    dispatch(updateNode({ id, data: { outputName: event } }));
  };

  const handleContentChange = (event) => {
    dispatch(updateNode({ id, data: { content: event } }));
  };

  const [open, setOpen] = React.useState();
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const align = { top: 'bottom' };

  return (
    <div className="helper-node-level0">
      <div className={'node-actions'}>
        <DropButton
          className={'node-button'}
          size="small"
          icon={<Connect />}
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          dropContent={<DropContent onClose={onClose} />}
          dropProps={{ align }}
        />
      </div>
      <div className="node input-node helper-node">
        <div className="node-header helper-header">
          <div className="node-title">
            <CloudDownload color="brand" size="large" />
          </div>
          <div className="node-title">Input</div>
        </div>

        <div className="node-body">
          <div className="node-body-settings">
            <div className="output-name">
              <TextInput
                placeholder={'Name'}
                value={data.outputName}
                onChange={(event) => handleOutputNameChange(event.target.value)}
              />
            </div>
            <div className="content">
              <TextInput
                placeholder={'Value'}
                value={data.content}
                onChange={(event) => handleContentChange(event.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="node-output">
        <Handle
          type="source"
          position="right"
          id={'node-output-generic'}
          style={{ background: '#555' }}
        />
      </div>
    </div>
  );
};

export default InputNode;
