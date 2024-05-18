import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useRef, useState, useEffect} from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
  BackHandler,
  Alert,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-virtualized-view';
import {useSelector} from 'react-redux';
import CustomImageBox from '../Components/CustomImageBox';
import DrawingHeader from '../Components/DrawingHeader';
import ArrowIcon from '../assests/svgs/ArrowIcon.svg';
import BabiPicture from '../assests/svgs/babipicture.svg';
import {colors} from '../constant/color';
import fonts from '../constant/fonts';
import {AuthRoutes} from '../constant/routes';
import original_data from '../data/original_data.json';
import SettingIcon from '../assests/svgs/Setting.svg';
const {width} = Dimensions.get('window');
const Drawing = ({main_item}) => {
  const navigation = useNavigation(true);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [loadingImages, setLoadingImages] = useState({});
  const {selectedLanguage} = useSelector(state => state.languageReducer);
  const {customImages} = useSelector(state => state.CustomImageReducer);
  //console.log('CUSTOM IMAGE in DRAWING', customImages);
  const [showSecondTouchable, setShowSecondTouchable] = useState(false);
  const [scrollY, setScrollY] = useState(false);
  const animationController = useRef(new Animated.Value(1)).current;

  const toggleListItem = () => {
    if (scrollY) {
      Animated.timing(animationController, {
        duration: 500,
        toValue: 0,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animationController, {
        duration: 500,
        toValue: 1,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }
    setScrollY(!scrollY);
  };
  const numColumns = 3;
  const itemWidth = (width - 20) / numColumns;
  const handleLoadStart = index => {
    setLoadingImages(prev => ({...prev, [index]: true}));
  };
  const handleLoadEnd = index => {
    setLoadingImages(prev => ({...prev, [index]: false}));
  };
  useFocusEffect(
    React.useCallback(() => {
      //console.log('USECALLBACK')
      const onBackPress = () => {
        if (isSelectionMode) {
          setIsSelectionMode(true);
          Alert.alert('Hold on!', 'Do you really want to exit?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: () => BackHandler.exitApp()},
          ]);
          return true;
        } else {
          return false;
        }
      };
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => subscription.remove();
    }, [isSelectionMode]),
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F9F9F9'}}>
      <View style={{margin: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.Tracetext}>
            {selectedLanguage.Trace} &
            <Text style={styles.sketchText}>{selectedLanguage.Sketch}</Text>
          </Text>
          <TouchableOpacity onPress={()=>navigation.navigate(AuthRoutes.setting)}>
            <SettingIcon style={styles.settingicon} width={25} height={25} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: colors.secondaryColor,
            fontSize: RFValue(10),
            fontFamily: fonts.Medium,
            fontWeight: '700',
            paddingLeft: 5,
          }}>
          {selectedLanguage.Trace_image_on_paper_with_camera_tracing}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate(AuthRoutes.StepByStep)}>
        <View style={[styles.CardBtn]}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <BabiPicture style={styles.BabiPicture} />
            <Image
              resizeMode={'contain'}
              source={require('../assests/images/CardBtn2.png')}
              style={{
                borderRadius: 5,
                height: hp(10),
                width: wp(95),
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-end',
              marginTop: -hp(8),
              marginRight: 80,
            }}>
            <Text
              style={{
                color: colors.textColor,
                fontSize: RFValue(12),
                fontFamily: fonts.SemiBold,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'left',
                margin: 10,
              }}>
            {selectedLanguage.Learn_Draw_Step_Step}
            </Text>
            {/* //<ArrowIcon width={25} height={25} style={styles.ArrowIcon} /> */}
          </View>
        </View>
      </TouchableOpacity>
      <DrawingHeader />
      <ScrollView
        style={{
          flex: 1,
          marginTop: 12,
          marginVertical: 10,
        }}
        showsVerticalScrollIndicator={false}>
        {original_data.map((main_item, index) => {
          return (
            <View
              key={index}
              style={{
                width: wp(100),
                height: hp(20),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: wp(100) - 20,
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                  marginTop:hp(3)
                }}>
                <Text
                  style={{
                    fontFamily: fonts.Medium,
                    fontWeight: '700',
                    color: '#000',
                    fontSize: RFValue(16),
                    marginBottom: 10,
                    marginLeft: 10,
                  }}>
                  {main_item.main_cat_name}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(AuthRoutes.AnimCat, {data: main_item})
                  }>
                  <Text
                    style={{
                      fontFamily: fonts.Medium,
                      fontWeight: '500',
                      color: '#000',
                      fontSize: RFValue(12),
                      marginRight: 10,
                    }}>
                    {selectedLanguage.viewall}
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}
                data={main_item.data.slice(0, 3)}
                numColumns={numColumns}
                renderItem={({item, index}) => (
                  <View style={{width: itemWidth}}>
                    <CustomImageBox
                      item={item}
                      main_item={main_item}
                      index={index}
                    />
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          );
        })}
        <View style={{marginHorizontal: 10, marginVertical: 20}}>
          <Text
            style={{
              fontFamily: fonts.SemiBold,
              color: '#000',
              marginBottom: 5,
              marginTop: 5,
            }}>
            Custom Category
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
            alignItems: 'center',
          }}>
          {customImages.map((item, index) => {
            //console.log('ITEMS IN CUSTOM IMAGE',item.link)
            return (
              <View key={index}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('SelectedImage', {
                      item: item,
                      main_cat_name: 'Custom',
                      link: item.link,
                      id: item.id,
                      link2: item.link,
                      main_item: {main_cat_name: 'Custom'},
                    })
                  }>
                  <View style={styles.imageContainer} key={index}>
                    {loadingImages[index] && (
                      <ActivityIndicator
                        size="small"
                        color={colors.primaryColor}
                        style={styles.activityIndicator}
                      />
                    )}
                    <Image
                      onLoadStart={() => handleLoadStart(index)}
                      onLoad={() => handleLoadEnd(index)}
                      onError={() => handleLoadEnd(index)}
                      resizeMode={'cover'}
                      source={{uri: item.link}}
                      style={styles.imageItem}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={{height: 10}} />
    </SafeAreaView>
  );
};

export default Drawing;

const styles = StyleSheet.create({
  Tracetext: {
    color: colors.primaryColor,
    fontSize: RFValue(20),
    fontFamily: fonts.SemiBold,
    fontWeight: '700',
  },
  sketchText: {
    color: colors.secondaryColor,
    fontSize: RFValue(20),
    fontFamily: fonts.SemiBold,
    fontWeight: '700',
  },
  imageItem: {
    width: wp(28),
    height: hp(15),
    borderRadius: 8,
    marginLeft: wp(3),
  },
  CardBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(100),
    height: hp(10),
  },
  BabiPicture: {
    position: 'absolute',
    zIndex: 1,
    right: wp(51),
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ArrowIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  hidden: {
    display: 'none',
  },
  visible: {
    display: 'flex',
  },
  card: {
    marginHorizontal: 10,
    width: wp(100),
    height: hp(10),
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
  settingicon: {
    paddingVertical: 10,
  },
});
