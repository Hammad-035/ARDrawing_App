module.exports = {
    dependencies: {
      'react-native-vector-icons': {
        platforms: {
          ios: null,
        },
      },
    },
    project: {
      android: {
        unstable_reactLegacyComponentNames: ['CameraView'],
      },
      ios: {
        unstable_reactLegacyComponentNames: ['CameraView'],
      },
    },
    assets: ['./src/assests/fonts/'], 
  };