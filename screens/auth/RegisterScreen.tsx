import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Button,
  Icon,
  Input,
  VStack,
  Heading,
  HStack,
  Text,
  Pressable,
} from "native-base";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import { View } from "../../components/Themed";
import Firebase from "../../config/Firebase";

const auth = Firebase.auth();
const database = Firebase.database();

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("visibility-off");
  const [signupError, setSignupError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSignupError("");
  }, [name, email, password]);

  const handlePasswordVisibility = () => {
    if (rightIcon === "visibility") {
      setRightIcon("visibility-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "visibility-off") {
      setRightIcon("visibility");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onRegisterPress = async () => {
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        if (user) {
          console.log(`signed user: `, user);
          saveUserData(user);
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(`signed user error: `, errorMessage);
        setLoading(false);
        setSignupError(errorMessage);
      });
  };

  function saveUserData(user: firebase.User) {
    database.ref("users/" + user.uid).set(
      {
        username: name,
        email: email,
      },
      (error) => {
        setLoading(false);
        if (!error) {
          // Data saved successfully!
          console.log(`Data saved successfully!`);
          navigation.navigate("Root");
        } else {
          // The write failed...
          console.log(` The write failed: `, error);
          setSignupError(error.message);
        }
      }
    );
  }

  const onLoginPress = async () => {
    navigation.navigate("Login");
  };

  return (
    <>
      <View style={styles.container}>
        <VStack px={10} space={4} w="100%" alignItems="center">
          <Heading textAlign="center" mb="10">
            Register
          </Heading>
          <Input
            w="100%"
            size="md"
            placeholder="Enter your name"
            textContentType="givenName"
            autoFocus={true}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Input
            w="100%"
            size="md"
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            InputRightElement={
              <Icon
                as={<MaterialIcons name={rightIcon} />}
                size={5}
                mr="2"
                color="muted.400"
                onPress={handlePasswordVisibility}
              />
            }
            w="100%"
            size="md"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {signupError !== "" && (
            <Text color="error.400" fontSize="sm">
              {signupError}
            </Text>
          )}
          <Button
            bg="blue.500"
            size="lg"
            w="100%"
            onPress={onRegisterPress}
            isLoading={loading}
            spinnerPlacement="end"
            isLoadingText="Verifying"
          >
            Register
          </Button>
        </VStack>
      </View>
      <View>
        <VStack py={5} alignItems="center">
          <HStack space={2} alignItems="center">
            <Text fontSize="sm">I already have an account.</Text>
            <Pressable onPress={onLoginPress}>
              <Text fontSize="sm" color="blue.500">
                Login
              </Text>
            </Pressable>
          </HStack>
        </VStack>
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    </>
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
