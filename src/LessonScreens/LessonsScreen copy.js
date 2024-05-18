import Slider from '@react-native-community/slider';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useToast} from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Camera,
  NoCameraDeviceError,
  useCameraDevice,
} from 'react-native-vision-camera';
import Image1 from '../assests/images/Image1.png';
import Image2 from '../assests/images/Image2.png';
import Image3 from '../assests/images/Image3.png';
import Image4 from '../assests/images/Image4.png';
import Image5 from '../assests/images/Image5.png';
import Image6 from '../assests/images/Image6.png';
import Image7 from '../assests/images/Image7.png';
import Image8 from '../assests/images/Image8.png';
import Image9 from '../assests/images/Image9.png';
import CircleIcon from '../assests/svgs/Circle.svg';
import DownArrow from '../assests/svgs/DownArrow2.svg';
import FlashLightIcon from '../assests/svgs/FlashLightIcon.svg';
import FlashIconActive from '../assests/svgs/FlashlightActiveIcon.svg';
import OpacityNonActiveIcon from '../assests/svgs/OpacityNonActiveIcon.svg';
import OpicityIcon from '../assests/svgs/OpicityIcon.svg';
import {colors} from '../constant/color';
import fonts from '../constant/fonts';
import LessionOnboarding from './LessonOnboardingScreen';
const LessonsScreen = ({route}) => {
  const item = route?.params?.data;
  console.log('ITEMS IN LESSON LEARNING SCREEN', item.data);
  const toast = useToast();
  let device = useCameraDevice('back');
  const cameraRef = useRef(null);
  const [cameraOpened, setCameraOpened] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [coverIndex, setCoverIndex] = useState(null);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [opacityValue, setOpacityValue] = useState(50);
  const [isActiveIcon, setIsActiveIcon] = useState(false);
  const [flashIconIsActive, setflashIconIsActive] = useState(false);
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      console.log('STATUS in Lessons Screen', status);
      setHasPermission(status === 'granted');
      setIsActive(true);
    })();
  }, []);
  const handleCoverIndex = index => {
    setCoverIndex(prevIndex => (prevIndex === index ? null : index));
  };
  const toggleCamera = () => {
    toast.hideAll();
    if (coverIndex == null) {
      toast.show('OOPS!!! SELECT PICTURE', {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in | zoom-in',
      });
      setIsActive(false);
      setCameraOpened(false);
    } else {
      setIsActive(true);
      setCameraOpened(true);
    }
  };
  const handleOpacityIcon = () => {
    setIsActiveIcon(!isActiveIcon);
    setIsCardOpen(!isCardOpen);
    setflashIconIsActive(flashIconIsActive);
  };
  const handleOpacityChange = value => {
    setOpacityValue(value);
  };

  const handleArrowClose = () => {
    setIsCardOpen(!isCardOpen);
    setIsActiveIcon(!isActiveIcon);
  };

  if (device == null) return <NoCameraDeviceError />;
  return (
    <SafeAreaView style={{flex: 1}}>
      {cameraOpened && hasPermission && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LessionOnboarding opacity={opacityValue} />
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isActive}
            onError={e => console.log('CAMERA ERROR', e)}
          />
        </View>
      )}
      {!cameraOpened && (
        <ScrollView>
          <View style={styles.rowContainer}>
            {item.data.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.container,
                  coverIndex === index && {backgroundColor: 'lightblue'},
                ]}
                onPress={() => handleCoverIndex(index)}>
                <Image
                  resizeMode={'contain'}
                  style={styles.ImageStyle}
                  source={{
                    uri: `https://metasoltechnologies.com/ai_art/lessons/${item.lesson}/${item.file_name}`,
                  }}
                />
                <View style={styles.coverIcon}>
                  {coverIndex === index && (
                    <Icon name="check-circle" size={25} color="#3972FE" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
      {isCardOpen ? (
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            onPress={() => handleArrowClose()}
            style={{
              alignSelf: 'flex-end',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -60,
            }}>
            <CircleIcon width={45} height={45} style={styles.CircleIcon} />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -26,
              }}>
              <DownArrow />
            </View>
          </TouchableOpacity>
          <View style={{position: 'absolute'}}>
            <Slider
              style={{
                width: wp(70),
                alignSelf: 'center',
                alignItems: 'center',
              }}
              minimumValue={0}
              maximumValue={100}
              value={opacityValue}
              onValueChange={handleOpacityChange}
              step={1}
              minimumTrackTintColor={colors.primaryColor}
              maximumTrackTintColor="#000000"
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>{opacityValue}</Text>
              <Text>100</Text>
            </View>
          </View>
        </View>
      ) : null}
      {cameraOpened && hasPermission ? (
        <View style={styles.tabContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              margin: 10,
              columnGap: 140,
            }}>
            <TouchableOpacity onPress={() => handleOpacityIcon()}>
              {isActiveIcon ? (
                <OpicityIcon width={20} height={20} />
              ) : (
                <OpacityNonActiveIcon width={20} height={20} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFlashLightIcon()}>
              {flashIconIsActive ? (
                <FlashIconActive width={20} height={20} />
              ) : (
                <FlashLightIcon width={20} height={20} />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
              columnGap: 100,
              marginTop: -10,
            }}>
            <Text>Opacity</Text>
            <Text>Flashlight</Text>
          </View>
        </View>
      ) : null}
      {!cameraOpened && (
        <TouchableOpacity
          style={styles.BtnContainer}
          onPress={() => toggleCamera()}>
          <Text
            style={{
              color: colors.textWhite,
              textAlign: 'center',
              fontSize: RFValue(20),
              fontFamily: fonts.Bold,
            }}>
            Continue
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};
export default LessonsScreen;

const styles = StyleSheet.create({
  ImageStyle: {
    flexDirection: 'row',
    width: wp(30),
    height: hp(10),
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    width: wp('100%'),
    columnGap: 8,
    margin: 8,
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  container: {
    width: wp(46),
    height: hp(13),
    marginTop: 5,
    backgroundColor: '#F9F9F9',
    padding: 5,
    borderRadius: 10,
  },
  coverIcon: {
    position: 'absolute',
    right: 10,
    marginTop: 10,
  },
  BtnContainer: {
    margin: 20,
    width: wp(90),
    backgroundColor: colors.primaryColor,
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  toggleContainer: {
    position: 'absolute',
    bottom: hp(8),
    width: wp(100),
    height: hp(10),
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    width: wp(100),
    backgroundColor: colors.cardsColor,
    height: hp(8),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
