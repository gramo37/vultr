/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
// import { name as appName } from './app.json';

const appName = 'main';

AppRegistry.registerComponent(appName, () => App);

if (Platform.OS === 'web') {
    const rootTag = document.getElementById('root') || document.getElementById('main');
    AppRegistry.runApplication(appName, { rootTag });
}