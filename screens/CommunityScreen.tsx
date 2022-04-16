import { ScrollView, Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colours";
import TopBar from "../components/topbar";
import Icon from "../components/icon";
import { MaterialIcons } from "@expo/vector-icons";
import { Post, Comment } from "../api/schemas";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CommunityStackParamList } from "../types";

let sampleComment: Comment = {
  id: "1",
  text: "Lorem ipsum dolor sit amet, consectetu adipiscing elit. Nam mattis ligula rutrum gravida gravida. Nullam pharetr neque.",
  likes: 16,
  author: {
    id: "5",
    name: "Kate Lee",
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

type Props = NativeStackScreenProps<CommunityStackParamList, "Community">;
type CommunityScreenNavigationProp = Props["navigation"];
type CommunityScreenRouteProp = Props["route"];

export default function CommunityScreen({ route, navigation }: Props) {
  const [postText, onChangePostText] = useState("");
  return (
    <View style={styles.topContainer}>
      <TopBar title="Community"></TopBar>
      <View style={styles.mainContainer}>
        <View style={styles.add_post_container}>
          <Icon name="John Doe" />
          <TextInput
            style={styles.post_input}
            onChangeText={onChangePostText}
            value={postText}
            placeholder="Make a post..."
          />
        </View>
        <ScrollView
          style={styles.posts_container}
          bounces={true}
          contentContainerStyle={{ paddingBottom: 150 }}
          showsVerticalScrollIndicator={false}
        >
          <PostGroupComponent
            title="Repair"
            posts={[samplePost, samplePost, samplePost, samplePost, samplePost, samplePost]}
            navigation={navigation}
          />
          <PostGroupComponent
            title="Part Sharing"
            posts={[samplePost, samplePost, samplePost, samplePost, samplePost, samplePost]}
            navigation={navigation}
          />
          <PostGroupComponent
            title="General"
            posts={[samplePost, samplePost, samplePost, samplePost, samplePost, samplePost]}
            navigation={navigation}
          />
        </ScrollView>
      </View>
    </View>
  );
}

interface PostComponentProps {
  post: Post;
  navigation: CommunityScreenNavigationProp;
}

function PostComponent(props: PostComponentProps) {
  return (
    <TouchableOpacity
      style={styles.post}
      onPress={() => {
        props.navigation.navigate("Post", {
          post: props.post,
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

interface PostGroupComponentProps {
  title: string;
  posts: Array<Post>;
  navigation: CommunityScreenNavigationProp;
}

function PostGroupComponent(props: PostGroupComponentProps) {
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
            });
          }}
        >
          <Text style={styles.posts_header_view_text}>View all</Text>
        </TouchableOpacity>
      </View>
      <PostComponent navigation={props.navigation} post={props.posts[0]} />
      <PostComponent navigation={props.navigation} post={props.posts[1]} />
      <PostComponent navigation={props.navigation} post={props.posts[2]} />
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
  },
  mainContainer: {
    margin: 15,
  },
  add_post_container: {
    flexDirection: "row",
    marginBottom: 20,
  },
  post_input: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginLeft: 10,
    paddingLeft: 15,
    paddingRight: 15,
    width: "85%",
  },
  posts_container: {
    marginTop: 15,
  },
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
