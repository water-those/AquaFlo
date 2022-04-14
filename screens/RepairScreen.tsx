import { Text, ScrollView, View, StyleSheet } from "react-native";
import TopBar from "../components/topbar";
import HandPumpType from "../components/HandPumpType";
import SvgComponent from "../components/UserSelecting";
import Info from "../components/Info";

export default function RepairScreen() {
  return (
    <View style={styles.container}>
      <TopBar title="Repair"></TopBar>
      <View style={{ marginLeft: 25, marginTop: 25 }}>
        <View style={{ paddingBottom: 20, flexDirection: "row" }}>
          <Text style={styles.header}>Hand Pump Types</Text>
          <Info />
        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{
            paddingRight: 25,
            paddingBottom: 20,
            alignContent: "space-between",
          }}
        >
          <HandPumpType handpump_type="imk2" />
          <HandPumpType handpump_type="afridev" />
          <HandPumpType handpump_type="vergnet" />
          <HandPumpType handpump_type="nira" />
          <HandPumpType handpump_type="volanta" />
          <HandPumpType handpump_type="kardia" />
        </ScrollView>
      </View>

      <View style={styles.center}>
        <View style={styles.top_bottom_margins}>
          <SvgComponent />
        </View>
        <Text style={[styles.regular, styles.right_left_margins]}>
          Select a hand pump type from above to see the specific instructions!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    alignContent: "space-between",
    flexDirection: "row",
    paddingRight: 20,
  },
  header: {
    fontFamily: "SFProText-Semibold",
    fontSize: 15,
  },
  regular: {
    fontFamily: "SFProText-Regular",
    fontSize: 18,
    textAlign: "center",
  },

  center: {
    alignItems: "center",
  },
  top_bottom_margins: {
    marginTop: "15%",
    marginBottom: "15%",
  },
  right_left_margins: {
    marginRight: "10%",
    marginLeft: "10%",
  },
});
