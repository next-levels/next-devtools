import React, { useState, useEffect, useContext } from 'react';
import {
  Handle,
  useEdgesState,
  useNodesState,
  useUpdateNodeInternals,
} from 'reactflow';
import { Button, DropButton, Select, TextInput } from 'grommet';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedFlow, updateNode } from '../flowSlice';
import { Code, Connect } from 'grommet-icons';
import DropContent from '../components/node-menu/node-menu';
import PropTypes from 'prop-types';
import WebSocketContext from '../WebSocketContext';

const promptTypes = [
  {
    value: 'like-template',
    label: 'Datei nach Tempalte',
    requiredParameters: ['template', 'config'],
  },
  {
    value: 'prompt2',
    label: 'Prompt 2',
    requiredParameters: ['Param 3', 'Param 4'],
  },
  {
    value: 'prompt3',
    label: 'Prompt 3',
    requiredParameters: ['Param 5'],
  },
];

DropContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const align = { top: 'bottom' };

const PromptProcessNode = ({ id, data }) => {
  const [selectedPrompt, setSelectedPrompt] = useState(
    data.selectedPrompt || ''
  );
  const [requiredParams, setRequiredParams] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const dispatch = useDispatch();
  const selectedFlow = useSelector(selectSelectedFlow);
  const updateNodeInternals = useUpdateNodeInternals();
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
    if (selectedFlow) {
      setNodes(selectedFlow.flowData.nodes || []);
    }
  }, [selectedFlow]);

  useEffect(() => {
    if (selectedFlow) {
      setEdges(selectedFlow.flowData.edges || []);
    }
  }, [nodes, selectedFlow]);

  setTimeout(() => {
    updateNodeInternals(id);
  }, 1000);

  useEffect(() => {
    const inputEdges = edges.filter((edge) => edge.target === id);
    const inputNodes = inputEdges.map((edge) =>
      nodes.find((node) => node.id === edge.source)
    );

    if (selectedPrompt) {
      const selectedOption = promptTypes.find(
        (prompt) => prompt.value === selectedPrompt
      );
      if (selectedOption) {
        setRequiredParams(selectedOption.requiredParameters);
      }

      const requiredParamsSet = new Set(requiredParams);
      const providedParams = inputNodes.flatMap((node) => node.data.outputName);
      const providedParamsSet = new Set(providedParams);
      const isValidInput = [...requiredParamsSet].every((param) =>
        providedParamsSet.has(param)
      );
      updateNodeInternals(id);

      //setIsValid(isValidInput);
    } else {
      // setIsValid(true);
    }
  }, [selectedPrompt]);

  const handlePromptChange = (event) => {
    const selectedOption = promptTypes.find((prompt) => prompt.value === event);
    setSelectedPrompt(event);
    if (selectedOption) {
      setRequiredParams(selectedOption.requiredParameters);
    }
    dispatch(updateNode({ id, data: { selectedPrompt: event } }));
  };

  const handleContextChange = (event) => {
    dispatch(updateNode({ id, data: { context: event } }));
  };

  const [open, setOpen] = React.useState();
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className={state}>
      <div className={'node-actions'}>
        <DropButton
          className={'node-button'}
          size="small"
          icon={<Connect />}
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          dropContent={<DropContent onClose={onClose} id={id} logs={logs} />}
          dropProps={{ align }}
        />
      </div>

      <div
        className={`node prompt-process-node ${!isValid ? 'invalid' : ''}`}
        style={{ borderColor: isValid ? '' : 'red' }}
      >
        <div className="node-header">
          <div className="node-title">
            <Code color="brand" size="large" />
          </div>
          <div className="node-title">Prompt</div>
        </div>

        <div className="node-body">
          <div className="node-body-settings">
            <div className="selectedPrompt">
              <Select
                className="node-body-settings-button"
                options={promptTypes}
                value={selectedPrompt}
                onChange={({ option }) => handlePromptChange(option.value)}
              />
            </div>

            <div className="context">
              <label htmlFor={`context-${id}`}></label>
              <TextInput
                placeholder={'Context'}
                value={data.context}
                onChange={(event) => handleContextChange(event.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="node-input dynamic-inputs">
        {requiredParams.map((param, index) => (
          <div
            key={index}
            className="required-param"
            style={{ top: 40 + (60 / requiredParams.length) * index + '%' }}
          >
            <div className="input-label">{param}</div>
            <Handle
              type="target"
              position="left"
              style={{ background: '#555' }}
              id={param}
            />
          </div>
        ))}
      </div>
      <div className="node-output">
        <div className="output-label"></div>
        <Handle type="source" position="right" style={{ background: '#555' }} />
      </div>
    </div>
  );
};

export default PromptProcessNode;
