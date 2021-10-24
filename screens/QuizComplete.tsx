import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { View, Text, Box, HStack, VStack,Button } from "native-base";
import * as React from "react";
import { useEffect } from "react";
import { Platform, StyleSheet } from "react-native";

import { Quiz } from "../types";

type ParamList = {
  quiz: Quiz;
};

export default function QuizComplete() {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    //
  }, []);

  return (
    <View bgColor="white" flex={1} px={8} py={20} alignItems="center">
      <Text fontSize="xl" fontWeight="bold">Quiz Completed</Text>
      <Text fontSize="sm" color="blue.500" mt={8}>
        Silver Badge
      </Text>
      <Text mt={4} fontSize="3xl">
       2/4
      </Text>

      <Text mt={8} fontSize="md">
        Duration: 5 Minutes
      </Text>
      <Text mt={2} fontSize="md">
        Attempts: 2
      </Text>

        <Button
        mt={400}
          bg="blue.500"
          size="lg"
          w="100%"
          onPress={() => navigation.navigate("Root")}
          spinnerPlacement="end"
          isLoadingText="Verifying"
        >
          Quiz Home
        </Button>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
