"use strict";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import App from "./App";
import EventDetails from "./src/EventDetails";
import { About } from "./src/About";
import { Enum } from "typescript-string-enums";
import { Icon } from "native-base";
import { Text, StyleSheet } from "react-native";
import React, { Component } from "react";

interface TabDetails {
  name: string;
  icon: string;
}

const Routes = Enum(
  "communication",
  "communicationDetails",
  "about"
)

const createTabStack = (routeName: string, screen: any) => createStackNavigator({
  [routeName]: { screen },
}, {
  headerMode: "none",
  initialRouteName: routeName,
});

export function getTabDetails(routeName: string): TabDetails {
  switch (routeName) {
    case Routes.communication:
      return {name: "Posts", icon: "event-note"};
    case Routes.about:
      return {name: "About", icon: "people"};
    default:
      return {name: "?", icon: "exclefile1"};
  }
}

const HomeTabsNavigator = createBottomTabNavigator(
  {
    [Routes.communication]: createTabStack(Routes.communication, App),
    [Routes.about]: createTabStack(Routes.about, About),
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      const textIconColor = (focused: boolean) => focused ? "#364BC4" : "#8a8a8f";
      return {
        tabBarIcon: ({focused}) => {
          const { icon, } = getTabDetails(routeName);
          return <Icon name={icon} style={styles.base} type="MaterialIcons" color={textIconColor(focused)}/>;
        },
        tabBarLabel: ({focused}) => (
          <Text style={{color: textIconColor(focused), fontSize: 13}}>{getTabDetails(routeName).name}</Text>
        ),
      };
    },
    tabBarOptions: {
      style: {
        paddingTop: 6,
      },
      tabStyle: {
        alignItems: "center",
        justifyContent: "space-evenly",
      },
    },
  },
);


const RootNavigator = createStackNavigator({
  CommunicationsStack: HomeTabsNavigator,
  EventDetails: {screen: EventDetails},
}, {
  headerMode: "none",
});

const styles = StyleSheet.create({
  base: {
    fontSize: 22,
    flexBasis: 25,
  },
});

export default createAppContainer(RootNavigator);

