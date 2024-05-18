import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const WorkingScreenPreview = ({route}) => {
  const navigation = useNavigation();
  const {item} = route?.params;
  console.log('WORKING PREVIEW', item);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#F9F9F9'}}>
      <Image
        borderRadius={20}
        resizeMode={'cover'}
        source={{uri: item.link}}
        style={{
          width: wp(95),
          height: hp(40),
        }}
      />
    </View>
  );
};

export default WorkingScreenPreview;

const styles = StyleSheet.create({});
