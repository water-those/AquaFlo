import React, { useEffect, useState } from "react";
import { Text, View, Image, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import Colors from "../constants/Colours";
import { auth } from "../configs/firebase";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";
import { RootStackParamList } from "../types";
import { signUpHandler } from "../api/user";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "BottomTabNavigator">>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("BottomTabNavigator");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image source={require("../assets/Signupimg.png")} style={styles.signUpImg} />
      <View style={styles.contentView}>
        <Text style={styles.title}>Let's Get </Text>
        <Text style={styles.titleBold}>Started</Text>
      </View>

      <Text style={styles.subtitle}>Start contributing today!</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Your Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => signUpHandler(email, password)} style={[styles.button, styles.button]}>
          <Text style={styles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentView}>
        <Text style={styles.bottomtext}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.register}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  signUpImg: {
    paddingBottom: "5%",
    width: "76%",
    height: "25%",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
    paddingBottom: "10%",
  },
  button: {
    backgroundColor: Colors.blue,
    width: "100%",
    padding: 17,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 16,
  },
  contentView: {
    paddingTop: "4%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    color: Colors.black,
  },
  titleBold: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.black,
  },
  subtitle: {
    paddingTop: "2%",
    color: Colors.grey,
    paddingBottom: "5%",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 20,
    borderColor: Colors.grey,
    color: Colors.grey,
    borderWidth: 1,
  },
  bottomtext: {
    fontWeight: "300",
  },
  register: {
    fontWeight: "600",
    color: Colors.black,
  },
});
