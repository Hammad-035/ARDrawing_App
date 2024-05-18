import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import Drawing from '../BottomTabs/Drawing';
import Favourites from '../BottomTabs/Favourites';
import Lession from '../BottomTabs/Lession';
import Work from '../BottomTabs/Work';
import ActiveDrawingIcon from '../assests/svgs/ActiveDrawingColor.svg';
import ActiveFavouriteIcon from '../assests/svgs/ActiveFavouriteIcon.svg';
import ActiveLessonIcon from '../assests/svgs/ActiveGraduateIcon.svg';
import ActiveWorkIcon from '../assests/svgs/ActiveWorkIcon.svg';
import DrawingIcon from '../assests/svgs/Drawing.svg';
import FavourireIcon from '../assests/svgs/Favourite.svg';
import LessionIcon from '../assests/svgs/Graduate.svg';
import WorkIcon from '../assests/svgs/Works.svg';
import { colors } from '../constant/color';
import fonts from '../constant/fonts';
const Tab = createBottomTabNavigator();
const MainScreen = () => {
  const {selectedLanguage} = useSelector(state=>state.languageReducer);
  
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({  
        tabBarStyle:{
          backgroundColor:colors.tabBarBackgroundColor,
          height:60
        },
        tabBarLabelStyle:{
          fontSize:RFValue(12),
          paddingBottom:8
        },
        tabBarIconStyle:{
          marginTop:9,
          marginBottom:5,
          
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let iconSize = size || 25;
          switch (route.name) {
            case 'Drawing':
              iconName = focused ? (
                <ActiveDrawingIcon width={iconSize} height={iconSize} />
              ) : (
                <DrawingIcon width={iconSize} height={iconSize} />
              );
              break;
            case 'Lesson':
              iconName = focused ? (
                <ActiveLessonIcon width={iconSize} height={iconSize} />
              ) : (
                <LessionIcon width={iconSize} height={iconSize} />
              );
              break;
            case 'Favourites':
              iconName = focused ? (
                <ActiveFavouriteIcon width={iconSize} height={iconSize} />
              ) : (
                <FavourireIcon width={iconSize} height={iconSize} />
              );
              break;
            case 'Work':
              iconName = focused ? (
                <ActiveWorkIcon width={iconSize} height={iconSize} />
              ) : (
                <WorkIcon width={iconSize} height={iconSize} />
              );
              break;
            default:
              iconName = null;
              break;
          }
          return iconName;
        },
        tabBarActiveTintColor: colors.primaryColor,
        
      })}>
      <Tab.Screen
        options={{
          tabBarLabel: selectedLanguage.Drawing,
          headerShown: false,
        }}
        name="Drawing"
        component={Drawing}
      />
      <Tab.Screen
        name="Lesson"
        component={Lession}
        options={{
          tabBarLabel: selectedLanguage.Lession,
          headerShown: true,
          headerTitleStyle:{
            color:colors.primaryColor,
            fontFamily:fonts.SemiBold,
            fontSize:RFValue(24)
          }
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          tabBarLabel: selectedLanguage.Favourites,
          headerShown: true,
          headerTitleStyle:{
            color:colors.primaryColor,
            fontFamily:fonts.SemiBold,
            fontSize:RFValue(24)
          }
        }}
      />
      <Tab.Screen
        name="Work"
        component={Work}
        options={{
          tabBarLabel: selectedLanguage.Work,
          headerShown: true,
         
          headerTitleStyle:{
            color:colors.primaryColor,
            fontFamily:fonts.SemiBold,
            fontSize:RFValue(24)
          }
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
