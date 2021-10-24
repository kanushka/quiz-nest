import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { View, Text, Box, HStack, VStack,Button } from "native-base";
import * as React from "react";
import { useEffect } from "react";
import { Platform, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Quiz } from "../types";

type ParamList = {
  quiz: Quiz;
};

export default function QuizOverviewScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    //
  }, []);

  return (
    <View bgColor="white" flex={1} px={8} py={8}>
      <Text fontSize="xl" fontWeight="bold">Pop Quiz 2</Text>
      <Text fontSize="sm" color="blue.500">
        Created By: Pravini Charithra
      </Text>
      <Text mt={4} fontSize="md">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes.
      </Text>

      <Text mt={8} fontSize="md">
        Duration: 20 Minutes
      </Text>
      <Text mt={2} fontSize="md">
        Attempts: 1
      </Text>
      <HStack alignItems="baseline">
        <Text mt={2} fontSize="md">
          Difficulty:
        </Text>
        <Box bgColor="blue.200" borderRadius="full" px={4} pb={1} mx={2}>
          <Text color="blue.800">Easy</Text>
        </Box>
      </HStack>
        <Button
        mt={300}
          bg="blue.500"
          size="lg"
          w="100%"
          onPress={() => navigation.navigate("QuizTimeScreen")}
          spinnerPlacement="end"
          isLoadingText="Verifying"
        >
          Start Quiz
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
