import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import RepairScreen from "../screens/RepairScreen";
import MapScreen from "../screens/MapScreen";
import CommunityScreen from "../screens/CommunityScreen";
import PostsScreen from "../screens/PostsScreen";
import PostScreen from "../screens/PostScreen";
import LoginScreen from "../screens/LoginScreen";
import { RootStackParamList, BottomTabParamList, CommunityStackParamList, RepairStackParamList } from "../types";
import Onboarding1 from "../components/Onboarding1";

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
        <RootStack.Screen
          name="Onboarding"
          options={{ headerShown: false }}
          component={Onboarding1}
        ></RootStack.Screen>
        <RootStack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        ></RootStack.Screen>
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
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          ),
          headerShown: false,
          tabBarLabelStyle: { paddingBottom: 5 },
        }}
      />
      <BottomTab.Screen
        name="RepairNavigator"
        component={RepairStackNavigator}
        options={{
          tabBarLabel: "Repair",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="wrench-outline"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
          tabBarLabelStyle: { paddingBottom: 5 },
        }}
      />
      <BottomTab.Screen
        name="CommunityNavigator"
        component={CommunityStackNavigator}
        options={{
          tabBarLabel: "Community",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="comment-multiple-outline"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
          tabBarLabelStyle: { paddingBottom: 5 },
        }}
      />
    </BottomTab.Navigator>
  );
}

const CommunityStack = createStackNavigator<CommunityStackParamList>();

function CommunityStackNavigator() {
  return (
    <CommunityStack.Navigator>
      <CommunityStack.Screen name="Community" component={CommunityScreen} options={{ headerShown: false }} />
      <CommunityStack.Screen name="Posts" component={PostsScreen} options={{ headerShown: false }} />
      <CommunityStack.Screen name="Post" component={PostScreen} options={{ headerShown: false }} />
    </CommunityStack.Navigator>
  );
}

const RepairStack = createStackNavigator<RepairStackParamList>();

function RepairStackNavigator() {
  return (
    <RepairStack.Navigator>
      <RepairStack.Screen name="Repair" component={RepairScreen} options={{ headerShown: false }} />
      <RepairStack.Screen name="Posts" component={PostsScreen} options={{ headerShown: false }} />
      <RepairStack.Screen name="Post" component={PostScreen} options={{ headerShown: false }} />
    </RepairStack.Navigator>
  );
}
