import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';
import { addData, removeData } from './store/dataReducer';
import { addEdge, removeEdge } from './store/edgeReducer';
import './styles/node.css'

const handleStyle = { minWidth: 0, width: 0, minHeight:0, height: 0, background: "#ADB5BD" };

function Node({ data, isConnectable }) {
  const dispatch = useDispatch()
  const newdata = useSelector(state => state.data.data)
  const setNewData = (data) => {
    dispatch(addData(data))
  }
  const setNewEdge = (edge) => {
    dispatch(addEdge(edge))
  }
  const removeNewData = (id) => {
    dispatch(removeData(id))
  }
  const removeNewEdge = (id) => {
    dispatch(removeEdge(id))
  }
  const onChack = (e) => {
    let options = data.options.filter(item => item.id === Number(e.target.id))[0]
    let edge = {source: data.id, target: e.target.id}
    if (e.target.checked) {
      setNewData(options)
      setNewEdge(edge)
    } else {
      removeNewData(Number(e.target.id))
      removeNewEdge(e.target.id)
    }  
  };
  const [vis, setVis] = useState(false)
  
  return (
    <div className="node" onBlur={() => setVis(false)}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} style={handleStyle} />
      <div className='white'></div>
      <div className='button'
        style={{ border: vis ? '1px solid #EAF2FF' : '0.658077px solid #479F76', borderBottomLeftRadius: vis ? 0: '4px',
          borderBottomRightRadius: vis ? 0: '4px' }}
        onClick={() => setVis(!vis)} 
      >
        <span>{data.value}</span>
        <img src='arrow_down.png' style={{ transform: vis ? 'rotate(180deg)' : 'rotate(0)' }} alt={vis ? 'up' : 'down'} className='image '></img>
      </div>
      
      <Handle type="source" position={Position.Bottom} id='b' isConnectable={isConnectable} style = {handleStyle}/>
      {vis &&<div className='items'>
        {data.options && data.options.map(item => (
          <div className='item' key={item.id}>
            <input type="checkbox" className="custom-checkbox" id={item.id} onChange={e => onChack(e)} checked={newdata.length&&newdata.map(data => data.id).find(i=>i===item.id)? true : false}/>
            <label htmlFor={item.id}></label>
            <span>Варіант {item.option}</span>
          </div>
        ))}
      </div>}
      
    </div>
  );
}

export default Node;