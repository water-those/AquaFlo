import { WaterSource } from "../api/schemas";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colours from "../constants/Colours";
import { updateWaterSource } from "../api/watersource";
import { useState, useEffect } from "react";

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
  const [watersource, setWatersource] = useState(props.watersource);
  const [refresher, setRefresher] = useState(true);

  useEffect(() => {
    setWatersource(props.watersource);
  }, [props.watersource]);

  const statusChangeHandler = (newStatus: string, watersource: WaterSource) => {
    updateWaterSource(watersource.id!, { status: newStatus })
      .then(() => {
        watersource.status = newStatus;
        setRefresher(!refresher);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const confirmationAlert = (statusType: string, watersource: WaterSource, newStatus: string) =>
    Alert.alert("Would you like to mark this pump as " + statusType + "?", "Click 'Yes' to proceed", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          statusChangeHandler(newStatus, watersource);
        },
      },
    ]);

  if (watersource != null) {
    return (
      <BottomSheetModal style={styles.shadow} ref={props.bottomSheetModalRef} index={1} snapPoints={snapPoints}>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <MaterialIcons style={styles.locationIcon} name="location-pin" />

            {watersourceHeader(watersource)}
          </View>

          <View style={styles.subheaderContainer}>
            <MaterialIcons
              style={watersource.status == undefined ? styles.greenCircle : (statusIcon as any)[watersource.status]}
              name="circle"
            />
            <Text style={styles.subheaderText}>
              {watersource.status == undefined ? "Available" : (statusText as any)[watersource.status]}
            </Text>
          </View>

          <View style={styles.additionalInfoContainer}>
            <View style={styles.infoSectionContainer}>
              <Text style={styles.infoHeaderText}>Hand Pump Type</Text>
              <Text style={styles.infoDescriptionText}>{watersource.tech_type}</Text>
            </View>

            <View style={styles.infoSectionContainer}>
              <Text style={styles.infoHeaderText}>Water Source</Text>
              <Text style={styles.infoDescriptionText}>{watersource.source_type}</Text>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={
                watersource.status == BROKEN
                  ? [styles.button, styles.buttonShadow, styles.disabled]
                  : [styles.button, styles.buttonShadow]
              }
              disabled={watersource.status == BROKEN}
              onPress={() => {
                confirmationAlert("broken", watersource, BROKEN);
              }}
            >
              <MaterialIcons
                style={watersource.status == BROKEN ? [styles.redCircle, styles.disabled] : [styles.redCircle]}
                name="circle"
              />
              <Text style={watersource.status == BROKEN ? [styles.buttonText, styles.disabled] : [styles.buttonText]}>
                Mark as Broken
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                watersource.status == UNDER_REPAIR
                  ? [styles.button, styles.buttonShadow, styles.disabled]
                  : [styles.button, styles.buttonShadow]
              }
              disabled={watersource.status == UNDER_REPAIR}
              onPress={() => {
                confirmationAlert("under repair", watersource, UNDER_REPAIR);
              }}
            >
              <MaterialIcons
                style={
                  watersource.status == UNDER_REPAIR ? [styles.yellowCircle, styles.disabled] : [styles.yellowCircle]
                }
                name="circle"
              />
              <Text
                style={watersource.status == UNDER_REPAIR ? [styles.buttonText, styles.disabled] : [styles.buttonText]}
              >
                Mark as Under Repair
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                watersource.status == AVALIABLE || watersource.status == undefined
                  ? [styles.button, styles.buttonShadow, styles.disabled]
                  : [styles.button, styles.buttonShadow]
              }
              disabled={watersource.status == AVALIABLE || watersource.status == undefined}
              onPress={() => {
                confirmationAlert("available", watersource, AVALIABLE);
              }}
            >
              <MaterialIcons
                style={
                  watersource.status == AVALIABLE || watersource.status == undefined
                    ? [styles.greenCircle, styles.disabled]
                    : [styles.greenCircle]
                }
                name="circle"
              />
              <Text
                style={
                  watersource.status == AVALIABLE || watersource.status == undefined
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
      <View style={styles.contentContainer}>
        <Text>EMPTY</Text>
      </View>
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
