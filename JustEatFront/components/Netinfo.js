import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const Netinfo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Connection.png")}
        style={styles.image}
      />
      <Text style={styles.heading}>Connection Error</Text>
      <Text style={styles.text}>
        Please check your internet connection or try again later
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    color: "#a9a9a9",
    marginVertical: 10,
  },
});

export default Netinfo;
