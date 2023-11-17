import React, { useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import 'reactflow/dist/style.css';
import InputNode from '../../nodes/InputNode';
import ProcessNode from '../../nodes/ProcessNode';
import OutputNode from '../../nodes/OutputNode';
import TemplateInputNode from '../../nodes/TemplateInputNode';
import GroupNode from '../group-node/group-node';
import ExecFlowNode from '../../nodes/ExecFlowNode';
import StartNode from '../../nodes/StartNode';
import EndNode from '../../nodes/EndNode';
import ForNodeStart from '../../nodes/ForNodeStart';
import IfNode from '../../nodes/IfNode';
import ForNodeEnd from '../../nodes/ForNodeEnd';
import PromptProcessNode from '../../nodes/PromptProcessNode';
import {openSidebar, saveFlow, selectSelectedFlow, updateNode} from '../../flowSlice';
import { useDispatch, useSelector } from 'react-redux';
import WebSocketContext from "../../WebSocketContext";

const nodeTypes = {
  inputNode: InputNode,
  processNode: ProcessNode,
  outputNode: OutputNode,
  groupNode: GroupNode,
  execFlowNode: ExecFlowNode,
  startNode: StartNode,
  endNode: EndNode,
  ifNode: IfNode,
  forNodeStart: ForNodeStart,
  forNodeEnd: ForNodeEnd,
  templateInputNode: TemplateInputNode,
  promptProcessNode: PromptProcessNode,
};

const initialFlowData = {
  name: 'New Flow',
  params: [],
  nodes: [
    {
      id: '1',
      type: 'startNode',
      position: { x: 50, y: 200 },
      data: { label: 'Start' },
    },
    {
      id: '2',
      type: 'endNode',
      position: { x: 600, y: 200 },
      data: { label: 'End' },
    },
  ],
  edges: [],
};
function Flow({ onNodeDragStart, socket }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialFlowData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialFlowData.edges);
  const selectedFlow = useSelector(selectSelectedFlow);
  const trigger = useSelector(saveFlow);
  const dispatch = useDispatch();


  useEffect(() => {
    if (selectedFlow) {
      setNodes(selectedFlow.flowData.nodes || []);
    }
  }, [selectedFlow]);

  useEffect(() => {
    if (selectedFlow) {
      setEdges(selectedFlow.flowData.edges || []);
    }
  }, [selectedFlow, nodes]);

  useEffect(() => {
    saveFlowCall()
  }, [trigger]); // listen for changes to the trigger state



  const onNodeDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = event.target.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = {
      id: `node-${nodes.length + edges.length}`,
      type,
      position,
      data: { label: type },
    };

    setNodes((nodes) => nodes.concat(newNode));

    saveFlowCall();
  };

  const onConnect = (params) => {
    const newEdge = {
      id: `edge-${nodes.length + edges.length}`,
      ...params,
      animated: true,
    };

    console.log('newEdge:', newEdge);

    setEdges((edges) => edges.concat(newEdge));
    saveFlowCall();
  };

  const serializeGraph = () => {
    const serializedNodes = nodes.map((node) => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: node.data,
    }));

    const serializedEdges = edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
    }));

    const serializedGraph = {
      nodes: serializedNodes,
      edges: serializedEdges,
    };

    return JSON.stringify(serializedGraph, null, 2);
  };

  const saveFlowCall = async () => {
    if (selectedFlow) {
      const flowName = selectedFlow?.name;
      const params = selectedFlow?.params;
      const config = selectedFlow?.config;
      const flowData = serializeGraph();
      console.log(JSON.stringify({ flowName, params, config, flowData }));

      const response = await fetch('http://localhost:3010/save-flow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ flowName, params, config, flowData }),
      });

      if (response.ok) {
        console.log('Flow saved successfully');
      } else {
        console.error('Error saving the flow');
      }
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const saveToFile = (data, filename) => {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    const serializedData = {
      nodes: nodes,
      edges: edges,
    };
    saveToFile(serializedData, selectedFlow?.name + '.json');
  };

  return (
    <div
      style={{ width: '100vw', height: '85vh' }}
      className={'reactflow-wrapper'}
      onDragOver={onDragOver}
      onDrop={onNodeDrop}
    >
      {' '}
      <WebSocketContext.Provider value={socket}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onNodeDragStart={onNodeDragStart}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          minZoom={0.2}
          maxZoom={8}
          defaultViewport={{ zoom: 4, x: 0, y: 0 }}
          fitView   >
          <Background variant="dots" gap={16} size={1} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </WebSocketContext.Provider>
    </div>
  );
}

const FlowCanvas = ({ onNodeDragStart, socket }) => {
  return (
    <ReactFlowProvider>
      <Flow onNodeDragStart={onNodeDragStart} socket={socket} />
    </ReactFlowProvider>
  );
};

export default FlowCanvas;
