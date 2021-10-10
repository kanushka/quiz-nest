import * as React from "react";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
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

import { View } from "../../components/Themed";
import Firebase from "../../config/Firebase";

const auth = Firebase.auth();

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("visibility-off");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoginError("");
  }, [email, password])

  const handlePasswordVisibility = () => {
    if (rightIcon === "visibility") {
      setRightIcon("visibility-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "visibility-off") {
      setRightIcon("visibility");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLoginPress = async () => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(`signed user: `, user);
        resetForm();
        navigation.navigate("Root");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(`signed user error: `, errorMessage);
        setLoading(false);
        setLoginError(errorMessage);
      });
  };

  const onRegisterPress = () => {
    navigation.navigate("Register");
  };

  const onForgotPassPress = () => {
    // navigation.navigate("Register");
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setLoading(false);
    setPasswordVisibility(false);
    setLoginError("");
  };
  
  return (
    <>
      <View style={styles.container}>
        <VStack px={10} space={4} w="100%" alignItems="center">
          <Heading textAlign="center" mb="10">
            Login
          </Heading>
          <Input
            w="100%"
            size="md"
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
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

          {loginError !== "" && (
            <Text color="error.400" fontSize="sm">
              {loginError}
            </Text>
          )}

          <Button
            bg="blue.500"
            size="lg"
            w="100%"
            onPress={onLoginPress}
            isLoading={loading}
            spinnerPlacement="end"
            isLoadingText="Verifying"
          >
            Login
          </Button>
          <HStack space={4} alignItems="flex-end">
            <Pressable onPress={onForgotPassPress}>
              <Text color="gray.500" fontSize="sm">
                Forgot password?
              </Text>
            </Pressable>
          </HStack>
        </VStack>
      </View>
      <View>
        <VStack py={5} alignItems="center">
          <HStack space={2} alignItems="center">
            <Text fontSize="sm">I dont have an account.</Text>
            <Pressable onPress={onRegisterPress}>
              <Text fontSize="sm" color="blue.500">
                Register
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
