/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { Post } from "./api/schemas";
import { RouteProp } from "@react-navigation/native";
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
  };
  Post: {
    post: Post;
  };
};

export type BottomTabParamList = {
  Map: undefined;
  Repair: undefined;
  CommunityNavigator: undefined;
};

export type CommunityStackRouteProps<RouteName extends keyof CommunityStackParamList> = RouteProp<
  CommunityStackParamList,
  RouteName
>;
