import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../constant/color';
import {RFValue} from 'react-native-responsive-fontsize';
import fonts from '../constant/fonts';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CameraIcon from '../assests/svgs/camera.svg';
import LibraryIcon from '../assests/svgs/library.svg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PERMISSIONS, request} from 'react-native-permissions';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';
import { AddCustomImage } from '../store/actions/CustomImageAction';
const DrawingHeader = ({main_item, items,style}) => {
  const dispatch = useDispatch()
  const {selectedLanguage} = useSelector(state => state.languageReducer);
  const navigation = useNavigation();
  const handleCameraToggle = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      minHeight: 500,
      quality: 1,
      cameraType: 'back',
      saveToPhotos: true,
    };
    try {
      const PlatformPermission = Platform.select({
        ios: PERMISSIONS.IOS.CAMERA,
        android: PERMISSIONS.ANDROID.CAMERA,
      });
      const permissions = await request(PlatformPermission);
      console.log('PERMISSION', permissions);

      await launchCamera(options, response => {
        if (response.didCancel) {
        } else {
          const cameraUrl = response.assets[0].uri;
          navigateToSelectedImagePage(cameraUrl);
        }
      });
    } catch (error) {
      console.log('ERROR handling CAMERA', error);
    }
  };
  const handleGalleryImage = async () => {
    const options = {
      mediaType: 'photo',
      path: 'images/jpeg',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
        waitUntilSaved: true,
      },
    };
    try {
      const PlatformMediaPermission = Platform.select({
        ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
        android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      });
      const ImagesPermission = await request(PlatformMediaPermission);
      console.log('Image Permission', ImagesPermission);
      await launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('Image Permission Cancel');
        } else {
          const galleryImage = response.assets[0].uri;

          navigateToSelectedImagePage(galleryImage);
        }
      });
    } catch (error) {
      console.log('IMAGES PERMISSION');
    }
  };
  // const navigateToSelectedImagePage1 = url => {
  //   navigation.navigate('SelectedImage', {
  //     item: {id: uuid.v4('gfdsjgfjgdsjfgja'), link: url},
  //     main_item: {main_cat_name: 'Custom'},
  //   });
  // };

  const navigateToSelectedImagePage = url => {
     const imageObj = { id: uuid.v4(), link: url };
     dispatch(AddCustomImage(imageObj));
    navigation.navigate('SelectedImage', {
      link: url,
      main_cat_name: 'Custom',
      link2: url,
      item: {id: uuid.v4('gfdsjgfjgdsjfgja'), link: url},
      main_item: {main_cat_name: 'Custom'},
    });
  };
  return (
    <>
      <View
        style={{flexDirection: 'row', columnGap: 10, margin: 8, height: 55}}>
        <TouchableOpacity onPress={() => handleCameraToggle()}>
          <View style={styles.cameraContainer}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <CameraIcon width={wp(20)} height={hp(4)} />
              <Text
                style={{
                  marginVertical:5,
                  color: colors.textColor,
                  fontFamily: fonts.Medium,
                  fontSize: RFValue(12),
                }}>
                {selectedLanguage.camera}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleGalleryImage()}>
          <View style={styles.libraryContainer}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <LibraryIcon width={wp(20)} height={hp(4)} />
              <Text
                style={{
                  marginVertical:5,
                  color: colors.textColor,
                  fontFamily: fonts.Medium,
                  fontSize: RFValue(12),
                }}>
                {selectedLanguage.library}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DrawingHeader;

const styles = StyleSheet.create({
  cameraContainer: {
    width: wp(46),
    height: hp(10),
    backgroundColor: colors.cardsColor,
    shadowColor: colors.whiteColor,
    borderRadius: 5,
  },
  libraryContainer: {
    width: wp(46),
    height: hp(10),
    backgroundColor: colors.cardsColor,
    shadowColor: colors.whiteColor,
    borderRadius: 5,
  },
  camera: {
    width: wp(100),
    height: hp(100),
  },
});
