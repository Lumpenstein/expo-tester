import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux'
import configureStore from './lib/redux/configureStore'
import {PersistGate} from 'redux-persist/integration/react'
import { LocalAuthentication } from 'expo'

import MainScreen from './screens/MainScreen'

const {store, persistor} = configureStore();

class Root extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasHardwareAuth: false,
      hasFingerPrint: false,
      hasFaceUnlock: false,
      hasExistingAuthData: false
    }
  }

  async _checkHardwareAuth() {
    try {
      const res = await Promise.all([
        LocalAuthentication.hasHardwareAsync(),
        LocalAuthentication.isEnrolledAsync(),
        LocalAuthentication.supportedAuthenticationTypesAsync()
      ])

      console.log('_checkHardwareAuth', res);

      this.setState({
        hasHardwareAuth: res[0],
        hasExistingAuthData: res[1],
        hasFingerPrint: Array.isArray(res[2]) ? res[2].includes(1) : false,
        hasFaceUnlock: Array.isArray(res[2]) ? res[2].includes(2) : false
      })
    } catch (e) {
      console.error(e);
    }
  }

  componentDidMount() {
    this._checkHardwareAuth().then(() => {
      console.log('Hardware got checked');
    })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState, this.state);
  }

  render() {
    console.log('Render: Persisted Store', store, this.state.hasHardwareAuth);
    return (
      <View>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>

            <Text>Expo Tester</Text>

            <Text>AUTHENTICATION:</Text>
            <Text>hasHardwareAuth: {this.state.hasHardwareAuth.toString()}</Text>
            <Text>hasFingerPrint: {this.state.hasFingerPrint.toString()}</Text>
            <Text>hasFaceUnlock: {this.state.hasFaceUnlock.toString()}</Text>
            <Text>hasExistingAuthData: {this.state.hasExistingAuthData.toString()}</Text>

            <MainScreen/>

          </PersistGate>
        </Provider>
      </View>
    )
  }
}

export default Root;
