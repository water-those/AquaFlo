/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { Post } from "./api/schemas";
import { RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Login: undefined;
  BottomTabNavigator: undefined;
};

export type CommunityStackParamList = {
  Community: undefined;
  Posts: {
    posts: Array<Post>;
    screenTitle: string;
    trail: Array<String>;
  };
  Post: {
    post: Post;
    screenTitle: string;
    trail: Array<String>;
  };
};

export type RepairStackParamList = {
  Repair: undefined;
  Posts: {
    posts: Array<Post>;
    screenTitle: string;
    trail: Array<String>;
  };
  Post: {
    post: Post;
    screenTitle: string;
    trail: Array<String>;
  };
};

export type BottomTabParamList = {
  Map: undefined;
  RepairNavigator: undefined;
  CommunityNavigator: undefined;
};

export type CommunityStackRouteProps<RouteName extends keyof CommunityStackParamList> = RouteProp<
  CommunityStackParamList,
  RouteName
>;

export type CommunityScreenProps = NativeStackScreenProps<CommunityStackParamList, "Community">;
export type CommunityScreenNavigationProp = CommunityScreenProps["navigation"];
export type CommunityScreenRouteProp = CommunityScreenProps["route"];

export type RepairScreenProps = NativeStackScreenProps<RepairStackParamList, "Repair">;
export type RepairScreenNavigationProp = RepairScreenProps["navigation"];
export type RepairScreenRouteProp = RepairScreenProps["route"];
