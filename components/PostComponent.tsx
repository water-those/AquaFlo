import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Post } from "../api/schemas";
import { CommunityScreenNavigationProp, RepairScreenNavigationProp } from "../types";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colours";

interface PostComponentProps {
  post: Post;
  navigation: CommunityScreenNavigationProp | RepairScreenNavigationProp;
  screenTitle: string;
  trail: Array<string>;
}

export default function PostComponent(props: PostComponentProps) {
  return (
    <TouchableOpacity
      style={styles.post}
      onPress={() => {
        props.navigation.navigate("Post", {
          post: props.post,
          screenTitle: props.screenTitle,
          trail: props.trail,
        });
      }}
    >
      <Text numberOfLines={1} style={styles.post_text}>
        Q. {props.post.question}
      </Text>
      <MaterialIcons style={styles.chevronIcon} name="chevron-right" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  post: {
    marginTop: 10,
    backgroundColor: Colors.white,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
  },
  post_text: {
    fontFamily: "SFProText-Semibold",
    fontSize: 15,
    width: "95%",
  },
  chevronIcon: {
    fontSize: 20,
  },
});
