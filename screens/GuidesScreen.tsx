import { Text, View, StyleSheet } from "react-native";

export default function GuidesScreen() {
  return (
    <View style={styles.container}>
      <Text>Guides Screen!</Text>
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
