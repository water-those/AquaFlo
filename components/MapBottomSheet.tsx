import { WaterSource } from "../api/schemas";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colours from "../constants/Colours";

interface Props {
  watersource: WaterSource | null;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
}

const statusText = {
  Functional: "Available",
  "Non-Functional": "Broken",
  "Non functional and needs repair": "Under Repair",
  "": "Available",
};

const AVALIABLE = "Functional";
const BROKEN = "Non-Functional";
const UNDER_REPAIR = "Non functional and needs repair";

const snapPoints = ["25%", "60%"];

export default function MapBottomSheet(props: Props) {
  if (props.watersource != null) {
    return (
      <BottomSheetModal style={styles.shadow} ref={props.bottomSheetModalRef} index={1} snapPoints={snapPoints}>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <MaterialIcons style={styles.locationIcon} name="location-pin" />

            {watersourceHeader(props.watersource!)}
          </View>

          <View style={styles.subheaderContainer}>
            <MaterialIcons
              style={
                props.watersource!.status == undefined
                  ? styles.greenCircle
                  : (statusIcon as any)[props.watersource!.status]
              }
              name="circle"
            />
            <Text style={styles.subheaderText}>
              {props.watersource!.status == undefined ? "Available" : (statusText as any)[props.watersource!.status]}
            </Text>
          </View>

          <View style={styles.additionalInfoContainer}>
            <View style={styles.infoSectionContainer}>
              <Text style={styles.infoHeaderText}>Hand Pump Type</Text>
              <Text style={styles.infoDescriptionText}>{props.watersource!.tech_type}</Text>
            </View>

            <View style={styles.infoSectionContainer}>
              <Text style={styles.infoHeaderText}>Water Source</Text>
              <Text style={styles.infoDescriptionText}>{props.watersource!.source_type}</Text>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={
                props.watersource!.status == BROKEN
                  ? [styles.button, styles.buttonShadow, styles.disabled]
                  : [styles.button, styles.buttonShadow]
              }
              disabled={props.watersource!.status == BROKEN}
            >
              <MaterialIcons
                style={props.watersource!.status == BROKEN ? [styles.redCircle, styles.disabled] : [styles.redCircle]}
                name="circle"
              />
              <Text
                style={props.watersource!.status == BROKEN ? [styles.buttonText, styles.disabled] : [styles.buttonText]}
              >
                Mark as Broken
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                props.watersource!.status == UNDER_REPAIR
                  ? [styles.button, styles.buttonShadow, styles.disabled]
                  : [styles.button, styles.buttonShadow]
              }
              disabled={props.watersource!.status == UNDER_REPAIR}
            >
              <MaterialIcons
                style={
                  props.watersource!.status == UNDER_REPAIR
                    ? [styles.yellowCircle, styles.disabled]
                    : [styles.yellowCircle]
                }
                name="circle"
              />
              <Text
                style={
                  props.watersource!.status == UNDER_REPAIR ? [styles.buttonText, styles.disabled] : [styles.buttonText]
                }
              >
                Mark as Under Repair
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                props.watersource!.status == AVALIABLE || props.watersource!.status == undefined
                  ? [styles.button, styles.buttonShadow, styles.disabled]
                  : [styles.button, styles.buttonShadow]
              }
              disabled={props.watersource!.status == AVALIABLE || props.watersource!.status == undefined}
            >
              <MaterialIcons
                style={
                  props.watersource!.status == AVALIABLE || props.watersource!.status == undefined
                    ? [styles.greenCircle, styles.disabled]
                    : [styles.greenCircle]
                }
                name="circle"
              />
              <Text
                style={
                  props.watersource!.status == AVALIABLE || props.watersource!.status == undefined
                    ? [styles.buttonText, styles.disabled]
                    : [styles.buttonText]
                }
              >
                Mark as Available
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetModal>
    );
  }
  return (
    <BottomSheetModal
      style={styles.shadow}
      ref={props.bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      onChange={() => {}}
    >
      <View style={styles.contentContainer}>EMPTY</View>
    </BottomSheetModal>
  );
}

function watersourceHeader(watersource: WaterSource) {
  if (watersource.area4 != undefined) {
    return (
      <Text style={styles.headerText}>
        {watersource.area4}, {watersource.country}
      </Text>
    );
  } else if (watersource.area3 != undefined) {
    return (
      <Text style={styles.headerText}>
        {watersource.area3}, {watersource.country}
      </Text>
    );
  } else if (watersource.area2 != undefined) {
    return (
      <Text style={styles.headerText}>
        {watersource.area2}, {watersource.country}
      </Text>
    );
  }
  return (
    <Text style={styles.headerText}>
      {watersource.area1}, {watersource.country}
    </Text>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    maxHeight: "95%",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  headerText: {
    fontFamily: "SFProText-Semibold",
    fontSize: 20,
  },
  locationIcon: {
    color: Colours.black,
    fontSize: 20,
    marginRight: 5,
  },
  subheaderContainer: {
    flexDirection: "row",
    maxHeight: 30,
    alignItems: "center",
  },
  subheaderText: {
    fontFamily: "SFProText-Semibold",
    fontSize: 14,
    color: Colours.grey,
  },
  circleIcon: {
    color: Colours.green,
    fontSize: 12,
    marginRight: 5,
  },
  additionalInfoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  infoSectionContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 30,
  },
  infoHeaderText: {
    fontFamily: "SFProText-Semibold",
    color: Colours.grey,
    fontSize: 14,
  },
  infoDescriptionText: {
    fontFamily: "SFProText-Regular",
    color: Colours.black,
    fontSize: 14,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 15,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    minWidth: "90%",
    backgroundColor: Colours.white,
    marginBottom: 10,
  },
  buttonShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  buttonText: {
    fontFamily: "SFProText-Bold",
    color: Colours.black,
    fontSize: 16,
  },
  greenCircle: {
    color: Colours.green,
    fontSize: 12,
    marginRight: 5,
  },
  redCircle: {
    color: Colours.red,
    fontSize: 12,
    marginRight: 5,
  },
  yellowCircle: {
    color: Colours.yellow,
    fontSize: 12,
    marginRight: 5,
  },
  disabled: {
    opacity: 0.7,
  },
});

const statusIcon = {
  Functional: styles.greenCircle,
  "Non-Functional": styles.redCircle,
  "Non functional and needs repair": styles.yellowCircle,
  "": styles.greenCircle,
};
