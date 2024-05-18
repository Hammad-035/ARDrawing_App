import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../constant/color';
const CustomImageBox = ({main_item, item, index, style}) => {
  const navigation = useNavigation();
  const [loadingImages, setLoadingImages] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleLoadStart = index => {
    setLoadingImages(prev => ({...prev, [index]: true}));
  };
  const handleLoadEnd = index => {
    setLoadingImages(prev => ({...prev, [index]: false}));
  };
  //console.log('item in custom',item)
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
          resizeMode={'cover'}
          onLoadStart={() => handleLoadStart(index)}
          onLoad={() => handleLoadEnd(index)}
          onError={() => handleLoadEnd(index)}
          source={{
            uri: `https://metasoltechnologies.com/ai_art/${main_item.main_cat_name}/${item.link}`,
          }}
          style={styles.imageItem}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomImageBox;

const styles = StyleSheet.create({
  imageItem: {
    width: wp(28),
    height: hp(16),
    borderRadius: 12,
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
