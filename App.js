import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import MainApp from './src/Navigation';
import { persistor, store } from './src/store/store';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import CustomStatusBar from './src/Components/CustomStatusBar';
const THEME_COLOR = '#F5F5F5';
const App = () => {
  if(Platform.OS ==='android') {
    SystemNavigationBar.stickyImmersive()
   }
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastProvider>
            <CustomStatusBar backgroundColor={THEME_COLOR} barStyle="dark-content" />
            <MainApp />
              </ToastProvider>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
