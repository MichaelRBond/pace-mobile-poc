import { Container, Spinner } from "native-base";
import React, { SFC } from "react";
import { Image as RnImage, StyleSheet, Text as RnText } from "react-native";
import { COLORS, logo } from "./helpers";

export const LoadingView: SFC = () => (
  <Container style={{backgroundColor: COLORS.white}}>
    <RnImage source={logo} resizeMode={"contain"} style={styles.logo}/>
    <Spinner />
    <RnText style={{textAlign: "center"}}>Loading</RnText>
  </Container>
);

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    alignSelf: "center",
    height: 63,
    marginTop: 90,
    marginBottom: 50,
  },
});
