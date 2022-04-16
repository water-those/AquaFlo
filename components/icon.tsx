import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colours from "../constants/Colours";
// add it so instead of JW it takes a function
interface Props {
  name: string;
}
export default function Icon(props: Props) {
  return (
    <View>
      <TouchableOpacity style={[styles.circle, { backgroundColor: nameToColor(props.name) }]}>
        <Text style={styles.text}>
          {props.name.split(" ")[0].charAt(0)}
          {props.name.split(" ")[1].charAt(0)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colours.white,
    fontFamily: "SFProText-Semibold",
    fontSize: 18,
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 40 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

let iconColor = [Colours.blue, Colours.green, Colours.yellow, Colours.red];

function nameToColor(name: String) {
  let nameSplit = name.split(" ");
  let num = nameSplit[0].charCodeAt(0) % iconColor.length;
  return iconColor[num];
}
