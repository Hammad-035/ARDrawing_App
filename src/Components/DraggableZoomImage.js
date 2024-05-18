import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, PanResponder } from 'react-native';
import { GestureHandlerRootView, PinchGestureHandler, State, PanGestureHandler } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

const DraggableZoomableImage = ({ imageSource, style }) => {
  const [baseScale, setBaseScale] = useState(1);
  const [pinchScale, setPinchScale] = useState(new Animated.Value(1));
  const [lastScale, setLastScale] = useState(1);
  const [translate, setTranslate] = useState(new Animated.ValueXY());
  const lastOffset = useRef({ x: 0, y: 0 });
  const rotation = useRef(new Animated.Value(0)).current;

  const onPinchEvent = Animated.event(
    [{ nativeEvent: { scale: pinchScale } }],
    { useNativeDriver: true }
  );

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      setBaseScale(lastScale);
      setLastScale(1);
    }
  };

  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translate.x,
          translationY: translate.y,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const onPanStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastOffset.current.x += event.nativeEvent.translationX;
      lastOffset.current.y += event.nativeEvent.translationY;
      translate.setOffset({
        x: lastOffset.current.x,
        y: lastOffset.current.y,
      });
      translate.setValue({ x: 0, y: 0 });
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        const { dx, dy } = gesture;
        const rotate = Math.atan2(dy, dx) * (180 / Math.PI);
        rotation.setValue(rotate);
      },
    })
  ).current;

  const rotateStyle = rotation.interpolate({
    inputRange: [-180, 180],
    outputRange: ['-180deg', '180deg'],
  });

  return (
    <GestureHandlerRootView>
      <PinchGestureHandler
        onGestureEvent={onPinchEvent}
        onHandlerStateChange={onPinchStateChange}>
        <Animated.View style={[styles.container]}>
          <PanGestureHandler
            onGestureEvent={onPanEvent}
            onHandlerStateChange={onPanStateChange}
            simultaneousHandlers={['pinch']}
            {...panResponder.panHandlers}>
            <Animated.Image
              source={imageSource}
              style={[
                style,
                {
                  transform: [
                    { translateX: translate.x },
                    { translateY: translate.y },
                    { scale: Animated.multiply(baseScale, pinchScale) },
                    { rotate: rotateStyle },
                  ],
                },
              ]}
            />
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width:width,
    height: height,
    resizeMode: 'contain',
    transform:[{rotate:'90deg'}]
  },
})
export default DraggableZoomableImage


