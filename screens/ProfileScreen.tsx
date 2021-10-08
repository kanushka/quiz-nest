import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, VStack } from "native-base"

import { Text, View } from '../components/Themed';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <VStack space={4} alignItems="center">

      <Avatar
        bg="blue.500"
        size="md"
        source={{
          uri: "https://pbs.twimg.com/profile_images/1188747996843761665/8CiUdKZW_400x400.jpg",
        }}
      >
        KG
      </Avatar>
      <Text style={styles.title}>Kanushka Gayan</Text>
      <Text style={styles.subtitle}>kanushkanet@gmail.com</Text>
      </VStack>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
