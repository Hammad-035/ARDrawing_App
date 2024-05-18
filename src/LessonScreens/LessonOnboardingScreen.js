import React, { useState } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import OnboardingLesson from '../Components/LessonOnboarding';
import { colors } from '../constant/color';
import fonts from '../constant/fonts';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LessionOnboarding = ({ opacity, item }) => {
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false)
  console.log('ITEMS IN ONBOARDING', item);
  const renderOnboardingPages = () => {
    return item.data.map((imageItem, index) => ({
     
      image: (
        <Image
          borderRadius={20}
          key={index}
          resizeMode={'cover'}
          style={styles.imageItem}
          source={{
            uri: `https://metasoltechnologies.com/ai_art/lessons/${item.lesson}/${imageItem.file_name}`,
          }}
          onLoadStart={() => setLoading(true)}
          onError={() => {
            setError(true);
          }}
          onLoadEnd={() => setLoading(false)}
        />
      ),
      title: <Text key={`title_${index}`}></Text>, 
      subtitle: <Text key={`subtitle_${index}`}></Text>,
    }));
  };

  return (
    <View style={{ flex: 1, position: 'absolute', zIndex: 100, opacity: opacity / 100 }}>
      <View View style={{width: wp(100), height: hp(65),}}>
        <OnboardingLesson
          showSkip={false}
          skipToPage={9}
          bottomBarHighlight={false}
          showNext={false}
          pages={renderOnboardingPages()}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  imageItem:{
    
    width:wp(70),
    height:hp(40),
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    
  }
})
export default LessionOnboarding;
