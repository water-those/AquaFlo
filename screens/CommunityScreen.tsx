import { Text, View, StyleSheet } from "react-native";

export default function CommunityScreen() {
  return (
    <View style={styles.container}>
      <Text>Community Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
