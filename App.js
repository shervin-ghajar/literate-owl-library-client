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

import Stacks from './navigations/stacks';
import { primaryBackground } from './assets/colors';
import FlashMessage from "react-native-flash-message";
//------------------------------------------------------------------------------------------
class App extends Component {

  componentDidMount() {
    // NetInfo.addEventListener(state => {
    //   console.log("Connection type", state.type);
    //   console.log("Is connected?", state.isConnected);
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
          <Stacks />
          <FlashMessage ref="myLocalFlashMessage" />
        </PersistGate>
      </Provider>
    );
  };
}
//-------------------------------------------------------------------------------

export default App;
