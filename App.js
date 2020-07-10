/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './services/store';
//------------------------------------------------------------------------------------------
import AuthStack from './navigations/auth_stacks';
import { primaryBackground } from './assets/colors';
//------------------------------------------------------------------------------------------
class App extends Component {

  componentDidMount() {
    // NetInfo.addEventListener(state => {
    //   console.warn("Connection type", state.type);
    //   console.warn("Is connected?", state.isConnected);
    // });
  }

  LoadingView() {
    return (
      <View style={{ flex: 1, backgroundColor: primaryBackground }} />
    )
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} onBeforeLift={this.onBeforeLift}>
          <AuthStack />
        </PersistGate>
      </Provider>
    );
  };
}
//-------------------------------------------------------------------------------

export default App;
