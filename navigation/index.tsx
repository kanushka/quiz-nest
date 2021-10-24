/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from "react";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ColorSchemeName, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import firebase from "firebase/app";
import "firebase/auth";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import QuizOverviewScreen from "../screens/QuizOverviewScreen";
import QuizTimeScreen from "../screens/QuizTimeScreen";
import QuizComplete from "../screens/QuizComplete";
import NotFoundScreen from "../screens/NotFoundScreen";
import QuizScreen from "../screens/QuizScreen";
import ScoreScreen from "../screens/ScoreScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingScreen from "../screens/SettingScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import Firebase from "../config/Firebase";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
const auth = Firebase.auth();

function RootNavigator() {
  const [user, setUser] = useState<firebase.User | null>();
  const [appOnline, setAppOnline] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", (snap) => {
      setAppOnline(snap.val() === true);
    });
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Setting" component={SettingScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="QuizOverview"
          component={QuizOverviewScreen}
          options={{ title: "Quiz Overview" }}
        />
        <Stack.Screen
          name="QuizTimeScreen"
          component={QuizTimeScreen}
          options={{ title: "Pop Quiz 2", headerShown: false }}
        />
        <Stack.Screen
          name="QuizComplete"
          component={QuizComplete}
          options={{ title: "Quiz Complete", headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Quiz"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          title: "Quiz Nest",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="extension" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Score"
        component={ScoreScreen}
        options={{
          title: "Scores",
          tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }: RootTabScreenProps<"Profile">) => ({
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="account-circle" color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Setting")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="cog"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={24} style={{ marginBottom: -3 }} {...props} />;
}
