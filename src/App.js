import React, { useEffect, useState, useCallback } from 'react';
import { options } from './const/consts';
import ReactFlow, { useNodesState, addEdge, applyEdgeChanges, applyNodeChanges, MarkerType } from 'reactflow';
import Node from './Node';
import { useSelector } from 'react-redux';
import 'reactflow/dist/style.css';
import './styles/base.css'

const rfStyle = {
  backgroundColor: '#FFFFFF',
};
 
const initialNodes = [
  { id: '0', type: 'Updater', position: { x: 720, y: 20 }, data: { value: 'Вибрати значення', options: options, id: '0' } },
];
const nodeTypes = { Updater: Node };

function App() {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useState([]);
  const newData = useSelector(state => state.data.data)
  const newEdge = useSelector(state => state.edge.edge)
    
  const newNodes = () => {
    let arr = newData.map(item => {
      let id = item.id.toString()
      return { id: id, type: 'Updater', position: { x: id.split('')[id.length - 1] * 350 - 330, y: id.length*230}, data: {value: item.option, options: item.options, id: id}}
    })
    setNodes(initialNodes.concat(arr))
  }
  const newEdges = () => {
    let arr = newEdge.map(item => {
      return {
        id: item.source + '-' + item.target, source: item.source, target: item.target, type: 'smoothstep', markerEnd: { type: MarkerType.Arrow, width: 20, height: 20 }, markerStart: 'circle' 
      }
    })
    setEdges(arr)
  }
  useEffect(()=>{
    newNodes()
    newEdges()
  }, [newData, newEdge])

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <svg style={{ position: 'absolute', top: 6, left: 6 }}>
        <defs>
          <marker
            id="circle"
            viewBox="0 0 6 6"
            markerHeight={6}
            markerWidth={6}
            refX={3}
            refY={4}
          >
            <circle cx="3" cy="3" r="2" stroke="#ADB5BD" fill="#ADB5BD" strokeWidth="2" />
          </marker>
        </defs>
      </svg>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView = {false}
        style={rfStyle}
      />
    </div>
  );
}

export default App;