import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colours from "../constants/Colours";
// add it so instead of JW it takes a function

export default function Info() {
  return (
    <View>
      <TouchableOpacity style={styles.circle}>
        <Text style={styles.text}>{"?"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colours.white,
    fontFamily: "SFProText-Semibold",
    fontSize: 15,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: Colours.blue,
    alignItems: "center",
    justifyContent: "center",
    textAlignVertical: "center",
    marginLeft: 10,
    marginRight: 10,
  },
});
