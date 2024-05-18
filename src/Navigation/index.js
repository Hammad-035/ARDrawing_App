import React from 'react';
import RootNavigation from './RootNavigation';
import AuthStack from './AuthStack';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';           
const MainApp = () => {
    const {is_home_screen}  = useSelector(state => state.userReducer)
  return (
    <NavigationContainer>
        {is_home_screen ? <RootNavigation /> :<AuthStack />}
    </NavigationContainer>
  );
};


export  default MainApp