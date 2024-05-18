import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RemoveFromFavourite from '../assests/svgs/RemoveFavourite.svg';
import CheckBoxIcon from '../assests/svgs/checkbox.svg';
import ActiveCheckBoxIcon from '../assests/svgs/checkboxActive.svg';
import SelectIcon from '../assests/svgs/selectall.svg';
import {deleteItemOrAll} from '../store/actions/favAction';

const Favourites = () => {
  const navigation = useNavigation();
  const [isCheckboxVisible, setIsCheckboxVisible] = useState(false);
  const [activeCheckboxes, setActiveCheckboxes] = useState({});
  const {favItems} = useSelector(state => state.favReducer);
  console.log('FAV REDUCER ITEM', favItems);
  const dispatch = useDispatch();
  const numColumns = 3;
  const screenWidth = Dimensions.get('window').width;
  const imageSize = (screenWidth - 20) / numColumns - 10;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row-reverse', gap: 20, margin: 10}}>
          <TouchableOpacity onPress={() => deleteSelectedItems()}>
            <RemoveFromFavourite width={20} height={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectAllImages()}>
            <SelectIcon width={18} height={18} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [activeCheckboxes]);

  const handleLongPress = index => {
    setIsCheckboxVisible(true);
  };

  const toggleCheckbox = index => {
    setActiveCheckboxes(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const selectAllImages = () => {
    const allIndexes = favItems.map((item, index) => index.toString());
    const allSelected =
      Object.keys(activeCheckboxes).length === allIndexes.length;
    if (allSelected) {
      setActiveCheckboxes({});
      setIsCheckboxVisible(false); 
    } else {
      // Not all items selected, select all
      const selectedCheckboxes = allIndexes.reduce(
        (acc, curr) => ({...acc, [curr]: true}),
        {},
      );
      setActiveCheckboxes(selectedCheckboxes);
      setIsCheckboxVisible(true); 
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
        {favItems === null ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{textAlign: 'center'}}>Add items to Favourites</Text>
          </View>
        ) : (
          favItems.map((item, index) => {
            // console.log('FAV ITEMS LINK', item.link);
            // console.log('FAV ITEMS CAT_NAME', item.main_cat_name);
            // console.log('MAIN_ITEM', item.main_item);
            // console.log('ITEM', item);
            // console.log('LINK2', item.link);
            return (
              <TouchableWithoutFeedback
                key={index}
                onLongPress={handleLongPress}
                onPress={() =>
                  navigation.navigate('SelectedImage', {
                    link:item.main_cat_name === 'Custom'? `${item.link}`: `https://metasoltechnologies.com/ai_art/${item.main_cat_name}/${item.link}`,
                    main_cat_name: item.main_cat_name,
                    link: item.link,
                    item: item,
                    main_item: item.main_item,
                  })
                }>
                <View style={{flexDirection: 'row'}}>
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
          })
        )}
      </ScrollView>
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  image: {
    margin: 5,
    borderRadius: 12,
  },
  checkbox: {
    position: 'absolute',
    top: 6,
    left: 6,
    zIndex: 100,
  },
});
