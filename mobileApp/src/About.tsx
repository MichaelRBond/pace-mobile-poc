import { Spinner } from "native-base";
import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

const ABOUT_URL = "https://paceenterprises.org/about/";

export const ActivityIndicatorLoadingView = () => {
  return (
    <Spinner />
  );
};

export const About = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
      source={{ uri: ABOUT_URL }}
      renderLoading={() => <ActivityIndicatorLoadingView />}
      startInLoadingState={true}
    />
    </View>
  );
};
