import { View, Text, StyleSheet, Image, useWindowDimensions } from "react-native";
import React from "react";
import Colors from "../constants/Colours";
// import onboardimage from "../assets/onboardingimg.png";
// interface Props{
//   id: string,
//   title: string,
//   description: string,
//   image: string,
// }

export default function OnboardingItem({ item }) {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <Image source={item.image} style={[styles.image, { width, resizeMode: "contain" }]} />

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

  image: {
    flex: 0.5,
    justifyContent: "center",
    marginTop: 60,
    marginBottom: 60,
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
