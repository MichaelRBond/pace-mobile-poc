import React, { Component } from 'react';
import {
  Platform,
  Text,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<any, any> {
  componentDidMount() {
    SplashScreen && SplashScreen.hide();
  }

  public render() {
    return <Text>{instructions}</Text>;
  }
}