import React from 'react';
import {StatusBar, View} from 'react-native';
const CustomStatusBar = ({backgroundColor}) => {
  return (
    <View style={{backgroundColor}}>
      <StatusBar backgroundColor={'#F5F5F5'} barStyle={'dark-content'} />
    </View>
  );
};

export default CustomStatusBar;