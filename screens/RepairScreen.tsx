import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import TopBar from "../components/topbar";
import HandPumpType from "../components/HandPumpType";
import SvgComponent from "../components/UserSelecting";
import Info from "../components/Info";
import React, { useState } from "react";
import { RepairScreenProps, RepairScreenNavigationProp } from "../types";
import PostGroup from "../components/PostGroup";
import { Post, Comment } from "../api/schemas";
import Colors from "../constants/Colours";
import { MaterialIcons } from "@expo/vector-icons";

export interface handpumpType {
  handpump_name: string;
  uri: any;
}

interface handpumpsType {
  [key: string]: handpumpType;
}

const handpumps: handpumpsType = {
  india_mark_ii: {
    handpump_name: "India Mark II",
    uri: require("../assets/imk2.png"),
  },
  afridev: {
    handpump_name: "Afridev",
    uri: require("../assets/afridev.png"),
  },
  kardia: {
    handpump_name: "Kardia",
    uri: require("../assets/Kardia.png"),
  },
  vergnet: {
    handpump_name: "Vergnet",
    uri: require("../assets/Vergnet.png"),
  },
  volanta: {
    handpump_name: "Volanta",
    uri: require("../assets/Volanta.png"),
  },
  nira: {
    handpump_name: "Nira",
    uri: require("../assets/Nira.png"),
  },
};

let sampleComment: Comment = {
  id: "1",
  text: "Lorem ipsum dolor sit amet, consectetu adipiscing elit. Nam mattis ligula rutrum gravida gravida. Nullam pharetr neque.",
  likes: 16,
  author: {
    id: "5",
    name: "Date Cee",
  },
};

let samplePost: Post = {
  id: "1",
  question:
    "Lorem ipsum dolor sit amet, consectetu adipiscing elit. Nam mattis ligula rutrum gravida gravida. Nullam pharetra neque in orci scelerisque?",
  answer:
    "Lorem ipsum dolor sit amet, consectetu adipiscing elit. Nam mattis ligula rutrum gravida gravida. Nullam pharetr neque.",
  comments: [sampleComment, sampleComment, sampleComment, sampleComment],
};

let handpumpParts = [
  "Pump Head",
  "Handle",
  "Pump Stand",
  "Pump Rods",
  "Rising Main",
  "Pump Cylinder",
  "Footvalve",
  "Plungers",
  "Bobbins",
  "Cylinders",
];

export default function RepairScreen({ route, navigation }: RepairScreenProps) {
  const [selectedHandpump, setSelectedHandpump] = useState<handpumpType>();
  return (
    <View style={styles.container}>
      <TopBar title="Repair"></TopBar>
      <View style={{ marginTop: 25 }}>
        <View style={{ paddingBottom: 20, flexDirection: "row" }}>
          <Text style={styles.header}>Hand Pump Types</Text>
          <Info />
        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20,
            alignContent: "space-between",
          }}
        >
          {Object.keys(handpumps).map((handpump, index) => {
            if (handpumps[handpump] === selectedHandpump) {
            }
            return (
              <HandPumpType
                handpump={handpumps[handpump]}
                onPress={() => {
                  setSelectedHandpump(handpumps[handpump]);
                }}
                key={index}
                selected={selectedHandpump ? handpumps[handpump] === selectedHandpump : true}
              />
            );
          })}
        </ScrollView>
      </View>

      <RepairBottomView handpump={selectedHandpump} navigation={navigation} />
    </View>
  );
}

interface repairBottomViewProps {
  handpump: handpumpType | undefined;
  navigation: RepairScreenNavigationProp;
}

function RepairBottomView(props: repairBottomViewProps) {
  if (props.handpump) {
    return (
      <ScrollView
        style={styles.posts_container}
        bounces={true}
        contentContainerStyle={{ paddingBottom: 150, marginLeft: 15, marginRight: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <PostGroup
          title="Quick Fixes"
          posts={[samplePost, samplePost, samplePost, samplePost, samplePost, samplePost]}
          navigation={props.navigation}
          screenTitle={"Repair"}
          trail={[props.handpump.handpump_name, "Quick Fixes"]}
        />

        <Text style={styles.partsHeader}>Hand Pump Parts</Text>
        <View style={styles.partsContainer}>
          {handpumpParts.map((part, index) => {
            return (
              <HandPumpPart
                partName={part}
                posts={[samplePost, samplePost, samplePost, samplePost, samplePost, samplePost]}
                navigation={props.navigation}
                key={index}
                trail={[props.handpump?.handpump_name!, "Hand Pump Parts", part]}
              ></HandPumpPart>
            );
          })}
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.center}>
        <View style={styles.top_bottom_margins}>
          <SvgComponent />
        </View>
        <Text style={[styles.regular, styles.right_left_margins]}>
          Select a hand pump type from above to see the specific instructions!
        </Text>
      </View>
    );
  }
}

interface handPumpPartProps {
  partName: string;
  navigation: RepairScreenNavigationProp;
  posts: Array<Post>;
  trail: Array<String>;
}

function HandPumpPart(props: handPumpPartProps) {
  return (
    <TouchableOpacity
      style={styles.partContainer}
      onPress={() => {
        props.navigation.navigate("Posts", {
          posts: props.posts,
          screenTitle: "Repair",
          trail: props.trail,
        });
      }}
    >
      <Text>{props.partName}</Text>
      <MaterialIcons style={styles.chevronIcon} name="chevron-right" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    alignContent: "space-between",
    flexDirection: "row",
    paddingRight: 20,
  },
  header: {
    fontFamily: "SFProText-Semibold",
    fontSize: 15,
    marginLeft: 15,
  },
  regular: {
    fontFamily: "SFProText-Regular",
    fontSize: 18,
    textAlign: "center",
  },
  center: {
    alignItems: "center",
  },
  top_bottom_margins: {
    marginTop: "15%",
    marginBottom: "15%",
  },
  right_left_margins: {
    marginRight: "10%",
    marginLeft: "10%",
  },
  posts_container: {
    marginTop: 15,
  },
  partsHeader: {
    fontFamily: "SFProText-Semibold",
    fontSize: 15,
    marginLeft: 5,
    marginBottom: 10,
  },
  partsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  partContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    paddingRight: 5,
    width: "47%",
    margin: 5,
    borderRadius: 5,
  },
  chevronIcon: {
    fontSize: 24,
  },
});
