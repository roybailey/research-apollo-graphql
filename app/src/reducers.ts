import { combineReducers, Reducer } from 'redux'
import { RouterState } from 'connected-react-router'
import { ReduxCache, apolloReducer } from 'apollo-cache-redux';

import counterReducer from './counterReducer'

const rootReducer = combineReducers({
  count: counterReducer,
  apollo: apolloReducer
})

export interface IState {
  count: number
  router: RouterState
  apollo: Reducer<any>
}

export default rootReducer
