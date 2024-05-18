import {Image, Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import React, {useState, useEffect} from 'react';
import Onboarding from '../Components/Onboarding';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../constant/color';
import fonts from '../constant/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {setinittialRoute} from '../store/actions/InitialRouteName';
import {setHomeScreen} from '../store/actions/userAction';

const Simple = () => {
  const dispatch = useDispatch();
  const {selectedLanguage} = useSelector(state => state.languageReducer);
  console.log('SELECTED LANGUAGE', selectedLanguage);
  const navigateToMainScreen = () => {
    dispatch(setHomeScreen(true));
    //navigation.navigate(AuthRoutes.MainScreen)
  };

  useEffect(() => {
    dispatch(setinittialRoute('onboarding'));
  }, []);
  const CustomButton = ({label, onPress}) => (
    <TouchableOpacity style={styles.NextBtn} onPress={onPress}>
      <Text
        style={{
          color: colors.textWhite,
          textAlign: 'center',
          fontSize: RFValue(20),
          fontFamily: fonts.Bold,
        }}>
        Let's Go
      </Text>
    </TouchableOpacity>
  );
  return (
    <Onboarding
      showSkip={false}
      skipToPage={0}
      bottomBarHighlight={false}
      showNext={false}
      onDone={navigateToMainScreen}
      NextButtonComponent={CustomButton}
      DoneButtonComponent={CustomButton}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              resizeMode={'contain'}
              source={require('../assests/images/onboarding1.png')}
              style={{
                height: hp(60),
                width: wp(75),
                
              }}
            />
          ),
          title: (
            <Text style={styles.traceText}>
              {selectedLanguage.Trace} &{' '}
              <Text style={styles.sketchText}>{selectedLanguage.Sketch}</Text>
            </Text>
          ),
          subtitle: (
            <Text
              style={{
                color: colors.secondaryColor,
                fontFamily: fonts.Medium,
               
              }}>
              {selectedLanguage.usecameratodrawsketch}
            </Text>
          ),
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              resizeMode={'contain'}
              source={require('../assests/images/onboarding2.png')}
              style={{
                height: hp(55),
                width: wp(96),
              }}
            />
          ),
          title: (
            <Text style={styles.traceText}>
              {selectedLanguage.variou_template}
              <Text style={styles.sketchText}>
                {' '}
                {selectedLanguage.availibity}{' '}
              </Text>
            </Text>
          ),
          subtitle: (
            <>
              
              <Text
                style={{
                  textAlign: 'center',
                  color: colors.secondaryColor,
                  fontFamily: fonts.Medium,
                 
                }}>
                {selectedLanguage.varioustemplateavailible}
              </Text>
             
            </>
          ),
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              resizeMode={'contain'}
              source={require('../assests/images/onboarding3.png')}
              style={{
                height: hp(70),
                width: wp(70),
              }}
            />
          ),
          title: (
            <View style={{bottom:hp(10)}}>
              <Text style={styles.traceText}>
              {selectedLanguage.trace_image}
              <Text style={styles.sketchText}>
                {' '}
                {selectedLanguage.from_gallery}
              </Text>
            </Text>
            </View>
          ),
          subtitle: (
            <View style={{bottom:hp(10)}}>
              <Text
              style={{
                textAlign: 'center',
                color: colors.secondaryColor,
                fontFamily: fonts.Medium,
               
              }}>
              {selectedLanguage.traceimagesfromgallery}
            </Text>
            </View>
          ),
        },
      ]}
    />
  );
};
const styles = StyleSheet.create({
 
  traceText: {
    color: colors.primaryColor,
    fontSize: RFValue(18),
    fontFamily: fonts.SemiBold,
    justifyContent:'center',
    alignItems:'center',
   
    
  },
  sketchText: {
    color: colors.secondaryColor,
    fontSize: RFValue(18),
    fontFamily: fonts.SemiBold,
    justifyContent:'center',
    alignItems:'center',
    
  },
  variabletext: {
    color: colors.primaryColor,
    fontSize: RFValue(18),
    fontFamily: fonts.SemiBold,
    fontWeight: '700',
    
  },
  availbleText: {
    olor: colors.secondaryColor,
    fontSize: RFValue(18),
    fontFamily: fonts.Medium,
    fontWeight: '700',
   
  },
  NextBtn: {
    backgroundColor: colors.primaryColor,
    width: wp(95),
    height: hp(8),
    margin: 10,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
export default Simple;
