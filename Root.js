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
      hasHardwareAuthChecked: false,
      hasHardwareAuth: false,
      hasFingerPrint: false,
      hasFaceUnlock: false,
      hasExistingAuthData: false
    }
  }

  async _checkHardwareAuth() {

    try {
      const hasHardwareAuth = await LocalAuthentication.hasHardwareAsync();
      console.log('hasHardwareAuth', hasHardwareAuth)
      this.setState({hasHardwareAuth: hasHardwareAuth})

      if (hasHardwareAuth) {
        const supportedAuthTypes = await LocalAuthentication.supportedAuthenticationTypesAsync()
        console.log('supportedAuthenticationTypes', supportedAuthTypes)
        const hasFingerPrint = supportedAuthTypes.includes(1);
        const hasFaceUnlock = supportedAuthTypes.includes(2);

        this.setState({
          hasFingerPrint,
          hasFaceUnlock
        })
      }

    } catch (error) {
      console.error(error)
    }
  }

  async _checkForExistingAuthData() {
    try {
      const hasExistingAuthData = await LocalAuthentication.isEnrolledAsync()
      console.log('hasExistingAuthData', hasExistingAuthData)
      this.setState({hasExistingAuthData: hasExistingAuthData})

    } catch(error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this._checkHardwareAuth().then(() => {
      console.log('Hardware got checked');
      this.setState({hasHardwareAuthChecked: true});

      console.log('hasHardwareAuth', this.state.hasHardwareAuth);
      if (this.state.hasHardwareAuth) {
        this._checkForExistingAuthData();
      }
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
            <Text>hasHardwareAuthChecked: {this.state.hasHardwareAuthChecked.toString()}</Text>
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
