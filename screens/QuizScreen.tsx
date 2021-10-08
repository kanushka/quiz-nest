import { useEffect } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import { ScrollView, Center, VStack } from "native-base";

import firebase from "firebase/app";
import "firebase/firestore";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import QuizCard from "../components/QuizCard";
import configs from '../constants/Firebase';

export default function QuizScreen({ navigation }: RootTabScreenProps<"Quiz">) {
  var db: firebase.firestore.Firestore;

  useEffect(() => {    
    if (!firebase.apps.length) {
      firebase.initializeApp(configs.firebase);
   }else {
      firebase.app(); // if already initialized, use that one
   }
   db = firebase.firestore();
  }, []);

  useEffect(() => {
     db.collection("users")
      .add({
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }, [db])

  return (
    <View style={styles.container}>
      <ScrollView
        _contentContainerStyle={{
          px: "20px",
          mt: "4",
        }}
      >
        <VStack space={4} alignItems="center">
          <QuizCard />
          <QuizCard />
          <QuizCard />
          <QuizCard />
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
