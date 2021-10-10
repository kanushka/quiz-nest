import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Avatar, Pressable, VStack, Text } from "native-base";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import { View } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
import Firebase from "../config/Firebase";

const auth = Firebase.auth();
const database = Firebase.database();

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState<firebase.User | null>();
  const [username, setUsername] = useState("Anonymous");

  useEffect(() => {
    const user = auth.currentUser;
    console.log(`profile user`, user);
    if (user) {
      setUser(user);
      database.ref('/users/' + user.uid).once('value').then((snapshot) => {
        console.log(`snapshot users: `, snapshot);
        setUsername((snapshot.val() && snapshot.val().username) || 'Anonymous');
      });
    }
  }, [auth]);

  const onLogOutPress = async () => {
    auth.signOut().then(() => {
      // Sign-out successful.
      navigation.navigate("Login");
    }).catch((error) => {
      console.log(`error`, error);
      // An error happened.
    });
  };

  const getInitials = (name: any) => {
    console.log(`getInitials:`, name)
    let nameSplit = String(name).toUpperCase().split(" ");
    let initials = "";
    if (nameSplit.length == 1) {
      initials = nameSplit[0] ? nameSplit[0].charAt(0) : "?";
    } else {
      initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
    }
    console.log(`initials:`, initials)
    return initials;
  };

  return (
    <View style={styles.container}>
      <VStack space={4} alignItems="center">
        <Avatar
          bg="blue.500"
          size="md"
          // source={{
          //   uri: user?.photoURL as string,
          // }}
        >
          {getInitials(username)}
        </Avatar>
        <Text style={styles.title}>{username}</Text>
        <Text style={styles.subtitle}>{user?.email}</Text>
        <Pressable onPress={onLogOutPress}>
          <Text fontSize="xs" color="blue.500">
            Logout
          </Text>
        </Pressable>
      </VStack>
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
  subtitle: {
    fontSize: 16,
    fontWeight: "normal",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
