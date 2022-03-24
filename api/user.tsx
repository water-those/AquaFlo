// Firebase integration tutorial used: https://www.youtube.com/watch?v=ql4J6SpLXZA&ab_channel=MadeWithMatt
import { auth } from "../configs/firebase";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";
import { RootStackParamList } from "../types";

export const signUpHandler = (email: string, password: string) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log("Signed up with:", user!.email);
    })
    .catch((error: any) => {
      alert(error.message);
    });
};

export const loginHandler = (email: string, password: string) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log("Logged in with:", user!.email);
    })
    .catch((error: any) => {
      alert(error.message);
    });
};

export const singOutHandler = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "Login">>();

  auth
    .signOut()
    .then(() => {
      navigation.replace("Login");
    })
    .catch((error: any) => {
      alert(error.message);
    });
};
