import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ArrowIcon from '../assests/svgs/ArrowIcon.svg';
import { colors } from '../constant/color';
import fonts from '../constant/fonts';
import { AuthRoutes } from '../constant/routes';
import Lession_Data from '../data/lesson.json';
const Lession = () => {
  const navigation = useNavigation();
  const [loadingImages, setLoadingImages] = useState({});
  const handleLoadStart = index => {
    setLoadingImages(prev => ({...prev, [index]: true}));
  };
  const handleLoadEnd = index => {
    setLoadingImages(prev => ({...prev, [index]: false}));
  };
  return (
    <>
      <View style={{flex: 1}}>
        <ScrollView>
          {Lession_Data.data.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(AuthRoutes.LessonScreen,{
                  data:item,
                  link:`https://metasoltechnologies.com/ai_art/lessons/${item.lesson}/${item.data[item.data.length - 1].file_name}`,
                })}>
                <ImageBackground
                borderRadius={8}
                  resizeMode={'cover'}
                  source={require('../assests/images/CardBtn2.png')}
                  style={{
                    marginTop:8,
                    borderRadius: 5,
                    marginHorizontal:10,
                    flexDirection: 'row',
                    height: hp(10),
                    width: wp(95),
                  }}>
                     <View style={styles.imageContainer} key={index}>
                  {loadingImages[index] && (
                    <ActivityIndicator
                      size="small"
                      color={colors.primaryColor}
                      style={styles.activityIndicator}
                    />
                  )}
                  <Image
                    style={styles.AnimeGirlIcon}
                    resizeMode={'contain'}
                    source={{
                      uri: `https://metasoltechnologies.com/ai_art/lessons/${
                        item.lesson
                      }/${item.data[item.data.length - 1].file_name}`,
                    }}
                    onLoadStart={() => handleLoadStart(index)}
                    onLoad={() => handleLoadEnd(index)}
                    onError={() => handleLoadEnd(index)}
                  />
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      height: hp(10),
                      width: wp(33),
                    }}>
                    <Text
                      style={{
                        color: colors.textColor,
                        fontFamily: fonts.Medium,
                      }}>
                      Lesson No : {`0${item.lesson}`.slice(-2)}
                    </Text>
                  </View>
                  <ArrowIcon width={25} height={25} style={styles.ArrowIcon} />
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

export default Lession;

const styles = StyleSheet.create({
  LessionCard: {
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ArrowIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft:wp(15)
  },
  AnimeGirlIcon: {
    width: wp(32),
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:-wp(10)
  },
  imageContainer: {
    width: wp(30),
    height: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    position: 'absolute',
  },
});
