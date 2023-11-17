import React, { useEffect, useState } from 'react';
import { Handle } from 'reactflow';
import { DropButton, Select } from 'grommet';
import { updateNode } from '../flowSlice';
import { useDispatch } from 'react-redux';
import { Connect, Cubes } from 'grommet-icons';
import DropContent from '../components/node-menu/node-menu';

const ExecFlowNode = ({ id, data }) => {
  const [selectedFlow, setSelectedFlow] = useState(data.selectedFlow || '');
  const [flows, setFlows] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchFlows();
  }, []);

  const fetchFlows = async () => {
    try {
      const response = await fetch('http://localhost:3010/flows');
      const jsonFiles = await response.json();
      setFlows(jsonFiles);
    } catch (error) {
      console.error('Error fetching flows:', error);
    }
  };

  const handleFlowChange = (event) => {
    setSelectedFlow(event);
    dispatch(updateNode({ id, data: { selectedFlow: event } }));
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
    <div className="flow-node-level0">
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
      <div className="node exec-flow-node">
        <div className="node-header flow-header">
          <div className="node-title">
            <Cubes color="brand" size="large" />
          </div>
          <div className="node-title">Flow</div>
        </div>

        <div className="node-body">
          <div className="node-body-settings">
            <div className="flow-selector">
              <div className="selectedFlow">
                <Select
                  options={flows}
                  value={data.selectedFlow}
                  onChange={({ option }) => handleFlowChange(option)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default ExecFlowNode;
