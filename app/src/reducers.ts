import { combineReducers, Reducer } from 'redux'
import { RouterState } from 'connected-react-router'
import { ReduxCache, apolloReducer } from 'apollo-cache-redux';
import { reducer as formReducer, FormState } from 'redux-form'

import counterReducer from './counterReducer'

const rootReducer = combineReducers({
  count: counterReducer,
  apollo: apolloReducer,
  form: formReducer
})

export interface IState {
  count: number
  router: RouterState
  apollo: any
  form: FormState
}

export default rootReducer
