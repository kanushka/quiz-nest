import React from "react";
import {
  Pressable,
  Box,
  Heading,
  Text,
  HStack,
  Stack,
  Badge,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Quiz } from "../types";

export interface QuizCardProps {
  quiz: Quiz;
}

export default function QuizCard(props: QuizCardProps) {
  const navigation = useNavigation();
  const { quiz } = props;
  return (
    <Pressable onPress={() => navigation.navigate("QuizOverview")}>
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Box
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "gray.50",
            }}
            style={{
              transform: [
                {
                  scale: isPressed ? 0.98 : 1,
                },
              ],
            }}
          >
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1">
                  {quiz.title}
                </Heading>
                <Text
                  fontSize="xs"
                  _light={{
                    color: "blue.500",
                  }}
                  _dark={{
                    color: "blue.400",
                  }}
                  fontWeight="500"
                  ml="-0.5"
                  mt="-1"
                >
                  {quiz.owner.username}
                </Text>
              </Stack>
              <Text fontWeight="400">{quiz.description}</Text>
              <HStack
                alignItems="center"
                space={4}
                justifyContent="space-between"
              >
                <HStack alignItems="center">
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    fontWeight="400"
                  >
                    {quiz.duration}
                  </Text>
                </HStack>
                <Box bgColor="blue.200" borderRadius="full" px={4} pb={1}>
                  <Text color="blue.800">{quiz.difficulty}</Text>
                </Box>
              </HStack>
            </Stack>
          </Box>
        );
      }}
    </Pressable>
  );
}
