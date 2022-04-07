import { Text, Image, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function HandPumpType() {
  return (
    <TouchableOpacity style={styles.button}>
        <Image source={require('../assets/imk2.png')}/>
        <Text>India Mark II</Text>
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
      },
  });
  