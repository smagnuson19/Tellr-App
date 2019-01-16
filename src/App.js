import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import RootStack from './navigation/navigation';
import ActionTypes from './actions/index';
import reducers from './reducers';

const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
));

AsyncStorage.getItem('token').then((token) => {
  if (token != null) {
    store.dispatch({ type: ActionTypes.AUTH_USER });
  }
});


// disable really annoying in app warnings
console.disableYellowBox = true;
//  <BottomTabBar /> - put this in below, was buggy error
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
