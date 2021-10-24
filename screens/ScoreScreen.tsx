import { View, Text } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { RootTabScreenProps } from '../types';

export default function ScoreScreen({ navigation }: RootTabScreenProps<'Score'>) {
  return (
    <View style={styles.container} bgColor="white">
     <Text color="blue.500" fontSize="xl" fontWeight="bold">Silver Badge</Text>
     <View style={styles.separator}>
     <Text fontSize="4xl" mt={20}>250</Text>
     <Text fontSize="md" mx={1}>Scores</Text>
     </View>
     <Text fontSize="md" mt={2}>5 Quiz Attempts</Text>

     <Text fontSize="lg" color="blue.400" mt={8}>Next Target</Text>
     <Text fontSize="md" mt={2}>Attempt 2 more Quizs</Text>
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
  separator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline'
  },
});
