import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import English from '../assests/images/usa.png';
import FranciasCountry from '../assests/images/france.png';
import SothKorea from '../assests/images/south_korea.png';
import India from '../assests/images/india.png';
import Portuguese from '../assests/images/pourtgal.png';
import Espanol from '../assests/images/spain.png';
import PakistanIcon from '../assests/images/pakistan.png';
import JapanIcon from '../assests/images/japan.png';
import { AuthRoutes } from '../constant/routes';
import fonts from '../constant/fonts';

import {RFValue} from 'react-native-responsive-fontsize';
import {useToast} from 'react-native-toast-notifications';
import { colors } from '../constant/color';
import { setinittialRoute } from '../store/actions/InitialRouteName';
import { setSelectLanguage } from '../store/actions/languageAction';
import TransaltionalLanguage from '../store';
///import NativeAdLanguageAd from '../NativeAds/NativeLanguageAds';
const LanguageScreen = ({}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [coverIndex, setCoverIndex] = useState(null);
  useEffect(() => {
    dispatch(setinittialRoute('Language'));
  }, []);

  const handleNavigate = () => {
    navigation.navigate(AuthRoutes.onboarding);
  };
  const handlecoverIndex = index => {
    setCoverIndex(index === coverIndex ? null : index);
  };

  useEffect(() => {
    const handleNaviagtion = () => {
      toast.hideAll();
      if (coverIndex == null) {
        toast.show("OOPS!!! SELECT LANGUAGE", {
          type: "danger",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in | zoom-in",
        });
      } else {
        navigation.navigate(AuthRoutes.onboarding);
        dispatch(
          setSelectLanguage({
            selectedLanguageName: Languages[coverIndex].id,
            selectedLanguage: TransaltionalLanguage[Languages[coverIndex].id],
           }),
         ).then(() => {
          handleNavigate();
        });
      }
    };
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleNaviagtion}
          style={{
            backgroundColor: colors.primaryColor,
            width: wp(20),
            height: hp(4),
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#fff',
              fontFamily: fonts.SemiBold,
              fontWeight: '700',
            }}>
            Next
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [coverIndex,toast]);
  const Languages = [
    {
      icon: Portuguese,
      title: 'Portuguese',
      id: 'Portuguese',
    },
   
    {
      icon: Espanol,
      title: 'Espanol',
      id: 'Spanish',
    },
    
    {
      icon: India,
      title: 'भारत',
      id: 'Hindi',
    },
    {
      icon: SothKorea,
      title: '대한민국',
      id: 'Korean',
    },
     {
      icon: English,
      title: 'English',
      id: 'English',
    },
    {
      icon: FranciasCountry,
      title: 'French',
      id: 'French',
    },
    {
      icon: PakistanIcon,
      title: 'اردو',
      id: 'Urdu',
    },
    {
      icon: JapanIcon,
      title: '漢字',
      id: 'Japanese',
    },
    
    // {
    //     icon:SouthAfricaIcon,
    //     title:'Afrikaans'
    // },
    // {
    //     icon:IndonessiaIcon,
    //     title:'Indonesia'
    // }
  ];
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.rowContainer}>
          {Languages.map((item, index) => (
            <TouchableOpacity
              onPress={() => handlecoverIndex(index)}
              style={styles.container}
              key={index}>
              <Image
               resizeMode={'contain'}
               source={item.icon}
                style={styles.ImageStyle} 
                />
              <Text style={styles.textStyle}>{item.title}</Text>
              <View style={styles.coverIcon}>
                {coverIndex === index && (
                  <Icon name="check-circle" size={25} color={colors.primaryColor} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  rowContainer: {
    width: wp(100),
    columnGap: 8,
    alignItems:'center'
  },
  container: {
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:14,
    columnGap:20,
    width: wp(95),
    height: hp(8),
    marginTop: 5,
    backgroundColor: '#F9F9F9',
    padding: 5,
    borderRadius: 10,
    marginVertical:5
  },
  ImageStyle: {
    width: 40,
    height: 40,
    marginLeft:10,
   justifyContent:'center' ,
   alignItems:'center',
  },
  textStyle: {
    justifyContent:'center' ,
    alignItems:'center',
    color: '#060606',
    fontFamily:fonts.SemiBold,
    fontSize: RFValue(14),
  },
  coverIcon: {
    position: 'absolute',
    right: 15,
    marginTop: 10,
    justifyContent:'center',
    alignItems:'center'
  },
});

export default LanguageScreen;
