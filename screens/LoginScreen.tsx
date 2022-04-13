import React, { useEffect, useState } from "react";
import { Text, View, Image, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import Colors from "../constants/Colours";
import { auth } from "../configs/firebase";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";
import { RootStackParamList } from "../types";
import { loginHandler } from "../api/user";
import Colours from "../constants/Colours";

export default function LoginScreen() {
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
      <Image source={require("../assets/adaptive-icon.png")} style={styles.toplogo} />

      <View style={styles.contentView}>
        <Text style={styles.title}>Welcome to Aqua</Text>
        <Text style={styles.titleBold}>Flo</Text>
      </View>

      <Text style={styles.subText}>Sign in to continue</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Your Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          autoCapitalize="none"
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => loginHandler(email, password)} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Image source={require("../assets/or.png")} style={styles.orimg} />

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.bottomButton}>
          <View style={styles.contentView}>
            <Image source={require("../assets/googleicon.png")} style={styles.buttonlogo} />
            <Text style={styles.bottomButtonText}>Login with Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.bottomButton}>
          <View style={styles.contentView}>
            <Image source={require("../assets/facebookicon.png")} style={styles.facebooklogo} />
            <Text style={styles.bottomButtonText}>Login with Facebook</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.contentView}>
        <Text style={styles.bottomtext}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.register}>Register</Text>
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
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderRadius: 8,
    marginTop: 20,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
    paddingBottom: "5%",
  },
  button: {
    backgroundColor: Colors.blue,
    width: "100%",
    padding: 17,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: Colors.white,
    marginTop: 25,
    borderColor: Colors.blue,
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: Colors.blue,
    fontWeight: "700",
    fontSize: 16,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 16,
  },
  toplogo: {
    width: "30%",
    height: "10%",
  },
  contentView: {
    paddingTop: "4%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    color: Colours.black,
  },
  titleBold: {
    fontSize: 30,
    fontWeight: "700",
    color: Colours.black,
  },
  subText: {
    paddingTop: "2%",
    color: Colours.grey,
    paddingBottom: "5%",
  },
  forgotPassword: {
    paddingTop: "4%",
    color: Colours.grey,
  },
  orimg: {
    paddingTop: "5%",
  },
  bottomButtonContainer: {
    width: "80%",
    paddingBottom: "5%",
  },
  bottomButton: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 20,
    borderRadius: 8,
    marginTop: 10,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  bottomButtonText: {
    fontWeight: "500",
    fontSize: 16,
    color: Colours.grey,
    paddingLeft: 40,
  },
  bottomtext: {
    fontWeight: "300",
  },
  register: {
    fontWeight: "600",
    color: Colours.black,
  },
  buttonlogo: {
    width: 18,
    height: 18,
  },
  facebooklogo: {
    width: 10,
    height: 19,
  },
});
