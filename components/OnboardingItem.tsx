import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import Colors from "../constants/Colours";

export default function OnboardingItem({ item }: any) {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      {item.image}
      <View style={{ flex: 0.4 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: Colors.black,
    fontWeight: "700",
    fontSize: 18,
    marginBottom: "7%",
    textAlign: "center",
  },

  description: {
    color: Colors.grey,
    fontWeight: "600",
    fontSize: 13,
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    marginBottom: 30,
  },
});
