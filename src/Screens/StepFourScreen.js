import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../constant/color';
import {RFValue} from 'react-native-responsive-fontsize';
import fonts from '../constant/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {AuthRoutes} from '../constant/routes';
import { useSelector } from 'react-redux';
const StepFourScreen = () => {
  const {selectedLanguage} = useSelector(state => state.languageReducer);
  const navigation = useNavigation();
  return (
    <>
      <View style={{flex: 1, backgroundColor: colors.whiteColor}}>
        <ScrollView>
          <View style={{marginHorizontal: 10, paddingVertical: 20}}>
            <Text
              style={{
                color: '#374151',
                fontSize: RFValue(20),
                fontFamily: fonts.Bold,
              }}>
              {selectedLanguage.learn_to_draw_in_step_by_step}
            </Text>
          </View>
          <View style={{margin: 10}}>
            <Text
              style={{
                color: '#374151',
                fontSize: RFValue(18),
                fontFamily: fonts.Bold,
              }}>
              {selectedLanguage.step_4}
            </Text>
            <Text
              style={{
                color: '#374151',
                fontSize: RFValue(13),
                fontFamily: fonts.Regular,
              }}>
             {selectedLanguage. After_selecting_your_favorite_image_the_trace_screen_will_show_the_drawing_on_your_phones_screen}
            </Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              resizeMode={'contain'}
              source={require('../assests/images/Step4.png')}
              style={{
                width: wp(100),
                height: hp(38),
              }}
            />
          </View>
        </ScrollView>
        <View
          style={{
            marginTop: hp(22),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate(AuthRoutes.MainScreen)}
            style={styles.ContinueBtn}>
            <Text
              style={{
                color: colors.textWhite,
                textAlign: 'center',
                fontSize: RFValue(20),
                fontFamily: fonts.Bold,
              }}>
              {selectedLanguage.start_to_draw}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default StepFourScreen;

const styles = StyleSheet.create({
  ContinueBtn: {
    backgroundColor: colors.primaryColor,
    width: wp(95),
    height: hp(8),
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
