const defaultState = {
  edge: []
}
const ADD_EDGE = 'ADD_EDGE'
const REMOVE_EDGE = 'REMOVE_EDGE'

export const edgeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_EDGE':
      return { ...state, edge: [...state.edge, action.payload] }
    case 'REMOVE_EDGE':
      return { ...state, edge: state.edge.filter(
          item => item.target !== action.payload
        )
      }
    default:
      return state
  }
}

export const addEdge = (payload) => ({
  type: ADD_EDGE, payload
})
export const removeEdge = (payload) => ({
  type: REMOVE_EDGE, payload
})