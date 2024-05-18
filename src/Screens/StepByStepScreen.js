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
const StepByStepScreen = () => {
  const {selectedLanguage} = useSelector(state => state.languageReducer);
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: colors.whiteColor}}>
      <ScrollView>
        <View style={{marginHorizontal: 10, paddingVertical: 20}}>
          <Text
            style={{
              color: '#374151',
              fontSize: RFValue(20),
              fontFamily: fonts.Medium,
            }}>
            {selectedLanguage.learn_to_draw_in_step_by_step}
          </Text>
        </View>
        <View style={{margin: 10}}>
          <Text
            style={{
              color: '#374151',
              fontSize: RFValue(18),
              fontFamily: fonts.Medium,
            }}>
            {selectedLanguage.step_1}
          </Text>
          <Text
            style={{
              color: '#374151',
              fontSize: RFValue(13),
              fontFamily: fonts.Regular,
            }}>
            {selectedLanguage.Put_your_phone_on_a_water_glass_so_that_it_is_parallel_to_the_table}
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            resizeMode={'contain'}
            source={require('../assests/images/Step1.png')}
            style={{
              width: wp(100),
              height: hp(38),
            }}
          />
        </View>
        <View
          style={{
            margin: 10,
            gap: 10,
          }}>
          <Text>Note: </Text>
          <Text
            style={{
              color: '#374151',
              fontFamily: fonts.Regular,
              fontSize: RFValue(14),
            }}>
            1 {selectedLanguage.Turn_on_maximum_screen_brightness_to_display_lines_more_easily}
          </Text>
          <Text
            style={{
              color: '#374151',
              fontFamily: fonts.Regular,
              fontSize: RFValue(14),
            }}>
            2 {selectedLanguage.Use_screen_lock_mode_when_drawing_to_avoid_movement}
          </Text>
          <Text
            style={{
              color: '#374151',
              fontFamily: fonts.Regular,
              fontSize: RFValue(14),
            }}>
            3 {selectedLanguage.Drawing_paper_that_is_too_thick_will_not_be_able_to_print_lines}
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate(AuthRoutes.StepTwo)}
        style={styles.ContinueBtn}>
        <Text
          style={{
            color: colors.textWhite,
            textAlign: 'center',
            fontSize: RFValue(20),
            fontFamily: fonts.Bold,
          }}>
          {selectedLanguage.Next}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StepByStepScreen;

const styles = StyleSheet.create({
  ContinueBtn: {
    backgroundColor: colors.primaryColor,
    width: wp(95),
    height: hp(8),
    margin: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
