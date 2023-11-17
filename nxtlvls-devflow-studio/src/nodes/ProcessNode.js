import React, {useContext, useEffect, useState} from 'react';
import {Handle, useEdgesState} from 'reactflow';
import { DropButton, Select } from 'grommet';
import { useDispatch } from 'react-redux';
import { updateNode } from '../flowSlice';
import { Connect, Console } from 'grommet-icons';
import DropContent from '../components/node-menu/node-menu';
import WebSocketContext from "../WebSocketContext";

const ProcessNode = ({ id, data }) => {
  const [selectedTask, setSelectedTask] = useState(data.selectedTask || '');
  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();
  const socket = useContext(WebSocketContext);
  const [state, setState] = useState('idle');
  const [logs, setLogs] = useEdgesState([]);


  useEffect(() => {
    socket.on('log', (message) => {
      const nodeId = message.split(':')[0];
      const type = message.split(':')[1];
      if (nodeId && nodeId === id) {
        logs.push(message.split(':')[1] + message.split(':')[2]);
        if (type === 'state') {
          setState(message.split(':')[2]);
        }
      }
    });
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3010/tasks');
      const jsonFiles = await response.json();
      setTasks(jsonFiles);
    } catch (error) {
      console.error('Error fetching flows:', error);
    }
  };

  const handleTaskChange = (event) => {
    setSelectedTask(event);
    dispatch(updateNode({ id, data: { selectedTask: event } }));
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
    <div className={'process-node-level0 '+state}  >
      <div className={'node-actions'}>
        <DropButton
          className={'node-button'}
          size="small"
          icon={<Connect />}
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          dropContent={<DropContent id={id} onClose={onClose} logs={logs} />}
          dropProps={{ align }}
        />
      </div>
      <div className="node process-node">
        <div className="node-header task-header">
          <div className="node-title">
            <Console color="brand" size="large" />
          </div>
          <div className="node-title">Task</div>
        </div>

        <div className="node-body">
          <div className="node-body-settings">
            <div className="selectedFlow">
              <Select
                options={tasks}
                value={data.selectedTask}
                onChange={({ option }) => handleTaskChange(option)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="node-input node-input-default">
        <div className="input-label">Data</div>
        <Handle type="target" position="left" style={{ background: '#555' }} />
      </div>
      <div className="node-output">
        <Handle type="source" position="right" style={{ background: '#555' }} />
        <div className="output-label"></div>
      </div>
    </div>
  );
};

export default ProcessNode;
