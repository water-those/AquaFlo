import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import GuidesScreen from "../screens/GuidesScreen";
import LoginScreen from "../screens/LoginScreen";
import { RootStackParamList, BottomTabParamList } from "../types";

/**
 * A stack navigator provides a way for your app to transition between screens
 * where each new screen is placed on top of a stack.
 * https://reactnavigation.org/docs/stack-navigator
 */
const RootStack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen}></RootStack.Screen>
        <RootStack.Screen
          name="BottomTabNavigator"
          options={{ headerShown: false }}
          component={BottomTabNavigator}
        ></RootStack.Screen>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Map">
      <BottomTab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="map" color={color} size={size} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Guides"
        component={GuidesScreen}
        options={{
          tabBarLabel: "Guides",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
}
