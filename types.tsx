/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { int32ARGBColor } from 'react-native-svg';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Setting: undefined;
  QuizOverview: undefined;
  QuizTimeScreen: undefined;
  QuizComplete: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Quiz: undefined;
  Score: undefined;
  Profile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type User = {
  id?: string;
  email: string;
  username: string;
};

export type Quiz = {
  id?: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  count: number;
  owner: User;
  rating: number;
  attempts: number;
};

export type Question = {
  id: string;
  img?: string;
  type: string; // single, multiple, text, image
  description: string;
  answers?: Answer[];
};

export type Answer = {
  id: string;
  img?: string;
  title: string;
  isCorrect: boolean;
};
