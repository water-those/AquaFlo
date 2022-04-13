import { ScrollView, Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constants/Colours";
import TopBar from "../components/topbar";
import Icon from "../components/icon";
import { MaterialIcons } from "@expo/vector-icons";
import { Post } from "../api/schemas";

let samplePost: Post = {
  id: "1",
  question: "Lorem ipsum dolor sit amet, consectetudfaldfjakldfjaldkfjaldkfjlakdjflkadj",
  answer: "Lorem ipsum dolor sit amet, consectetudfaldfjakldfjaldkfjaldkfjlakdjflkadj",
  comments: [],
};

export default function CommunityScreen() {
  const [postText, onChangePostText] = useState("");
  return (
    <View style={styles.topContainer}>
      <TopBar title="Community"></TopBar>
      <View style={styles.mainContainer}>
        <View style={styles.add_post_container}>
          <Icon name="JD" />
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
          />
          <PostGroupComponent
            title="Part Sharing"
            posts={[samplePost, samplePost, samplePost, samplePost, samplePost, samplePost]}
          />
          <PostGroupComponent
            title="General"
            posts={[samplePost, samplePost, samplePost, samplePost, samplePost, samplePost]}
          />
        </ScrollView>
      </View>
    </View>
  );
}

interface PostComponentProps {
  post: Post;
}

function PostComponent(props: PostComponentProps) {
  return (
    <TouchableOpacity style={styles.post}>
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
}

function PostGroupComponent(props: PostGroupComponentProps) {
  return (
    <View style={styles.posts_group}>
      <View style={styles.posts_header}>
        <Text style={styles.posts_header_title_text}>
          {props.title} ({props.posts.length})
        </Text>
        <TouchableOpacity>
          <Text style={styles.posts_header_view_text}>View all</Text>
        </TouchableOpacity>
      </View>
      <PostComponent post={props.posts[0]} />
      <PostComponent post={props.posts[1]} />
      <PostComponent post={props.posts[2]} />
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
    // borderWidth: 1,
    // borderColor: Colors.black,
  },
  post: {
    marginTop: 10,
    backgroundColor: Colors.white,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: Colors.black,
  },
  post_text: {
    fontFamily: "SFProText-Semibold",
    fontSize: 15,
    width: "95%",
    // borderWidth: 1,
    // borderColor: Colors.black,
  },
  chevronIcon: {
    fontSize: 20,
    // borderWidth: 1,
    // borderColor: Colors.black,
  },
});
