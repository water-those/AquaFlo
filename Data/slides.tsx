import OnboardingImage1 from "../components/OnboardingImage1";
import OnboardingImage2 from "../components/OnboardingImage2";
import OnboardingImage3 from "../components/OnboardingImage3";
import OnboardingImage4 from "../components/OnboardingImage4";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    marginBottom: "15%",
  },
});

export default [
  {
    id: "1",
    title: "Find Available Pumps Near You",
    description: "With our extensive list of pump coordinates you can easily locate available water pumps!",
    image: <OnboardingImage1 style={styles.image}></OnboardingImage1>,
  },

  {
    id: "2",
    title: "Report Outages in Real Time",
    description: "Pump not working? Report an outage and let others know it requires fixing!",
    image: <OnboardingImage2 style={styles.image}></OnboardingImage2>,
  },

  {
    id: "3",
    title: "Connect with a Community",
    description: "Missing a part? write a request and oterhs can help by sharing parts for pumps!",
    image: <OnboardingImage3 style={styles.image}></OnboardingImage3>,
  },

  {
    id: "4",
    title: "Repair Pumps Easily",
    description: "Knowing the pump model, you can easioy look at common mistakes and fixes for the pump",
    image: <OnboardingImage4 style={styles.image}></OnboardingImage4>,
  },
];
