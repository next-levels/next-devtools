import React, { useState } from 'react';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from '../../modules/sidebar/sidebar';
import AddFlowModal from '../../components/add-flow-modal/add-flow-modal';
import FlowCanvas from '../../modules/flowcanvas/flowcanvas';
import DebugSidebar from '../../components/debug-sidebar/debug-sidebar';
import { Button, TextInput } from 'grommet';
import { Bug, Configure, Download, Play, Save, Add } from 'grommet-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFlow,
  selectFlow,
  selectSelectedFlow,
  triggerOpenSidebar, triggerSaveFlow,
} from '../../flowSlice';
import io from 'socket.io-client';

const socket = io('http://localhost:3010');

function FlowPage() {
  const startNodeId = uuidv4();
  const endNodeId = uuidv4();
  const [isAddFlowModalOpen, setIsAddFlowModalOpen] = useState(false);
  const selectedFlow = useSelector(selectSelectedFlow);
  const dispatch = useDispatch();

  const onNodeDragStart = (event, nodeType) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/reactflow', nodeType.type);
      event.dataTransfer.effectAllowed = 'move';
    }
  };

  const handleAddFlow = (newFlow) => {
    console.log('New flow:', newFlow);
    const newFlowData = {
      name: newFlow.flowName,
      params: newFlow.contextVariables
        .split(',')
        .map((variable) => variable.trim()),
      flowData: {
        nodes: [
          {
            id: startNodeId,
            type: 'startNode',
            position: { x: 50, y: 200 },
            data: { label: 'Start' },
          },
          {
            id: endNodeId,
            type: 'endNode',
            position: { x: 600, y: 200 },
            data: { label: 'End' },
          },
        ],
        edges: [],
      },
    };
    dispatch(selectFlow(newFlowData));
  };

  const setValue = (value) => {};

  const sendCommand = () => {
    console.log('selectedFlow', selectedFlow);
    if (selectedFlow) {
      let command = {
        command: selectedFlow.name,
        data: selectedFlow.config,
      };
      socket.emit('debug_command', JSON.stringify(command));
    }
  };

  const setSidebar = () => {
    dispatch(triggerOpenSidebar());
  };

  const triggerSave = () => {
    dispatch(triggerSaveFlow());
  };

  return (
    <div className="app">
      <Sidebar onDragStart={onNodeDragStart} />
      <div style={{ position: 'absolute', right: 0, top: '157px' }}>
        <DebugSidebar socket={socket} />
      </div>

      {/*<button onClick={() => setIsAddFlowModalOpen(true)}>Add Flow</button>  */}

      <div className={'reactflow-toolbar-wrapper'}>
        <div>
          <div style={{ display: 'flex' }}>
            <TextInput
              placeholder="Flow Name"
              value={selectedFlow?.name}
              onChange={(event) => setValue(event.target.value)}
            />
            <Button
              primary
              size="small"
              onClick={() => sendCommand()}
              icon={<Play />}
              label=""
            />
            <Button
              light
              size="small"
              style={{ background: '#dfdfdf' }}
              icon={<Configure />}
              onClick={() => setSidebar()}
              label=""
            />
            <Button primary size="small" icon={<Bug />} label="" />
          </div>

          <div className="action-wrapper">
            <Button primary size="small" icon={<Download />} label="Download" />
            <Button primary size="small" icon={<Save />}   onClick={() => triggerSave()} label="Save" />
            <Button
              primary
              size="small"
              icon={<Add />}
              onClick={() => setIsAddFlowModalOpen(true)}
              label="Save"
            />
          </div>
        </div>
      </div>

      <AddFlowModal
        isOpen={isAddFlowModalOpen}
        onRequestClose={() => setIsAddFlowModalOpen(false)}
        onAddFlow={handleAddFlow}
      />
      <FlowCanvas socket={socket} onDragStart={onNodeDragStart} />
      {/* Pass the prop here */}
    </div>
  );
}

export default FlowPage;
