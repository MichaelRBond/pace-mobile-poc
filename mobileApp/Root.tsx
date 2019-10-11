"use strict";

import { Icon } from "native-base";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Enum } from "typescript-string-enums";
import App from "./App";
import { About } from "./src/About";
import { Donate } from "./src/Donate";
import EventDetails from "./src/EventDetails";

interface TabDetails {
  name: string;
  icon: string;
  iconType: "AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "FontAwesome5" | "Foundation" | "Ionicons" | "MaterialCommunityIcons" | "MaterialIcons" | "Octicons" | "SimpleLineIcons" | "Zocial";
}

const Routes = Enum(
  "communication",
  "communicationDetails",
  "about",
  "donate",
);

const createTabStack = (routeName: string, screen: any) => createStackNavigator({
  [routeName]: { screen },
}, {
  headerMode: "none",
  initialRouteName: routeName,
});

export function getTabDetails(routeName: string): TabDetails {
  switch (routeName) {
    case Routes.communication:
      return { name: "Posts", icon: "event-note", iconType: "MaterialIcons" };
    case Routes.about:
      return { name: "About", icon: "people", iconType: "MaterialIcons" };
    case Routes.donate:
      return { name: "Donate", icon: "hands", iconType: "FontAwesome5" };
    default:
      return { name: "?", icon: "exclefile1", iconType: "MaterialIcons" };
  }
}

const HomeTabsNavigator = createBottomTabNavigator(
  {
    [Routes.communication]: createTabStack(Routes.communication, App),
    [Routes.about]: createTabStack(Routes.about, About),
    [Routes.donate]: createTabStack(Routes.donate, Donate),
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      const textIconColor = (focused: boolean) => focused ? "#364BC4" : "#8a8a8f";
      return {
        tabBarIcon: ({ focused }) => {
          const { icon, iconType } = getTabDetails(routeName);
          return <Icon name={icon} style={styles.base} type={iconType} color={textIconColor(focused)} />;
        },
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: textIconColor(focused), fontSize: 13 }}>{getTabDetails(routeName).name}</Text>
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
  CommunicationsStack: { screen: HomeTabsNavigator, navigationOptions: { title: "PACE Enterprise" } },
  EventDetails: { screen: EventDetails, navigationOptions: { title: "Event Details" } },
}, {
  headerMode: "float",
  headerBackgroundTransitionPreset: "fade",

});

const styles = StyleSheet.create({
  base: {
    fontSize: 22,
    flexBasis: 25,
  },
});

export default createAppContainer(RootNavigator);

