import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../constant/color';
import fonts from '../constant/fonts';
import { useNavigation } from '@react-navigation/native';

const CategoriesPicture = ({ route }) => {
  const [loadingImages, setLoadingImages] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: main_item.main_cat_name,
      headerTitleStyle: {
        color: colors.primaryColor,
        fontSize: RFValue(20),
        fontFamily: fonts.SemiBold,
      },
    });
  }, []);

  const main_item = route.params.data;

  const handleLoadStart = (index) => {
    setLoadingImages((prev) => ({ ...prev, [index]: true }));
  };

  const handleLoadEnd = (index) => {
    setLoadingImages((prev) => ({ ...prev, [index]: false }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F9F9F9' }}>
      <FlatList
        style={{ width: wp(100) }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginTop: 10,
        }}
        data={main_item.data}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SelectedImage', {
                  link: `https://metasoltechnologies.com/ai_art/${main_item.main_cat_name}/${item.link}`,
                  main_cat_name: main_item.main_cat_name,
                  link2: item.link,
                  item: item,
                  main_item: main_item,
                })
              }
            >
              <View style={styles.imageContainer} key={index}>
                {loadingImages[index] && (
                  <ActivityIndicator size="small" color={colors.primaryColor} style={styles.activityIndicator} />
                )}
                <Image
                  onLoadStart={() => handleLoadStart(index)}
                  onLoad={() => handleLoadEnd(index)}
                  onError={() => handleLoadEnd(index)}
                  resizeMode={'contain'}
                  source={{
                    uri: `https://metasoltechnologies.com/ai_art/${main_item.main_cat_name}/${item?.link}`,
                  }}
                  style={styles.imageItem}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: wp(30),
    height: hp(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageItem: {
    width: wp(30),
    height: hp(18),
    borderRadius: 20,
  },
  activityIndicator: {
    position: 'absolute',
  },
});

export default CategoriesPicture;
