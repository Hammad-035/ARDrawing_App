import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import TermandConditionIcon from '../assests/svgs/termandcondition.svg';
import RateusIcon from '../assests/svgs/rateus.svg';
import ShareApp from '../assests/svgs/shareapp.svg';
import MoreApp from '../assests/svgs/moreapp.svg';
import EluaIcon from '../assests/svgs/agrement.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../constant/color';
import fonts from '../constant/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
const SettingScreen = () => {
  const privacyPolicy = async () => {
    Linking.openURL(
      'https://sites.google.com/metasoltechnologies.com/metasol-technologies-privacy/home',
    ).catch(err => {
      
    });
  };
  const EULA = async () => {
    Linking.openURL(
      'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/',
    ).catch(err => {
      
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5', marginTop: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={()=>privacyPolicy()}>
          <View style={styles.termandcondition}>
            <TermandConditionIcon
              width={25}
              height={25}
              style={styles.termIcon}
            />
            <Text
              style={{
                color: colors.secondaryColor,
                fontFamily: fonts.SemiBold,
                fontSize: RFValue(14),
                marginLeft: -10,
              }}>
              Privacy Policy
            </Text>
          </View>
        </TouchableWithoutFeedback>
        {/* <TouchableWithoutFeedback>
          <View style={styles.RateusContainer}>
            <RateusIcon width={30} height={30} style={styles.RateusIcon} />
            <Text
              style={{
                color: colors.secondaryColor,
                fontFamily: fonts.SemiBold,
                fontSize: RFValue(14),
                marginLeft: -10,
              }}>
              Rate Us
            </Text>
          </View>
        </TouchableWithoutFeedback> */}
        <TouchableWithoutFeedback>
          <View style={styles.ShareAppContainer}>
            <ShareApp width={25} height={25} style={styles.shareppicon} />
            <Text
              style={{
                color: colors.secondaryColor,
                fontFamily: fonts.SemiBold,
                fontSize: RFValue(14),
                marginLeft: -10,
              }}>
              Share App
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.MoreAppContainer}>
            <MoreApp width={25} height={25} style={styles.MoreAppIcon} />
            <Text
              style={{
                color: colors.secondaryColor,
                fontFamily: fonts.SemiBold,
                fontSize: RFValue(14),
                marginLeft: -10,
              }}>
              More Apps
            </Text>
          </View>
        </TouchableWithoutFeedback>
       <TouchableWithoutFeedback onPress={()=>EULA()}>
       <View style={styles.ELuaContainer}>
          <EluaIcon width={25} height={25} style={styles.EluaIcon} />
          <Text
            style={{
              color: colors.secondaryColor,
              fontFamily: fonts.SemiBold,
              fontSize: RFValue(14),
              marginLeft: -10,
            }}>
            EULA
          </Text>
        </View>
       </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  termandcondition: {
    marginBottom: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    columnGap: 30,
    alignItems: 'center',
    width: wp(95),
    height: hp(8),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  termIcon: {
    marginHorizontal: 10,
    left: 10,
  },
  RateusContainer: {
    marginBottom: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    columnGap: 30,
    alignItems: 'center',
    width: wp(95),
    height: hp(8),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  RateusIcon: {
    marginHorizontal: 10,
    left: 10,
  },
  ShareAppContainer: {
    marginBottom: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    columnGap: 30,
    alignItems: 'center',
    width: wp(95),
    height: hp(8),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  shareppicon: {
    marginHorizontal: 10,
    left: 10,
  },
  MoreAppContainer: {
    marginBottom: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    columnGap: 30,
    alignItems: 'center',
    width: wp(95),
    height: hp(8),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  MoreAppIcon: {
    marginHorizontal: 10,
    left: 10,
  },
  ELuaContainer: {
    marginBottom: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    columnGap: 30,
    alignItems: 'center',
    width: wp(95),
    height: hp(8),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  EluaIcon: {
    marginHorizontal: 10,
    left: 10,
  },
});
