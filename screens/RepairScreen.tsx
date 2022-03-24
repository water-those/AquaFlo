import { Text, View, StyleSheet } from "react-native";

export default function RepairScreen() {
  return (
    <View style={styles.container}>
      <Text>Repair Screen!</Text>
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
