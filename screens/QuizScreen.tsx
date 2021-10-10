import { useEffect, useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import { ScrollView, View, VStack } from "native-base";

import firebase from "firebase/app";
import "firebase/database";

import { Quiz, QuizDifficulty, RootTabScreenProps } from "../types";
import QuizCard from "../components/QuizCard";
import Firebase from "../config/Firebase";

const auth = Firebase.auth();
const database = Firebase.database();

export default function QuizScreen({ navigation }: RootTabScreenProps<"Quiz">) {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
  const [check, setCheck] = useState(false);
  // var quizzes: Quiz[];

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUser(user);
      database
        .ref("quizzes")
        .once("value")
        .then((snapshot) => {
          const data: Quiz[] = snapshot.val();
          // console.log(`quiz snapshot: `, snapshot);
          // console.log(`quiz data: `, data);
          // quizzes = data;
          setQuizzes(data);
          setCheck(true);
          // console.log(`quizzes 0 : `, quizzes);
        });
    }

    // add dummy data
    // var postListRef = database.ref("quizzes");
    // for (let index = 1; index < 10; index++) {
    //   let newPostRef = postListRef.push();
    //   let quizz: Quiz = {
    //     title: "Pop Quize " + index,
    //     description:
    //       "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.",
    //     difficulty: index % 2 == 0 ? "easy" : "hard",
    //     duration: "2hr",
    //     count: 5 + index,
    //     owner: "AjGlKJZKfogewtWTJbAJhFTFrX23",
    //     rating: (index % 5) + 1,
    //   };
    //   newPostRef.set(quizz);
    // }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        _contentContainerStyle={{
          px: "20px",
          mt: "4",
        }}
      >
        <VStack space={4} alignItems="center">
          <QuizCard />;
          <QuizCard />;
          <QuizCard />;
          <QuizCard />;
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
