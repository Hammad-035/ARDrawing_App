import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import LanguageScreen from '../Screens/LanguageScreen';
import OnboardingScreen from '../Screens/OnboardingScreen';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  const initialRouteName = useSelector(state => state.initailRouteReducer);
 // console.log('route Name',initialRouteName)
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="Language"
        component={LanguageScreen}
        options={{
          title: 'Select Language',
          headerShown: true,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="onboarding"
        component={OnboardingScreen}
        options={{
          headerShown: false,
        }}
      />
      
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
