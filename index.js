import { AppRegistry, LogBox } from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';
import App from './App';
import headlessLocationService from './src/services/headlessLocationService';

LogBox.ignoreLogs([
  'Remote debugger',
  'VirtualizedLists should never be nested',
]);

AppRegistry.registerComponent('MapMyDrive', () => App);

BackgroundGeolocation.registerHeadlessTask(headlessLocationService);
