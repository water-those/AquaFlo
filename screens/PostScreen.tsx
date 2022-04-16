import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native";
import TopBar from "../components/topbar";
import Colors from "../constants/Colours";
import { Comment } from "../api/schemas";
import React, { useState } from "react";
import { CommunityStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";
import Icon from "../components/icon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CommunityStackRouteProps } from "../types";
import { useNavigation } from "@react-navigation/core";

type navigationProp = NativeStackScreenProps<CommunityStackParamList, "Posts">["navigation"];

export default function PostScreen() {
  const route = useRoute<CommunityStackRouteProps<"Post">>();
  const navigation = useNavigation<navigationProp>();
  const [commentText, onChangeCommentText] = useState("");

  return (
    <View style={styles.container}>
      <TopBar title="Community" navigation={navigation}></TopBar>
      <ScrollView>
        <View style={styles.questionContainer}>
          <Text style={styles.questionHeader}>Q.</Text>
          <Text style={styles.questionText}>
            Lorem ipsum dolor sit amet, consectetu adipiscing elit. Nam mattis ligula rutrum gravida gravida. Nullam
            pharetra neque in orci scelerisque?
          </Text>
        </View>

        <View style={styles.answerContainer}>
          <Text style={styles.answerHeader}>A.</Text>
          <Text style={styles.answerText}>
            Lorem ipsum dolor sit amet, consectetu adipiscing elit. Nam mattis ligula rutrum gravida gravida. Nullam
            pharetra neque in orci scelerisque?
          </Text>
        </View>

        <Text style={styles.commentsHeader}>Community Contributions ({route.params.post.comments?.length})</Text>
        <View style={styles.addCommentContainer}>
          <Icon name="John Doe" />
          <TextInput
            style={styles.commentInput}
            onChangeText={onChangeCommentText}
            value={commentText}
            placeholder="Add a contribution to this question..."
          />
        </View>

        {route.params.post.comments?.map((comment, index) => {
          return <CommentComponent comment={comment} key={index} />;
        })}
      </ScrollView>
    </View>
  );
}

interface CommentComponentProps {
  comment: Comment;
}

function CommentComponent(props: CommentComponentProps) {
  return (
    <View style={styles.commentContainer}>
      <Icon name={props.comment.author.name!} />
      <View style={styles.commentTextContainer}>
        <View style={styles.likesContainer}>
          <MaterialCommunityIcons style={styles.likesIcon} name="heart" />
          <Text style={styles.likesText}>{props.comment.likes}</Text>
        </View>
        <Text style={styles.commentText}>{props.comment.text}</Text>
        <View style={styles.commentButtonsContainer}>
          <TouchableOpacity style={[styles.commentButton, { borderRightWidth: 0.2 }]}>
            <MaterialCommunityIcons style={styles.helpfulIcon} name="heart-outline" />
            <Text>Helpful</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.commentButton, { borderLeftWidth: 0.17 }]}>
            <MaterialCommunityIcons style={styles.replyIcon} name="reply" />
            <Text>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionContainer: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    marginTop: 30,
    padding: 15,
  },
  questionHeader: {
    fontFamily: "SFProText-Semibold",
    fontSize: 20,
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
    marginTop: 15,
    padding: 15,
  },
  answerHeader: {
    fontFamily: "SFProText-Semibold",
    fontSize: 20,
    marginRight: 15,
    color: Colors.blue,
  },
  answerText: {
    fontFamily: "SFProText-Regular",
    fontSize: 15,
    width: "90%",
  },
  commentsHeader: {
    fontFamily: "SFProText-Semibold",
    fontSize: 15,
    marginLeft: 15,
    marginTop: 30,
  },
  addCommentContainer: {
    flexDirection: "row",
    margin: 15,
  },
  commentInput: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginLeft: 10,
    paddingLeft: 15,
    paddingRight: 15,
    width: "85%",
  },
  commentContainer: {
    flexDirection: "row",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  commentTextContainer: {
    backgroundColor: Colors.white,
    width: "85%",
    borderRadius: 5,
    marginLeft: 10,
    paddingTop: 10,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginLeft: 10,
  },
  likesIcon: {
    color: Colors.red,
  },
  likesText: {
    color: Colors.grey,
    fontFamily: "SFProText-Semibold",
    fontSize: 10,
    marginLeft: 5,
  },
  commentText: {
    marginLeft: 10,
  },
  commentButtonsContainer: {
    flexDirection: "row",
    marginTop: 15,
    width: "100%",
  },
  commentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0.2,
    borderColor: Colors.grey,
    padding: 10,
    width: "50%",
  },
  helpfulIcon: {
    color: Colors.red,
    fontSize: 15,
    marginRight: 5,
  },
  replyIcon: {
    fontSize: 20,
  },
});
