import { Text, Image, ScrollView, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import TopBar from "../components/topbar";
import HandPumpType from "../components/HandPumpType";
import Colours from "../constants/Colours";
export default function RepairScreen() {
  return (
    <View style={styles.container}>
      <TopBar title="Repair"></TopBar>
      <Text>Hand Pump Types</Text>
      <View>
        <ScrollView horizontal={true} contentContainerStyle={{
      paddingLeft: 25,
    paddingRight: 25,
    alignContent: 'space-between',
  }}>
          
            <HandPumpType/>
            <HandPumpType/>
            <HandPumpType/>
            <HandPumpType/>
        
        </ScrollView>
      </View>
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    alignContent: 'space-between',
    flexDirection:'row',
    paddingRight: 20
  },
  test: {
    paddingHorizontal: 20
  }

});
