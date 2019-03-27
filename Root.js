import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux'
import configureStore from './lib/redux/configureStore'
import {PersistGate} from 'redux-persist/integration/react'

import MainScreen from './screens/MainScreen'

const persistorStore = configureStore();

class Root extends Component {
  render() {
    console.log('ZERTY', persistorStore);
    return (
      <View>

        <Provider store={persistorStore.store}>

          <PersistGate loading={null} persistor={persistorStore.persistor}>

            <Text>Expo Tester</Text>

            <MainScreen/>

          </PersistGate>

        </Provider>

      </View>
    )
  }
}

export default Root;
