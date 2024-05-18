import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  AppState,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NativeAdView, {
  AdBadge,
  CallToActionView,
  HeadlineView,
  IconView,
  ImageView,
  StarRatingView,
  TaglineView,
} from 'react-native-admob-native-ads';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import fonts from '../constants/font';

const SCREEN_WIDTH = wp(100);
const NativeAdLanguageAd = () => {
  const NativeRef = useRef(null);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const appstate = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', newappState => {
      if (
        appstate.current.match(/inactive|background/) &&
        newappState === 'active'
      ) {
        NativeRef.current?.loadAd();
      }
    });
    return () => {
      subscription.remove();
    };
  }, [appstate]);

  useEffect(() => {
    NativeRef.current.loadAd();
  }, []);

  return (
    <NativeAdView
      style={{
        width: SCREEN_WIDTH,
        alignSelf: 'center',
      }}
      ref={NativeRef}
      refreshInterval={2000}
      onNativeAdLoaded={data => {
        setIsLoading(false);
      }}
      onAdFailedToLoad={error => {
        console
        setError(true);
        setIsLoading(false);
      }}
      adUnitID={Config.NativeLanguage}>
      {isloading ? (
        <View
          style={{height: 230, justifyContent: 'center', alignItems: 'center',
            backgroundColor:'#F9F9F9',
            width:SCREEN_WIDTH,
          }}>
            <Text>Ad is Loading</Text>
          <ActivityIndicator style={{alignSelf: 'center'}} />
        </View>
      ) : (
        <View
          style={{
            opacity: isloading || error ? 0 : 1,
            backgroundColor: '#0000',
            borderColor: '#ADD8E6',
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingTop: 10,
            paddingBottom: 5,
          }}>
          <AdBadge style={styles.AdBadge} textStyle={styles.AdBadgeText} />
          <View style={styles.rowView}>
            <IconView style={styles.iconView} />
            <View
              style={{
                marginLeft: 5,
              }}>
              <HeadlineView numberOfLines={2} style={styles.headingTitle} />
              <TaglineView numberOfLines={3} style={styles.taglineText} />
            </View>
          </View>
          <ImageView style={styles.imageView} />
          <CallToActionView
            buttonAndroidStyle={styles.buttonAndroidStyle}
            style={styles.CallToActionView}
            textStyle={styles.CallToActionViewText}
          />
        </View>
      )}
    </NativeAdView>
  );
};
const styles = StyleSheet.create({
  rowView: {
    width: SCREEN_WIDTH - 20,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
    padding: 5,
  },
  left: {
    width: (SCREEN_WIDTH - 20) * 0.9,
    backgroundColor: '#fff',
  },
  iconView: {
    right: 10,
    width: 50,
    height: 50,
    // backgroundColor: 'red',
  },
  headingTitle: {
    color: '#060606',
    fontWeight: '900',
    flexDirection: 'column',
    flexWrap: 'wrap',
    fontSize: 12,
  },
  taglineText: {
    fontFamily: fonts.Medium,
    fontSize: 9,
    color: '#060606',
    width: wp(70),
  },
  right: {
    
   
 
  },
  AdBadge: {
    width: 22,
    height: 16,
    borderWidth: 1,
    backgroundColor: '#3972FE',
    borderColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  AdBadgeText: {
    fontSize: 10,
    color: '#fff',
    includeFontPadding: false,
  },
  imageView: {
    backgroundColor: '#0001',
    width: SCREEN_WIDTH - 20,
    marginBottom: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    resizeMode: 'center',
  },
  CallToActionViewText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '800',
    fontFamily: fonts.Medium,
  },
  CallToActionView: {
    height: 36,
    width: SCREEN_WIDTH - wp(15),
    backgroundColor: '#3972FE',
    borderRadius: 100,
  },
  buttonAndroidStyle: {
    backgroundColor: '#3972FE',
    borderColor: '#3972FE',
    borderWidth: 1,
    borderRadius: 100,
  },
});
export default NativeAdLanguageAd;
