import Slider from '@react-native-community/slider';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
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
import { useToast } from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Camera,
  NoCameraDeviceError,
  useCameraDevice,
} from 'react-native-vision-camera';
import CircleIcon from '../assests/svgs/Circle.svg';
import DownArrow from '../assests/svgs/DownArrow2.svg';
import FlashLightIcon from '../assests/svgs/FlashLightIcon.svg';
import FlashIconActive from '../assests/svgs/FlashlightActiveIcon.svg';
import OpacityNonActiveIcon from '../assests/svgs/OpacityNonActiveIcon.svg';
import OpicityIcon from '../assests/svgs/OpicityIcon.svg';
import { colors } from '../constant/color';
import fonts from '../constant/fonts';
import LessionOnboarding from './LessonOnboardingScreen';
const LessonsScreen = ({route}) => {
  const item = route?.params?.data;
  
  //const image = route?.params?.link2;
  //console.log('Generated Link:', `https://metasoltechnologies.com/ai_art/lessons/${item.lesson}/${item.data[item.data.length - 1].file_name}`);
  const [loading,setLoading] = useState(false);
  const toast = useToast();
  let device = useCameraDevice('back');
  const cameraRef = useRef(null);
  const [cameraOpened, setCameraOpened] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [loadingImages, setLoadingImages] = useState({});
  const [coverIndex, setCoverIndex] = useState(null);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [opacityValue, setOpacityValue] = useState(50);
  const [error,setError] = useState(false)
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
      setIsActive(true);
      setCameraOpened(true);
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
  const handleFlashLightIcon = async () => {
    setflashIconIsActive(!flashIconIsActive);
  };
  const handleLoadStart = index => {
    setLoadingImages(prev => ({...prev, [index]: true}));
  };
  const handleLoadEnd = index => {
    setLoadingImages(prev => ({...prev, [index]: false}));
  };

  if (device == null) return <NoCameraDeviceError />;
  return (
    <SafeAreaView style={{flex: 1}}>
      {cameraOpened && hasPermission && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LessionOnboarding item={item} opacity={opacityValue} selectedImage={item.data[coverIndex]} />
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
            {item.data.map((items, index) => (
                <TouchableOpacity
                key={index}
                style={[
                  styles.container,
                  coverIndex === index,
                ]}
                onPress={() => handleCoverIndex(index)}>
                  <View style={styles.imageContainer} key={index}>
                  {loadingImages[index] && (
                    <ActivityIndicator
                      size="small"
                      color={colors.primaryColor}
                      style={styles.activityIndicator}
                    />
                  )}
                <Image
                  resizeMode={'contain'}
                  style={styles.ImageStyle}
                  source={{
                    uri: `https://metasoltechnologies.com/ai_art/lessons/${item.lesson}/${items.file_name}`,
                  }}
                  onLoadStart={() => handleLoadStart(index)}
                  onLoad={() => handleLoadEnd(index)}
                  onError={() => handleLoadEnd(index)}
                />
                </View>
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
    flex:1,
    width: wp(20),
    height: hp(8),
    alignItems:'center',
    justifyContent:'center',
     marginLeft:wp(5),
     marginBottom:hp(3)
  },
  rowContainer: {
    marginVertical:10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
     gap:10,
     marginLeft:10,
  },

  container: {
    width: wp(46),
    height: hp(13),  
    backgroundColor: '#FFFFFF',
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
  imageContainer: {
    width: wp(30),
    height: hp(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    position: 'absolute',
  },
});
