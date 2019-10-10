'use strict';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import App from "./App";
import EventDetails from "./src/EventDetails";

const RootNavigator = createStackNavigator({
  App: {screen: App},
  EventDetails: {screen: EventDetails},
});

export default createAppContainer(RootNavigator);
