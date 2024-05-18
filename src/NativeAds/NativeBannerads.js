import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import NativeAdView, {
  AdBadge,
  AdvertiserView,
  CallToActionView,
  HeadlineView,
  IconView,
  StarRatingView,
  StoreView,
  TaglineView,
} from 'react-native-admob-native-ads';
import {adUnitIDs} from '../NativeAds/adUtils/utlis';
import {MediaView} from './MediaView/MediaView';
import {useIsFocused} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import fonts from '../constant/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
const SCREEN_WIDTH = wp(100) ;
export const NativeBanner = React.memo(({media, type, loadOnMount = true}) => {
  const [aspectRatio, setAspectRatio] = useState(1.5);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const nativeAdRef = useRef();
  const isFocused = useIsFocused();

  const onAdFailedToLoad = event => {
    setError(true);
    setLoading(false);
    setLoaded(false);
  };

  const onNativeAdLoaded = event => {
    console.log('AD', 'RECIEVED', 'Unified ad  Recieved', event);
    setLoading(false);
    setLoaded(true);
    setError(false);
    setAspectRatio(event.aspectRatio);
  };

  useEffect(() => {
    if (!loaded && isFocused) {
      nativeAdRef.current?.loadAd();
      setLoading(true);
      setLoaded(false);
      setError(false);
    }
  }, [loaded, isFocused]);

  //console.log(loaded, 'loaded');
  //console.log(loading, 'loading');
  return (
    <NativeAdView
      style={{
        width: SCREEN_WIDTH,
        alignSelf: 'center',
        backgroundColor: '#fff',
      }}
      ref={nativeAdRef}
      refreshInterval={2000}
      onNativeAdLoaded={onNativeAdLoaded}
      onAdFailedToLoad={onAdFailedToLoad}
      adUnitID={Config.NativeIntro}>
      {loading ? (
        <View
          style={{
            height: 120,
            width: wp(100),
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator style={{alignSelf: 'center'}} />
        </View>
      ) : (
        <View
          style={{
            opacity: loading || error ? 0 : 1,
            backgroundColor: '#0000',
            borderColor: '#ADD8E6',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingTop: 10,
            paddingBottom: 5,

          }}>
          <AdBadge style={styles.AdBadge} textStyle={styles.AdBadgeText} />
          <View style={styles.rowView}>
            <View style={styles.left}>
              <View style={styles.right}></View>
              <View style={{flexDirection: 'row'}}>
                <IconView style={styles.iconView} />
                <View
                  style={{
                    marginLeft: 5,
                    paddingTop: 5,
                  }}>
                  <HeadlineView numberOfLines={2} style={styles.headingTitle} />
                  <TaglineView numberOfLines={3} style={styles.taglineText} />
                  {/* <Text style={styles.taglineText} >this is paksitan we are alla akf msdn asdasdln, fjsdj;fas fldsf;asd fkjsdajfsd fkasdfuasdfmn asdljgfiausdhgf;kaslj</Text> */}
                </View>
              </View>
            </View>
          </View>

          <CallToActionView
            style={styles.CallToActionView}
            buttonAndroidStyle={styles.buttonAndroidStyle}
            textStyle={styles.CallToActionViewText}
          />
        </View>
      )}
    </NativeAdView>
  );
});
const styles = StyleSheet.create({
  rowView: {
    width: SCREEN_WIDTH - 20,
    marginVertical: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  iconView: {
    width: 50,
    height: 50,
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
    fontSize: 12,
    color: '#060606',
    width:wp(70)
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
    backgroundColor: '#0000',
    width: SCREEN_WIDTH,
    marginVertical: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    resizeMode: 'center',
  },
  CallToActionViewText: {
    color: 'white',
    fontSize: 18,
    includeFontPadding: false,
    fontWeight: '800',
    fontFamily: fonts.Medium,
  },
  CallToActionView: {
    height: 40,
    width: SCREEN_WIDTH - wp(25),
    backgroundColor: '#3972FE',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAndroidStyle: {
    backgroundColor: '#3972FE',
    borderColor: '#3972FE',
    borderWidth: 1,
    borderRadius: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
