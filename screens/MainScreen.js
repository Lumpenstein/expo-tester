import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {connect} from 'react-redux'

class MainScreen extends Component {
  render() {
    console.log('rendering mainscreen');

    return (
        <View>
          <Text>Test: {this.props.root.test}</Text>
        </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('State', state);
  return {...state};
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
