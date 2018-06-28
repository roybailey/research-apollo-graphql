import * as React from 'react';
import { Component } from 'react'
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { createBrowserHistory } from 'history'
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'

import { ApolloProvider } from 'react-apollo';
import initApolloClient from "./apolloClient";

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { AppLayout } from './AppLayout';
import { DinnerContainer } from './components/DinnerContainer';
import { TodoContainer } from './components/TodoContainer';

import initStore from './store'
const history = createBrowserHistory()
const store = initStore(history)


const Home = (props:React.Props<any>) => (
  <div>
      <h1>React Apollo GraphQL Brown Bag Demo</h1>
  </div>
);


const AppRoute = ({component: Component, ...rest}:any) => {
  return (
    <Route {...rest} render={matchProps => (
      <AppLayout>
        <Component {...matchProps} />
      </AppLayout>
    )} />
  )
};


ReactDOM.render(
  <ApolloProvider client={initApolloClient('http://localhost:7777/graphql', store)}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
          <Switch>
            <AppRoute exact={true} path="/" component={Home} />
            <AppRoute path="/dinner" component={DinnerContainer} />
            <AppRoute path="/todo" component={TodoContainer} />
          </Switch>
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
