import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux'
import configureStore from './lib/redux/configureStore'
import {PersistGate} from 'redux-persist/integration/react'
import { LocalAuthentication } from 'expo'

import MainScreen from './screens/MainScreen'

const persistorStore = configureStore();

class Root extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasHardwareAuth: undefined,
      hasFingerPrint: undefined,
      hasFaceUnlock: undefined
    }
  }

  _checkHardwareAuth() {
    LocalAuthentication.hasHardwareAsync()
        .then(res => {
          console.log('hasHardwareAuth', res)

          this.setState({hasHardwareAuth: res})

          if (res) {
            LocalAuthentication.supportedAuthenticationTypesAsync()
                .then(res => {
                  console.log('supportedAuthenticationTypes', res)

                  const hasFingerPrint = res.includes(1);
                  const hasFaceUnlock = res.includes(2);

                  this.setState({
                    hasFingerPrint,
                    hasFaceUnlock
                  })
                })
                .catch(error => {console.error(error)})
          }

        })
        .catch(error => {console.error(error)})
  }

  componentDidMount() {
    this._checkHardwareAuth()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.hasHardwareAuth && this.state.hasHardwareAuth) {
      console.log('Device supports hardware auth')

    }
  }

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
