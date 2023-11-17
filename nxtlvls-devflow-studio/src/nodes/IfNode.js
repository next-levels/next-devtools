import React from 'react';
import { Handle } from 'reactflow';
 import {DropButton, TextInput} from "grommet";
import {Connect, Directions} from "grommet-icons";
import DropContent from "../components/node-menu/node-menu";
import {useDispatch} from "react-redux";
import {updateNode} from "../flowSlice";

const IfNode = ({ id, data }) => {
   const [open, setOpen] = React.useState();
  const dispatch = useDispatch();

  const handleConditionChange = (event) => {
    dispatch(updateNode({ id, data: { condition: event } }));
  };
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
    <div className="node if-node helper-node">
      <div className="node-header helper-header">
        <div className="node-title">
          <Directions color="brand" size="large" />
        </div>
        <div className="node-title">Condition</div>
      </div>

      <div className="node-body">
        <div className="node-body-settings">
          <div className="output-name">
            <TextInput
              placeholder={'=array'}
              value={data.condition}
              onChange={(event) => handleConditionChange(event.target.value)}
            />
          </div>
        </div>
      </div>

    </div>
      <div className="node-input">
        <div className="input-label"></div>
        <Handle type="target" position="left" style={{ background: '#555' }} />
      </div>
      <div className="node-outputs">
        <div className="output-true">
          <Handle type="source" position="right" style={{ background: '#388E3C', top: '30%' }} />
          <div className="output-label"></div>
        </div>
        <div className="output-false">
          <Handle type="source" position="right" style={{ background: '#FF5252', bottom: '30%' }} />
          <div className="output-label"></div>
        </div>
      </div>
    </div>
  );
};

export default IfNode;
