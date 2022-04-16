import { Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { handpumpType } from "../screens/RepairScreen";
interface Props {
  handpump: handpumpType;
  onPress(): void;
  selected: boolean;
}

export default function HandPumpType(props: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Image
        style={props.selected ? styles.scale_image : [styles.scale_image, styles.disabled]}
        source={props.handpump.uri}
      />
      <Text style={props.selected ? styles.pump_name : [styles.pump_name, styles.disabled]}>
        {props.handpump.handpump_name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 90,
    height: 105,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginRight: 10,
  },
  scale_image: {
    maxWidth: "50%",
    maxHeight: "50%",
  },
  pump_name: {
    marginRight: 15,
    marginLeft: 15,
    textAlign: "center",
  },
  disabled: {
    opacity: 0.3,
  },
});
