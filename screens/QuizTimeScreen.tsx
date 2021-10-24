import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Box,
  HStack,
  VStack,
  Button,
  Radio,
  Checkbox,
  TextArea,
} from "native-base";
import * as React from "react";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";

import EditScreenInfo from "../components/EditScreenInfo";
import { Question, Quiz } from "../types";

type ParamList = {
  quiz: Quiz;
};

export default function QuizTimeScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [qNum, setQNum] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [minute, setMinute] = useState(19);
  const [second, setSecond] = useState(59);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      if (second == 0 && minute > 1) {
        setMinute(minute - 1);
      }
      setSecond((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount === 0) {
          return 59;
        }
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, []);

  const questions: Question[] = [
    {
      id: "1",
      type: "single",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis.",
      answers: [
        {
          id: "1",
          title: "consectetuer adipiscing",
          isCorrect: false,
        },
        {
          id: "2",
          title: "commodo ligula",
          isCorrect: false,
        },
        {
          id: "3",
          title: "sociis natoque",
          isCorrect: false,
        },
        {
          id: "4",
          title: "penatibus et magnis",
          isCorrect: true,
        },
      ],
    },
    {
      id: "2",
      type: "multiple",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab.",
      answers: [
        {
          id: "1",
          title: "perspiciatis adipiscing",
          isCorrect: false,
        },
        {
          id: "2",
          title: "voluptatem ligula",
          isCorrect: false,
        },
        {
          id: "3",
          title: "sociis accusantium",
          isCorrect: false,
        },
        {
          id: "4",
          title: "doloremque magnis",
          isCorrect: true,
        },
      ],
    },
    {
      id: "3",
      type: "text",
      description:
        "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport et.",
    },
    {
      id: "4",
      type: "image",
      description:
        "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with.",
    },
  ];

  return (
    <View
      bgColor="white"
      flex={1}
      px={8}
      pt={20}
      pb={8}
      style={styles.container}
    >
      <View>
        <View style={styles.titleWrap}>
          <Text fontSize="xl" fontWeight="bold">
            Pop Quiz 2
          </Text>
          <Text fontSize="xl">
            {minute}:{second}
          </Text>
        </View>
        <Text fontSize="md" fontWeight="semibold">
          Question {questions[qNum].id}
        </Text>
        <Text mt={4} fontSize="md">
          {questions[qNum].description}
        </Text>

        {questions[qNum].type === "single" && (
          <Radio.Group
            mt={8}
            defaultValue="1"
            name="answers"
            colorScheme="blue"
            accessibilityLabel="Pick the correct answer"
          >
            {questions[qNum].answers?.map((answer) => (
              <Radio value={answer.id} key={answer.id} my={1}>
                {answer.title}
              </Radio>
            ))}
          </Radio.Group>
        )}
        {questions[qNum].type === "multiple" && (
          <Checkbox.Group
            colorScheme="blue"
            accessibilityLabel="pick an answer"
          >
            {questions[qNum].answers?.map((answer) => (
              <Checkbox value={answer.id} key={answer.id} my={1}>
                {answer.title}
              </Checkbox>
            ))}
          </Checkbox.Group>
        )}
        {questions[qNum].type === "text" && (
          <TextArea mt={4} fontSize="md" placeholder="Enter your answer here" />
        )}
        {questions[qNum].type === "image" && !hasPermission && (
          <Text>No access to camera</Text>
        )}
        {questions[qNum].type === "image" && hasPermission && (
          <View style={styles.imageContainer} mt={8}>
            <Camera style={styles.camera} type={type}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                >
                  <Text style={styles.text}> Flip </Text>
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        )}
      </View>

      <View>
        {qNum > 0 && (
          <Button
            bg="blue.200"
            size="lg"
            w="100%"
            onPress={() => {
              setQNum(qNum - 1);
            }}
            spinnerPlacement="end"
            isLoadingText="Verifying"
          >
            Previous Quiz
          </Button>
        )}
        {questions.length > qNum + 1 && (
          <Button
            mt={2}
            bg="blue.500"
            size="lg"
            w="100%"
            onPress={() => {
              setQNum(qNum + 1);
            }}
            spinnerPlacement="end"
            isLoadingText="Verifying"
          >
            Next Quiz
          </Button>
        )}
        {questions.length === qNum + 1 && (
          <Button
            mt={2}
            bg="blue.500"
            size="lg"
            w="100%"
            onPress={() => navigation.navigate("QuizComplete")}
            spinnerPlacement="end"
            isLoadingText="Verifying"
          >
            Finish
          </Button>
        )}
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  titleWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
