import React, { Component } from 'react';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import OneSignal from 'react-native-onesignal';
import RootStack from './navigation/navigation';
import deviceStorage from './actions/deviceStorage';
import NavigationService from './navigation/navigationService';

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
    OneSignal.init('4e80c299-4fec-4279-bde3-3cdffbb24e1d', { kOSSettingsKeyAutoPrompt: true });

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure();
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

    if (device.userId !== undefined) {
      console.log('Device info: ', device);
      deviceStorage.saveItem('deviceInfo', device.userId);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <RootStack
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
