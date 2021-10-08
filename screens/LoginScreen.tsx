import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, StyleSheet } from "react-native";
import * as GoogleSignIn from "expo-google-sign-in";
import * as AppAuth from "expo-app-auth";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Button,
  Icon,
  Input,
  VStack,
  Center,
  Heading,
  HStack,
  Text,
} from "native-base";

import { View } from "../components/Themed";
import { useEffect, useState } from "react";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState<GoogleSignIn.GoogleUser | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { URLSchemes } = AppAuth;

  useEffect(() => {
    // initAsync();
  }, [user]);

  const initAsync = async () => {
    try {
      await GoogleSignIn.initAsync({
        // You may ommit the clientId when the firebase `googleServicesFile` is configured
        clientId:
          "914527178068-5svj6lq9dumtvbf56msi5ojqb5bbth0c.apps.googleusercontent.com",
      });
      _syncUserWithStateAsync();
    } catch ({ message }) {
      alert("GoogleSignIn.initAsync(): " + message);
    }
  };

  const _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    setUser(user);
  };

  const signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    setUser(null);
  };

  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        _syncUserWithStateAsync();
        navigation.navigate("Root");
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
    }
  };

  const onPress = () => {
    navigation.navigate("Root");
    // if (user) {
    //   signOutAsync();
    // } else {
    //   signInAsync();
    // }
  };

  const onShowPassword = () => setShowPassword(!showPassword);

  return (
    <View style={styles.container}>
      <VStack mx={10} space={4} alignItems="center">
        <Heading textAlign="center" mb="10">
          Login
        </Heading>
        <Input InputRightElement={<></>} placeholder="Email" />
        <Input
          InputRightElement={
            <Icon
              as={<MaterialIcons name="visibility-off" />}
              size={5}
              mr="2"
              color="muted.400"
              onPress={onShowPassword}
            />
          }
          placeholder="Password"
          type={showPassword ? "text" : "password"}
        />
      </VStack>
      <HStack space={4} alignItems="flex-end">
        <Text fontSize="xs">Forgot password?</Text>
      </HStack>
      <VStack space={4} alignItems="flex-end">
        <Button bg="blue.500" onPress={onPress}>
          Login
        </Button>
      </VStack>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    width: "100%",
  },
});
