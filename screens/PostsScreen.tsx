import { Text, ScrollView, View, StyleSheet, Keyboard, TextInput } from "react-native";
import TopBar from "../components/topbar";
import Colors from "../constants/Colours";
import { Ionicons, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CommunityStackRouteProps } from "../types";
import { useRoute } from "@react-navigation/native";
import { Post } from "../api/schemas";
import { useNavigation } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CommunityStackParamList } from "../types";

type navigationProp = NativeStackScreenProps<CommunityStackParamList, "Post">["navigation"];

export default function PostsScreen() {
  const [searchText, onChangeSearchText] = useState("");
  const route = useRoute<CommunityStackRouteProps<"Posts">>();
  const navigation = useNavigation<navigationProp>();

  return (
    <View style={styles.container}>
      <TopBar title={route.params.screenTitle} navigation={navigation}></TopBar>
      <ScrollView contentContainerStyle={{ marginBottom: 20 }}>
        {route.params.trail.length == 0 ? (
          <View />
        ) : (
          <Text style={styles.breadcrumbs}>{route.params.trail.join("  >  ")}</Text>
        )}
        <View style={styles.searchContainer}>
          <View style={styles.searchBarContainer}>
            <Ionicons style={styles.searchIcon} name="search-outline" />
            <TextInput
              style={styles.searchInput}
              onChangeText={onChangeSearchText}
              value={searchText}
              placeholder="Search"
            />
          </View>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <Feather style={styles.searchButtonIcon} name="edit-3"></Feather>
          </TouchableOpacity>
        </View>

        <View style={styles.postsHeaderContainer}>
          <Text style={styles.postsHeaderText}>Posts ({route.params.posts.length})</Text>
          <TouchableOpacity>
            <Text style={styles.postsFilterText}>Filter/Sort</Text>
          </TouchableOpacity>
        </View>

        {route.params.posts.map((post, index) => {
          return (
            <PostsItemComponent
              navigation={navigation}
              post={post}
              key={index}
              trail={route.params.trail}
              screenTitle={route.params.screenTitle}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

interface PostsItemComponentProps {
  post: Post;
  navigation: navigationProp;
  trail: Array<string>;
  screenTitle: string;
}

function PostsItemComponent(props: PostsItemComponentProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Post", {
          post: props.post,
          trail: props.trail,
          screenTitle: props.screenTitle,
        });
      }}
    >
      <View style={styles.questionContainer}>
        <Text style={styles.questionHeader}>Q.</Text>
        <Text style={styles.questionText} numberOfLines={2}>
          {props.post.question}
        </Text>
      </View>

      <View style={styles.answerContainer}>
        <Text style={styles.answerHeader}>A.</Text>
        <Text style={styles.answerText} numberOfLines={2}>
          {props.post.answer}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  breadcrumbs: {
    fontFamily: "SFProText-Semibold",
    color: Colors.grey,
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 10,
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    width: "100%",
  },
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "84%",
  },
  searchInput: {
    backgroundColor: Colors.white,
    height: 50,
    borderRadius: 100,
    paddingLeft: 50,
    paddingRight: 15,
    marginLeft: -40,
    marginRight: 10,
    width: "98%",
  },
  searchIcon: {
    color: Colors.grey,
    fontSize: 30,
    zIndex: 1,
    marginLeft: 15,
  },
  searchButton: {
    backgroundColor: Colors.blue,
    borderRadius: 5,
    padding: 8,
  },
  searchButtonIcon: {
    color: Colors.white,
    fontSize: 25,
  },
  postsHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  postsHeaderText: {
    fontFamily: "SFProText-Semibold",
    fontSize: 15,
  },
  postsFilterText: {
    color: Colors.grey,
    fontFamily: "SFProText-Semibold",
    fontSize: 15,
  },
  questionContainer: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    padding: 15,
  },
  questionHeader: {
    fontFamily: "SFProText-Semibold",
    fontSize: 15,
    marginRight: 15,
  },
  questionText: {
    fontFamily: "SFProText-Semibold",
    fontSize: 15,
    width: "90%",
  },
  answerContainer: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    padding: 15,
    paddingTop: 0,
    marginBottom: 10,
  },
  answerHeader: {
    fontFamily: "SFProText-Semibold",
    fontSize: 15,
    marginRight: 15,
    color: Colors.blue,
  },
  answerText: {
    fontFamily: "SFProText-Regular",
    fontSize: 15,
    width: "90%",
  },
});
