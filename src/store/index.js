import { combineReducers, createStore } from "redux";
import { dataReducer } from "./dataReducer";
import { edgeReducer } from "./edgeReducer";

const rootReducer = combineReducers({
  data: dataReducer,
  edge: edgeReducer,
})

export const store = createStore(rootReducer)