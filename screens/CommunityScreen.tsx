import { Text, View, StyleSheet } from "react-native";
import TopBar from "../components/topbar";

export default function CommunityScreen() {
  return (
    <View style={styles.container}>
      <TopBar title="Community"></TopBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
