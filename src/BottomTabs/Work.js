import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DeleteIcon from '../assests/svgs/Delete.svg';
import CheckBoxIcon from '../assests/svgs/checkbox.svg';
import ActiveCheckBoxIcon from '../assests/svgs/checkboxActive.svg';
import SelectIcon from '../assests/svgs/selectall.svg';
import {colors} from '../constant/color';
import {DeletePhotoOrAll} from '../store/actions/Savephotoaction';
import { combineSlices } from '@reduxjs/toolkit';
import { AuthRoutes } from '../constant/routes';

const Work = () => {
  const navigation = useNavigation();
  const [isCheckboxVisible, setIsCheckboxVisible] = useState(false);
  const [activeCheckboxes, setActiveCheckboxes] = useState({});
  const {save_photo} = useSelector(state => state.SavePhotoReducer);
  console.log('SAVE PHOT IN WORK', save_photo);
  const dispatch = useDispatch();
  const numColumns = 3;
  const screenWidth = Dimensions.get('window').width;
  const imageSize = (screenWidth - 20) / numColumns - 10;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row-reverse',
            gap: 20,
            margin: 10,
            backgroundColor: colors.whiteColor,
          }}>
          <TouchableOpacity onPress={() => deleteSelectedItems()}>
            <DeleteIcon width={20} height={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectAllImages()}>
            <SelectIcon width={18} height={18} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [activeCheckboxes]);

  const handleLongPress = () => {
    setIsCheckboxVisible(true);
  };

  const toggleCheckbox = index => {
    setActiveCheckboxes(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
    setActiveCheckboxes(true);
  };

  const selectAllImages = () => {
    const allIndexes = favItems.map((item, index) => index.toString());
    const allSelected =
      Object.keys(activeCheckboxes).length === allIndexes.length;
    if (allSelected) {
      setActiveCheckboxes({});
      setIsCheckboxVisible(false); // Hide checkboxes
    } else {
      // Not all items selected, select all
      const selectedCheckboxes = allIndexes.reduce(
        (acc, curr) => ({...acc, [curr]: true}),
        {},
      );
      setActiveCheckboxes(selectedCheckboxes);
      setIsCheckboxVisible(true); // Show checkboxes
    }
  };
  const deleteSelectedItems = () => {
    const selectedItemsIndexes = Object.keys(activeCheckboxes).filter(
      key => activeCheckboxes[key],
    );
    const selectedItemsIds = selectedItemsIndexes.map(
      index => favItems[index]?.id,
    );

    if (selectedItemsIds.length > 0) {
      dispatch(deleteItemOrAll(selectedItemsIds));
    }

    setIsCheckboxVisible(false);
    setActiveCheckboxes({});
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          {save_photo.map((item, index) => {
            console.log('ITEMS IN SAVE',item)
            return (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate(AuthRoutes.workreview,{
                  link:item.link,
                  item:item,
                  link2:item.link
                })}
                key={index}
                onLongPress={handleLongPress}>
                <View>
                  <Image
                    source={{uri: item.link}}
                    style={[
                      styles.image,
                      {width: imageSize, height: imageSize},
                    ]}
                    resizeMode={'cover'}
                  />
                  {isCheckboxVisible && (
                    <TouchableOpacity
                      style={styles.checkbox}
                      onPress={() => toggleCheckbox(index)}>
                      {activeCheckboxes[index] ? (
                        <ActiveCheckBoxIcon width={25} height={25} />
                      ) : (
                        <CheckBoxIcon width={25} height={25} />
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Work;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    //backgroundColor:colors.cardsColor,
    borderRadius: 8,
  },
  image: {
    margin: 5,
    borderRadius: 8,
  },
  checkbox: {
    position: 'absolute',
    top: 6,
    left: 6,
    zIndex: 100,
  },
});
