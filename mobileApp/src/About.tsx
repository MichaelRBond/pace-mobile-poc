import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

const ABOUT_URL = "https://paceenterprises.org/about/";
export const About = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: ABOUT_URL }} />
    </View>
  );
};
