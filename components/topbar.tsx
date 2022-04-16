import { Text, StatusBar, View, StyleSheet, TouchableOpacity } from "react-native";
import Colours from "../constants/Colours";
import Icon from "../components/icon";
import { MaterialIcons } from "@expo/vector-icons";
// add it so that instead it takes a function for the name
interface Props {
  title: string;
  navigation?: any;
}
export default function TopBar(props: Props) {
  return (
    <View style={styles.topbar}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.titleContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          {props.navigation ? (
            <MaterialIcons style={styles.backIcon} name="chevron-left" />
          ) : (
            <View style={{ marginLeft: 20 }} />
          )}
        </TouchableOpacity>
        <Text style={styles.text}>{props.title}</Text>
      </View>
      <Icon name="Mary Doe" />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "SFProText-Bold",
    fontSize: 26,
  },
  topbar: {
    width: "100%",
    height: "10%",
    paddingRight: "5%",
    backgroundColor: Colours.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 40,
  },
});
