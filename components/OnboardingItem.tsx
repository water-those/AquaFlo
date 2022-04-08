import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { color } from "react-native-reanimated";
import Colors from "../constants/Colours";

export default OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.Image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />

      <View style={{ flex: 0.4 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
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
    flex: 0.7,
    justifyContent: "center",
  },

  title: {
    color: Colors.black,
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },

  description: {
    color: Colors.Background1,
    fontWeight: "600",
    fontSize: 13,
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    marginBottom: 30,
  },
});
