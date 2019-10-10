'use strict';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import App from "./App";

const RootNavigator = createStackNavigator({
  App: {screen: App},
});

export default createAppContainer(RootNavigator);
