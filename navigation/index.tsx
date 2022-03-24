import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import RepairScreen from "../screens/RepairScreen";
import MapScreen from "../screens/MapScreen";
import CommunityScreen from "../screens/CommunityScreen";
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
        name="Repair"
        component={RepairScreen}
        options={{
          tabBarLabel: "Repair",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="wrench-outline" color={color} size={size} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarLabel: "Community",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="comment-multiple-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
}
