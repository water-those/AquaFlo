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
  posts: Array<Post>,
  parts: Array<string>,
}

interface handpumpsType {
  [key: string]: handpumpType;
}

let sampleComment: Comment = {
  id: "1",
  text: "Yup for me corrossion usually happens when the pipe and rod gets corroded due to the chemistry of the water, theres really nothing you can do other than replacing the corroded pipes and rods.",
  likes: 2,
  author: {
    id: "5",
    name: "Regana Ryanne",
  },
};

let samplePost: Post = {
  id: "1",
  question:
    "Drawing Rusty Water",
  answer:
    "Some possible causes are from pipe and rod corrossions. Its possible that theres also problems with the chemistry of the water. In order to free the pipes and rod from corrosion, you can flush the well",
  comments: [sampleComment],
};

let samplePost2: Post = {
  id: "1",
  question:
    "Pump weight is usual but no water comes out",
  answer:
    "This can happen when the reducer cap is disconnected and the lower valve assembly is dropped, To fix this dismantle and replace teh lower valve and reducer cap. Another potential reason is if the compelete cylinder is dropper or the cylinder yoke body has disonnecteed. To fix this replace the whole cylinder",
  comments: [
    {
      id: "1",
      text: "Oh! one thing i noticed as a reason is that the cylinder yoke body disconnected. To fix this dismantle and reconnect it.",
      likes: 1,
      author: {
        id: "5",
        name: "Dorinda Comfort",
      },
    }

  ],
};

let samplePost3: Post = {
  id: "1",
  question:
    "Unusual noise when pumping",
  answer:
    "This is usually like lack of lubrication which can be fixed by greasing, bearings crushing (replace bearing), some bolts and nuts are missing or loosened, tighten the nuts or replace the missing nuts top connecting rods are bent, then remove and straighten the rod or replace the rod",
  comments: [
    {
      id: "1",
      text: "Most of the time at least in my experience was just thelack of lubrication, just use any kind of greasing thats safe and it should usually work!",
      likes: 5,
      author: {
        id: "5",
        name: "Anabella Friday",
      },
    },
    {
      id: "1",
      text: "In my case yea thats the same for me!",
      likes: 2,
      author: {
        id: "5",
        name: "Nona Ione",
      },
    }

  ],
};

let samplePost4: Post = {
  id: "1",
  question:
    "Rod centralisers wearing out too quickly",
  answer:
    "Likely due to bad wear of rod centralisers often causing heavy friction during operation. A suggested solution is that if the first pipe is installed above the cylinger is 1.0 metre long then the joints cannot coincide",
  comments: [
    {
      id: "1",
      text: "yup heavy siltation of bore holes can often cause this",
      likes: 3,
      author: {
        id: "5",
        name: "Darian Freida",
      },
    },
    {
      id: "1",
      text: "yea another thing I think causes this is the coincidence of rod and rising main joints causing hte centralisers to wear excessively foot valve stuck at the lip of the top of the cylinder",
      likes: 1,
      author: {
        id: "5",
        name: "Courtney Mervyn",
      },
    }

  ],
};
let samplePost5: Post = {
  id: "1",
  question:
    "Foot valve stuck at the lip of the top of the cylinder",
  answer:
    "Basically to fix this the top of the top rod can be easily calculated just roughly to double check the setting depth",
  comments: [
    {
      id: "1",
      text: "Note, for the afridev theere is a 508 mm of brass cylinder liner above the top of the foot valve, the stroke is only 225 mm",
      likes: 2,
      author: {
        id: "5",
        name: "Kimbra Glen",
      },
    },
  ],
};

let samplePost6: Post = {
  id: "1",
  question:
    "Rising Main joint preparation incorrectly installed",
  answer:
    "Both the inside and the outside of the spigot must be bevelled. So make sure that is bevelled.",
  comments: [
    {
      id: "1",
      text: "Yea make sure it's bevelled- and make sure the sharp edges aren't that sharp so that it wont cause probelsm with the plunger and centralisers",
      likes: 7,
      author: {
        id: "5",
        name: "Christabel Josiah",
      },
    },
    {
      id: "1",
      text: "Yup that basically fixed the problem for me as well.",
      likes: 2,
      author: {
        id: "5",
        name: "Ian Lenore",
      },
    },
  ],
};

let samplePost7: Post = {
  id: "1",
  question:
    "\"U\" seal keeps wearing out",
  answer:
    "This is normal. U seals present a disproportionate number of problems during operation and maintensace of pumps. This is due to how easily it can roll out of its location can cause blockages as well as silt settling inside the seals groves and cause it to wear out. ",
  comments: [],
};
let samplePost8: Post = {
  id: "1",
  question:
    "\"U\" seal blocked cylinder",
  answer:
    "You will have to withdraw the whole pump. When the U seals become dislodged and remain inside the cylinder it is not possible to wtio withdraw the foot valve without withdrawing the whole pump.",
  comments: [],
};
let samplePost9: Post = {
  id: "1",
  question:
    "Can silt that settles out of the water damage the \"U\" seal",
  answer:
    "Yes, this is unavoidable because the silt that settles out will settle into it.",
  comments: [],
};
let samplePost10: Post = {
  id: "1",
  question:
    "Do \"U\" seals come with different quality of material?",
  answer:
    "Unfortuantely yes. This can cause it to roll out of its location and cause a blockage",
  comments: [],
};
let samplePost11: Post = {
  id: "1",
  question:
    "In terms of spare part consumption, how often are \"U\" seals consumed?",
  answer:
    "186 out of 432 parts consumed for 375 afridev hand pumps over 4 years were u seals, out of a list of 17 parts.",
  comments: [],
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

let afridevHandpumpParts = [
  "Pump Rods",
  "\"U\" seals",
  "\"O\" rings",
  "Bush Bearings",
  "Bobbins",
  "Rod Centralisers",
  "Rising Mains",
  "Fulcrum Pings",
  "Plungers",
  "Foot Valves",
];

const handpumps: handpumpsType = {
  india_mark_ii: {
    handpump_name: "India Mark II",
    uri: require("../assets/imk2.png"),
    posts: [samplePost, samplePost2, samplePost3, samplePost, samplePost, samplePost],
    parts: handpumpParts,
  },
  afridev: {
    handpump_name: "Afridev",
    uri: require("../assets/afridev.png"),
    posts: [samplePost4,samplePost5, samplePost6, samplePost],
    parts: afridevHandpumpParts,
  },
  kardia: {
    handpump_name: "Kardia",
    uri: require("../assets/Kardia.png"),
    posts: [samplePost, samplePost2, samplePost3, samplePost, samplePost, samplePost],
    parts: handpumpParts,
  },
  vergnet: {
    handpump_name: "Vergnet",
    uri: require("../assets/Vergnet.png"),
    posts: [samplePost, samplePost2, samplePost3, samplePost, samplePost, samplePost],
    parts: handpumpParts,
  },
  volanta: {
    handpump_name: "Volanta",
    uri: require("../assets/Volanta.png"),
    posts: [samplePost, samplePost2, samplePost3, samplePost, samplePost, samplePost],
    parts: handpumpParts,
  },
  nira: {
    handpump_name: "Nira",
    uri: require("../assets/Nira.png"),
    posts: [samplePost, samplePost2, samplePost3, samplePost, samplePost, samplePost],
    parts: handpumpParts,
  },
};


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
          posts={props.handpump.posts}
          navigation={props.navigation}
          screenTitle={"Repair"}
          trail={[props.handpump.handpump_name, "Quick Fixes"]}
        />

        <Text style={styles.partsHeader}>Hand Pump Parts</Text>
        <View style={styles.partsContainer}>
          {props.handpump.parts.map((part, index) => {
            return (
              <HandPumpPart
                partName={part}
                posts={[samplePost7, samplePost8, samplePost9, samplePost10, samplePost11]}
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
