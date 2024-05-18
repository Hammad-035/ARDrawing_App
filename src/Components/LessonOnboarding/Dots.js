import React from 'react';
import { I18nManager, Platform, View } from 'react-native';
import PropTypes from 'prop-types';
import OnboardingDot from './Dot';

const Dots = ({ isLight, numPages, currentPage, OnboardingDot }) => (
  <View style={styles.container}>
    {[...Array(numPages)].map((_, index) => (
      <OnboardingDot key={index} selected={index === currentPage} isLight={isLight} />
    ))}
  </View>
);

Dots.propTypes = {
  isLight: PropTypes.bool.isRequired,
  numPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  OnboardingDot: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

const styles = {
  container: {
    flex: 0,
    flexDirection: I18nManager.isRTL && Platform.OS === 'ios' ? 'row-reverse' : 'row',
    alignItems: 'center',
  },
};

export default Dots;
