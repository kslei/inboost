const defaultState = {
  data: []
}
const ADD_DATA = 'ADD_DATA'
const REMOVE_DATA = 'REMOVE_DATA'

export const dataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_DATA': 
      return {...state, data: [...state.data, action.payload]}
    case 'REMOVE_DATA':
      return {...state, data: state.data.filter(
        item => item.id !== action.payload
      )}
    default:
      return state
  }
}

export const addData = (payload) => ({
  type: ADD_DATA, payload
})
export const removeData = (payload) => ({
  type: REMOVE_DATA, payload
})