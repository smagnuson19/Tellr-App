import React, { Component } from 'react';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import OneSignal from 'react-native-onesignal';
import RootStack from './navigation/navigation';
import reducers from './reducers';


const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
));


// disable really annoying in app warnings
console.disableYellowBox = true;
//  <BottomTabBar /> - put this in below, was buggy error

export default class App extends Component {
  constructor(properties) {
    super(properties);
    // need to setup app first
    OneSignal.init('YOUR_ONESIGNAL_APPID');

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
