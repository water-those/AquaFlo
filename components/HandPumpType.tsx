import { Text, Image, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  handpump_type: string;
}
const handpumps = {
  india_mark_ii: {
    handpump_name: 'India Mark II', 
    uri: require('../assets/imk2.png')
  },
  afridev: {
    handpump_name: 'Afridev', 
    uri: require('../assets/afridev.png')
  },
  kardia: {
    handpump_name: 'Kardia', 
    uri: require('../assets/Kardia.png')
  },
  vergnet: {
    handpump_name: 'Vergnet', 
    uri: require('../assets/Vergnet.png')
  },
  volanta: {
    handpump_name: 'Volanta', 
    uri: require('../assets/Volanta.png')
  },
  nira: {
    handpump_name: 'Nira', 
    uri: require('../assets/Nira.png')
  }
}

export default function HandPumpType(props : Props) {
  let handpump = null;

  switch(props.handpump_type) {
    case "imk2":
      handpump = handpumps.india_mark_ii;
      break;
    case "afridev":
      handpump = handpumps.afridev;
      break;
    case "nira":
      handpump = handpumps.nira;
      break;
    case "volanta":
      handpump = handpumps.volanta;
      break;
    case "vergnet":
      handpump = handpumps.vergnet;
      break;
    case "kardia":
      handpump = handpumps.kardia;
      break;
    default:
      handpump = handpumps.india_mark_ii;
      break;
  }

  return (
    <TouchableOpacity style={styles.button}>
      <Image style={styles.scale_image} source={handpump.uri} />
      <Text style={styles.pump_name}>{handpump.handpump_name}</Text>
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
    maxWidth:'50%',
    maxHeight:'50%',
  },
  pump_name: {
    marginRight: 15,
    marginLeft: 15,
    textAlign: 'center'
  }
});
