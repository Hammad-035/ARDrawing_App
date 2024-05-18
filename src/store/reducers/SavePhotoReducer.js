import {SAVE_PHOTO, DELETE_PHOTO} from '../type';
const initialState = {
  save_photo: [],
  item_saved: {
    id: '',
    link: `https://metasoltechnologies.com/ai_art/`,
  },
};

export const SavePhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PHOTO:
      const {id} = action.payload;
      const itemIndex = state.save_photo.findIndex(item => item.id === id);

      if (itemIndex !== -1) {
        const updatedSaveItem = [...state.save_photo];
        updatedSaveItem.splice(itemIndex, 1);
        return {
          ...state,
          save_photo: updatedSaveItem,
        };
      } else {
        return {
          ...state,
          save_photo: [...state.save_photo, action.payload],
        };
      }
    case DELETE_PHOTO:
      const dataToDelete = action.payload;
      if (Array.isArray(dataToDelete) && dataToDelete.length > 0) {
        console.log('DATA TO DELETE',dataToDelete)
        // Delete selected items
        const updatedItems = state.save_photo.filter(item => !dataToDelete.includes(item.id));
        console.log('UPDATED ITEMS',updatedItems)
        return {
          ...state,
          save_photo: updatedItems,
        };
      } else {
        // Delete single item
        const updatedItems = state.save_photo.filter(item => item.id !== dataToDelete);
        return {
          ...state,
          save_photo: updatedItems,
        };
      }
    default:
      return state;
  }
};
