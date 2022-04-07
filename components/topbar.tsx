import { Text,StatusBar, View, StyleSheet } from "react-native";
import Colours from "../constants/Colours";
import Icon from "../components/icon";
// add it so that instead it takes a function for the name
interface Props {
    title: string;
}
export default function TopBar(props: Props) {
  return (
      
    <View style={styles.topbar}>
       
            <StatusBar barStyle="dark-content"/>
            <Text style={styles.text}>{props.title}</Text>
            <Icon name="JD"/>
       
    </View>
  );
}

const styles = StyleSheet.create({
    text : {
        fontFamily: 'SFProText-Bold',
        fontSize: 26,
    },
    topbar: {
        width: '100%',
        height: '15%',
        paddingLeft:'5%',
        paddingRight: '5%',
        paddingTop: '15%',
        backgroundColor: Colours.white, 
        flexDirection:'row',
        justifyContent: "space-between",
     
    },
 
  });
  