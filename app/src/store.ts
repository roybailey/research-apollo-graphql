import { createStore, combineReducers, applyMiddleware, Store, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router'

import rootReducer from './reducers'

const initStore = (history:any): Store<any> => {
  const middlewares:any = [
      routerMiddleware(history), // for dispatching history actions
  ];

  const enhancer = process.env.NODE_ENV === 'development'
      ? composeWithDevTools(applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares);

  // const rootReducer = combineReducers(rootReducer)

  // const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    connectRouter(history)(rootReducer),
    enhancer,
  )
  
  // const store = createStore(
  //   connectRouter(history)(rootReducer),
  //   enhancer
  // );

  return store;
};

export default initStore;
