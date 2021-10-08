import React from "react";
import { Pressable, Box, Heading, Text, HStack, Stack } from "native-base";
import { useNavigation } from "@react-navigation/native";

export default function QuizCard() {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate("Modal")}>
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
                  The Garden City
                </Heading>
                <Text
                  fontSize="xs"
                  _light={{
                    color: "violet.500",
                  }}
                  _dark={{
                    color: "violet.400",
                  }}
                  fontWeight="500"
                  ml="-0.5"
                  mt="-1"
                >
                  The Silicon Valley of India.
                </Text>
              </Stack>
              <Text fontWeight="400">
                Bengaluru (also called Bangalore) is the center of India's
                high-tech industry. The city is also known for its parks and
                nightlife.
              </Text>
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
                    6 mins ago
                  </Text>
                </HStack>
              </HStack>
            </Stack>
          </Box>
        );
      }}
    </Pressable>
  );
}
