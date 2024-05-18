import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import HeaderTitle from '../Components/HeaderTitle';
import AnumCategory from '../PictureCategories/CategoriesPicture';
import ImageSelection from '../PictureCategories/ImageSelection';
import LanguageScreen from '../Screens/LanguageScreen';
import MainScreen from '../Screens/MainScreen';
import OnboardingScreen from '../Screens/OnboardingScreen';
import StepByStepScreen from '../Screens/StepByStepScreen';
import StepTwoScreen from '../Screens/StepTwoScreen';
import StepThreeScreen from '../Screens/StepThreeScreen';
import StepFourScreen from '../Screens/StepFourScreen';
import { useSelector } from 'react-redux';
import LessonsScreen from '../LessonScreens/LessonsScreen';
import { colors } from '../constant/color';
import fonts from '../constant/fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import WorkingScreenPreview from '../Screens/WorkingScreenPreview';
import SettingScreen from '../Screens/SettingScreen';

const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  const initialRouteName = useSelector(state => state.initailRouteReducer);
  console.log('route Name',initialRouteName)
  return (
    <Stack.Navigator initialRouteName={"MainScreen"}>
     
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AnimCat"
        component={AnumCategory}
        options={{
          headerShown: true,
          headerTitleStyle:{
            fontFamily:fonts.Medium
          },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="SelectedImage"
        component={ImageSelection}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: props => <HeaderTitle {...props} />,
        }}
      />
      <Stack.Screen
        name="StepbyStep"
        component={StepByStepScreen}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: props => <HeaderTitle {...props} />,
        }}
      />
      <Stack.Screen
        name="StepTwoScreen"
        component={StepTwoScreen}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: props => <HeaderTitle {...props} />,
        }}
      />
      <Stack.Screen
        name="StepThree"
        component={StepThreeScreen}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: props => <HeaderTitle {...props} />,
        }}
      />
      <Stack.Screen
        name="StepFour"
        component={StepFourScreen}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: props => <HeaderTitle {...props} />,
        }}
      />
       <Stack.Screen
        name="LessonScreen"
        component={LessonsScreen}
        options={{
          title:'Lessons',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleStyle:{
            color:colors.primaryColor,
            fontFamily:fonts.SemiBold,
            fontSize:RFValue(24)
          }
          //headerTitle: props => <HeaderTitle {...props} />,
        }}
      />
      <Stack.Screen
        name="WorkingPreview"
        component={WorkingScreenPreview}
        options={{
          title:'Saved Work',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleStyle:{
            color:colors.primaryColor,
            fontFamily:fonts.SemiBold,
            fontSize:RFValue(24)
          },
          headerTitle: props => <HeaderTitle {...props} />
        }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          title:'Setting',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleStyle:{
            color:colors.primaryColor,
            fontFamily:fonts.SemiBold,
            fontSize:RFValue(15)
          },
         //headerTitle: props => <HeaderTitle {...props} />
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
