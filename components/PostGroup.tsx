import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Post } from "../api/schemas";
import { CommunityScreenNavigationProp, RepairScreenNavigationProp } from "../types";
import PostComponent from "./PostComponent";
import Colors from "../constants/Colours";

interface PostGroupProps {
  title: string;
  posts: Array<Post>;
  navigation: CommunityScreenNavigationProp | RepairScreenNavigationProp;
  trail: Array<string>;
  screenTitle: string;
}

export default function PostGroup(props: PostGroupProps) {
  return (
    <View style={styles.posts_group}>
      <View style={styles.posts_header}>
        <Text style={styles.posts_header_title_text}>
          {props.title} ({props.posts.length})
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Posts", {
              posts: props.posts,
              screenTitle: props.title,
              trail: props.trail,
            });
          }}
        >
          <Text style={styles.posts_header_view_text}>View all</Text>
        </TouchableOpacity>
      </View>
      <PostComponent
        navigation={props.navigation}
        post={props.posts[0]}
        screenTitle={props.screenTitle}
        trail={props.trail}
      />
      <PostComponent
        navigation={props.navigation}
        post={props.posts[1]}
        screenTitle={props.screenTitle}
        trail={props.trail}
      />
      <PostComponent
        navigation={props.navigation}
        post={props.posts[2]}
        screenTitle={props.screenTitle}
        trail={props.trail}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  posts_header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  posts_header_title_text: {
    fontFamily: "SFProText-Semibold",
    fontSize: 15,
  },
  posts_header_view_text: {
    fontFamily: "SFProText-Semibold",
    fontSize: 15,
    color: Colors.grey,
  },
  posts_group: {
    marginBottom: 35,
  },
});
