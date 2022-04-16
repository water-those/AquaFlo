import { ScrollView, TextInput, View, StyleSheet } from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colours";
import TopBar from "../components/topbar";
import Icon from "../components/icon";
import { Post, Comment } from "../api/schemas";
import { CommunityScreenProps } from "../types";
import PostGroup from "../components/PostGroup";

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

export default function CommunityScreen({ route, navigation }: CommunityScreenProps) {
  const [postText, onChangePostText] = useState("");
  return (
    <View style={styles.topContainer}>
      <TopBar title="Community"></TopBar>
      <View style={styles.mainContainer}>
        <View style={styles.add_post_container}>
          <Icon name="Mary Doe" />
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
          <PostGroup
            title="Repair"
            posts={[samplePost, samplePost, samplePost, samplePost, samplePost, samplePost]}
            navigation={navigation}
            trail={[]}
            screenTitle="Community"
          />
          <PostGroup
            title="Part Sharing"
            posts={[samplePost, samplePost, samplePost, samplePost, samplePost, samplePost]}
            navigation={navigation}
            trail={[]}
            screenTitle="Community"
          />
          <PostGroup
            title="General"
            posts={[samplePost, samplePost, samplePost, samplePost, samplePost, samplePost]}
            navigation={navigation}
            trail={[]}
            screenTitle="Community"
          />
        </ScrollView>
      </View>
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
});
