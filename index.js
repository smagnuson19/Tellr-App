/** @format */
import { AppRegistry } from 'react-native';
import { Client } from 'bugsnag-react-native';
import App from './src/App';
import { name as appName } from './app.json';

const bugsnag = new Client('93454d19034bb201dac58d2174490e78');

AppRegistry.registerComponent(appName, () => App);
