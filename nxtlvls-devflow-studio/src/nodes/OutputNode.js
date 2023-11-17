import React from 'react';
import { Handle } from 'reactflow';
import { DropButton, TextInput } from 'grommet';
import { Connect, CloudUpload } from 'grommet-icons';
import DropContent from '../components/node-menu/node-menu';
import { updateNode } from '../flowSlice';
import { useDispatch } from 'react-redux';

const OutputNode = ({ id, data }) => {
  const [open, setOpen] = React.useState();
  const dispatch = useDispatch();

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleOutputNameChange = (event) => {
    dispatch(updateNode({ id, data: { outputName: event } }));
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
      <div className="node output-node helper-node">
        <div className="node-header helper-header">
          <div className="node-title">
            <CloudUpload color="brand" size="large" />
          </div>
          <div className="node-title">Output</div>
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
          </div>
        </div>
      </div>
      <div className="node-input">
        <div className="input-label"></div>
        <Handle type="target" position="left" style={{ background: '#555' }} />
      </div>
    </div>
  );
};

export default OutputNode;
