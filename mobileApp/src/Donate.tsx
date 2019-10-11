import React from "react";
import {View} from "react-native";
import { WebView } from "react-native-webview";
import { ActivityIndicatorLoadingView } from "./About";

const DONATE_URL = "https://paceenterprises.org/donate/";
export const Donate = () => {
  return (
    <View style={{flex: 1}}>
      <WebView
        source={{uri: DONATE_URL}}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicatorLoadingView/>}
        />
    </View>
  );
};
