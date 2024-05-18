import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constant/color'
import { RFValue } from 'react-native-responsive-fontsize'
import fonts from '../constant/fonts'
import { useSelector } from 'react-redux'
const HeaderTitle = () => {
  const {selectedLanguage} = useSelector(state => state.languageReducer);
  return (
    <View>
       <Text style={styles.Tracetext}>
          {selectedLanguage.Trace} &
          <Text style={styles.sketchText}>{selectedLanguage.Sketch}</Text>
        </Text>
    </View>
  )
}

export default HeaderTitle

const styles = StyleSheet.create({
    Tracetext: {
        color: colors.primaryColor,
        fontSize: RFValue(20),
       fontFamily:fonts.SemiBold
      },
      sketchText: {
        color: colors.secondaryColor,
        fontSize: RFValue(20),
        fontFamily:fonts.SemiBold,
        
      },
})