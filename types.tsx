/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Login: undefined;
  BottomTabNavigator: undefined;
};

export type BottomTabParamList = {
  Map: undefined;
  Home: undefined;
  Guides: undefined;
};
