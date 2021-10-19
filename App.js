import React from 'react';
// import '@react-native-firebase/admob';
import '@react-native-firebase/analytics';
import '@react-native-firebase/dynamic-links';
import '@react-native-firebase/storage';
import { firebase } from '@react-native-firebase/crashlytics';
import { Provider } from 'react-redux';
import { Root, StyleProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appearance, Alert } from 'react-native';
import { Router } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/es/integration/react';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import { persistor, store } from './src/store/index';
import MainApp from './src';
import getTheme from './native-base-theme/components';
import theme from './native-base-theme/variables/commonColor';
import Routes from './src/navigation';
import Loading from './src/components/Loading';

// Hide StatusBar on Android as it overlaps tabs
// if (Platform.OS === 'android') StatusBar.setHidden(true);

const useDarkMode = Appearance.getColorScheme() === 'dark';

setJSExceptionHandler((error, isFatal) => {
  // This is your custom global error handler
  // You do stuff like show an error dialog
  // or hit google analytics to track crashes
  // or hit a custom api to inform the dev team.
  firebase.crashlytics().recordError(error);
  if (isFatal) {
    Alert.alert(
      'Unexpected error occurred',
      `
      ${isFatal ? 'Fatal Error:' : 'Error:'} ${error.name} ${error.message}

      We have reported this to our team!
      `,
      [
        {
          text: 'Close',
        },
      ]
    );
  } else {
    // console.log(error);
  }
});

setNativeExceptionHandler((exceptionString) => {
  // This is your custom global error handler
  // You do stuff likehit google analytics to track crashes.
  // or hit a custom api to inform the dev team.
  // NOTE: alert or showing any UI change via JS
  // WILL NOT WORK in case of NATIVE ERRORS.
  firebase.crashlytics().recordError(new Error(exceptionString));
  // console.log(exceptionString);
});

const App = () => {
  return (
    <SafeAreaProvider
      style={{ backgroundColor: useDarkMode ? '#000000' : '#E9E9EF' }}
    >
      <Root>
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <StyleProvider style={getTheme(theme)}>
              <>
                <Router>{Routes}</Router>
                <MainApp />
              </>
            </StyleProvider>
          </PersistGate>
        </Provider>
      </Root>
    </SafeAreaProvider>
  );
};

export default App;
