import Slider from '@react-native-community/slider';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Camera,
  NoCameraDeviceError,
  useCameraDevice,
} from 'react-native-vision-camera';
import {useDispatch, useSelector} from 'react-redux';
import DraggableZoomableImage from '../Components/DraggableZoomImage';
import CircleIcon from '../assests/svgs/Circle.svg';
import DownArrow from '../assests/svgs/DownArrow2.svg';
import FlashLightIcon from '../assests/svgs/FlashLightIcon.svg';
import FlashIconActive from '../assests/svgs/FlashlightActiveIcon.svg';
import OpacityNonActiveIcon from '../assests/svgs/OpacityNonActiveIcon.svg';
import OpicityIcon from '../assests/svgs/OpicityIcon.svg';
import {colors} from '../constant/color';
import fonts from '../constant/fonts';
import {savePhotoActions} from '../store/actions/Savephotoaction';
import {AddItems} from '../store/actions/favAction';
const {width, height} = Dimensions.get('window');
const ImageSelection = ({route}) => {
  const {item, link2, main_cat_name, link, main_item} = route.params;
  const {id} = item;
  const {favItems} = useSelector(state => state.favReducer);
  const dispatch = useDispatch();
  const cameraRef = useRef(null);
  const {save_photo} = useSelector(state => state.SavePhotoReducer);
  const [cameraOpened, setCameraOpened] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [opacityValue, setOpacityValue] = useState(50);
  const [isActiveIcon, setIsActiveIcon] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [flashIconIsActive, setflashIconIsActive] = useState(false);
  const [showHeaderRight, setShowHeaderRight] = useState(false);
  const [flash, setFlash] = useState('off');
  let device = useCameraDevice('back');
  const takePicture = async () => {
    const file = await cameraRef.current.takePhoto({
      flash: 'on',
      enableAutoRedEyeReduction: true,
    });
    dispatch(
      savePhotoActions({
        id: save_photo.length + 1,
        link: `file://${file.path}`,
      }),
    );
  };
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (cameraOpened) {
          return (
            <TouchableOpacity
              onPress={() => takePicture()}
              style={{
                backgroundColor: colors.primaryColor,
                width: wp(22),
                height: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                marginRight: 10,
              }}>
              <Text
                style={{
                  color: colors.textWhite,
                  fontFamily: fonts.Medium,
                  textAlign: 'center',
                }}>
                Save work
              </Text>
            </TouchableOpacity>
          );
        } else {
          return <View></View>;
        }
      },
    });
  }, [cameraOpened, itemIndex]);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      console.log('STATUS', status);
      setHasPermission(status === 'granted');
      setIsActive(true);
    })();
  }, []);

  const toggleCamera = () => {
    console.log('CAMERA OPEN');
    setIsActive(true);
    setCameraOpened(true);
    setShowHeaderRight(true);
  };
  const handleOpacityChange = value => {
    setOpacityValue(value);
  };
  const handleOpacityIcon = () => {
    setIsActiveIcon(!isActiveIcon);
    setIsCardOpen(!isCardOpen);
    setflashIconIsActive(flashIconIsActive);
  };
  const handleArrowClose = () => {
    setIsCardOpen(!isCardOpen);
    setIsActiveIcon(!isActiveIcon);
  };
  const handleFlashLightIcon = async () => {
    setFlash((prevFlash) => {
      const newFlash = prevFlash === 'off' ? 'on' : 'off';
      console.log('FLASH', newFlash);
      return newFlash;
    });
    setflashIconIsActive((prev) => !prev);
  };

  let itemIndex = favItems.findIndex(iitem => iitem.id === id);
  ///console.log('ITEM INDEX', itemIndex);
  if (device == null) return <NoCameraDeviceError />;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.whiteColor}}>
      <TouchableOpacity
        onPress={() => {
          dispatch(
            AddItems({
              ...item,
              main_cat_name: main_item.main_cat_name,
              link:
                main_item.main_cat_name === 'Custom' ? `${item.link}`:`https://metasoltechnologies.com/ai_art/${main_item.main_cat_name}/${item.link}`,
               link2: item.link,
              item: item,
              main_item: main_item,
            }),
          );
        }}
        style={{
          marginRight: 10,
          marginVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-end',
          //backgroundColor: '#0003',
          padding: 2,
          borderRadius: 5,
          display: cameraOpened ? 'none' : 'flex',
        }}>
        <View style={{borderRadius: 8}}>
          <AntDesign
            name={itemIndex > -1 ? 'heart' : 'hearto'}
            size={25}
            color={itemIndex > -1 ? 'red' : 'black'}
          />
        </View>
      </TouchableOpacity>
      {device != null && cameraOpened && hasPermission ? (
        <>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Camera
              photo={true}
              fla
              ref={cameraRef}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={isActive}
              photoQualityBalance="speed"
              onError={() => console.log('CAMERA ERROR')}
            />
            <DraggableZoomableImage
              resizeMode={'contain'}
              imageSource={{uri: `${main_item.main_cat_name === 'Custom' ? item?.link : link}`}}
              style={[styles.image, {opacity: opacityValue / 100}]}
            />
            {/* <View style={styles.DraggIconContainer}>
            <MoveCircle style={styles.MoveCircle} />
            <DraggIcon style={styles.DraggIcon} />
          </View> */}
          </View>
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
        </>
      ) : (
        <>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              resizeMode={'contain'}
              source={{uri: `${main_item.main_cat_name === 'Custom' ? item?.link : link}`}}
              style={{height: hp(55), width: wp(95), borderRadius: 15}}
            />
          </View>
        </>
      )}
      {!cameraOpened && (
        <TouchableOpacity
          style={styles.ContinueBtn}
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

export default ImageSelection;

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

  DraggIconContainer: {
    position: 'absolute',
    zIndex: 10,
    right: 10,
    bottom: 120,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    elevation: 10,
  },
  tabContainer: {
    width: wp(100),
    backgroundColor: colors.cardsColor,
    height: hp(8),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CircleIcon: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  DownArrow: {
    margin: 10,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
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
  DraggIcon: {
    marginTop: -55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: width,
    height: height,
    resizeMode: 'contain',
    transform: [{rotate: '90deg'}],
  },
});
