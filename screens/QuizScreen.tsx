import { useEffect, useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import { ScrollView, View, VStack, Text } from "native-base";

import firebase from "firebase/app";
import "firebase/database";

import { Quiz, QuizDifficulty, RootTabScreenProps } from "../types";
import QuizCard from "../components/QuizCard";
import Firebase from "../config/Firebase";
import { randomColor } from "native-base/lib/typescript/theme/tools";

const auth = Firebase.auth();
const database = Firebase.database();

export default function QuizScreen({ navigation }: RootTabScreenProps<"Quiz">) {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUser(user);
      database
        .ref("quizzes")
        .once("value")
        .then((snapshot) => {
          const data: Quiz[] = [];
          for (const [key, value] of Object.entries(snapshot.val())) {
            data.push({ ...(value as Quiz), id: key });
          }
          // console.log(`>>> quiz data: `, data);
          setQuizzes(data);
        });
    }
  }, []);

  const quizList = quizzes.map((quiz)=>(
    <QuizCard key={quiz.id} quiz={quiz}/>
  ))

  return (
    <View style={styles.container}>
      <ScrollView
        _contentContainerStyle={{
          px: "20px",
          mt: "4",
        }}
      >
        <VStack space={4} alignItems="center">
          {quizzes.length > 0 && quizList}
        </VStack>
      </ScrollView>
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
});
