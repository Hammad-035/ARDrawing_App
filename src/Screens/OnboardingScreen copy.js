import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import Onboarding from '../Components/Onboarding';
import CircleIcon from '../assests/svgs/CircleIcon.svg';
import { colors } from '../constant/color';
import fonts from '../constant/fonts';
import { setinittialRoute } from '../store/actions/InitialRouteName';
import { setHomeScreen } from '../store/actions/userAction';
///import { NativeBanner } from '../NativeAds/NativeBannerads';

const Simple = ({image}) => {
const dispatch = useDispatch();
const {selectedLanguage} = useSelector(state => state.languageReducer);
 console.log('SELECTED LANGUAGE',selectedLanguage)
  useEffect(()=>{
    dispatch(setinittialRoute('onboarding'))
  },[])
  const navigation = useNavigation();

  const navigateToMainScreen = () => {
   dispatch(setHomeScreen(true));
    //navigation.navigate(AuthRoutes.MainScreen)
  };

  const CustomButton = ({label, onPress}) => (
    <TouchableOpacity style={{marginHorizontal:6}} onPress={onPress}>
      <CircleIcon />
      <Icon
        name="arrow-forward-outline"
        size={25}
        color="white"
        style={styles.ArrowIcon}
      />
    </TouchableOpacity>
  );

  return (
    <>
      <View style={{flex: 1,backgroundColor:'#fff'}}>
        <View style={{width: wp(100), height: hp(65)}}>
          <Onboarding
            showSkip={false}
            skipToPage={0}
            onDone={navigateToMainScreen}
            bottomBarHighlight={false}
            NextButtonComponent={CustomButton}
            DoneButtonComponent={CustomButton}
            showNext={true}
            pages={[
              {
                backgroundColor: '#fff',
                image: (
                  <Image
                    resizeMode={'contain'}
                    source={require('../assests/images/onboarding1.png')}
                    style={{
                      height: hp(40),
                      width: wp(60),
                    }}
                  />
                ),
                title: (
                  <Text style={styles.traceText}>
                    {selectedLanguage.Trace} & <Text style={styles.sketchText}>{selectedLanguage.Sketch}</Text>
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
                      height: hp(40),
                      width: wp(60),
                    }}
                  />
                ),
                title: (
                  <Text style={styles.traceText}>
                    {selectedLanguage.variou_template}
                    <Text style={styles.sketchText}> {selectedLanguage.availibity} </Text>
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
                      height: hp(40),
                      width: wp(60),
                    }}
                  />
                ),
                title: (
                  <Text style={styles.traceText}>
                    {selectedLanguage.trace_image}
                     <Text style={styles.sketchText}> {selectedLanguage.from_gallery}</Text>
                  </Text>
                ),
                subtitle: (
                  <Text
                    style={{
                      textAlign: 'center',
                      color: colors.secondaryColor,
                      fontFamily: fonts.Medium,
                    }}>
                    {selectedLanguage.traceimagesfromgallery}
                  </Text>
                ),
              },
            ]}
          />
        </View>
      </View>
      {/* <NativeBanner /> */}
    </>
  );
};
const styles = StyleSheet.create({
  ArrowIcon: {
    position: 'absolute',
    top: 10,
    left: 12,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  traceText: {
    color: colors.primaryColor,
    fontSize: RFValue(15),
    fontFamily: fonts.Bold,
    marginTop: 10,
  },
  sketchText: {
    color: colors.secondaryColor,
    fontSize: RFValue(15),
    fontFamily: fonts.Bold,
  },
  variabletext: {
    color: colors.primaryColor,
    fontSize: RFValue(15),
    fontFamily: fonts.Bold,
  },
  availbleText: {
    olor: colors.secondaryColor,
    fontSize: RFValue(15),
    fontFamily: fonts.Bold,
  },
  permissionContainer: {
    marginBottom:25,
    marginTop:20,
    backgroundColor: '#F9F9F9',
    width: '90%',
    height: 60,
    justifyContent: 'center',
    shadowColor: 'black',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  locationText: {
    marginLeft: 10,
    color: '#1E1F4B',
    fontSize: 14,
  },
});
export default Simple;
