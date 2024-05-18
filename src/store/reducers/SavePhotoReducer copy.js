import {SAVE_PHOTO, DELETE_PHOTO} from '../type';
const initialState = {
  save_photo: [],
  item_saved: {
    id: '',
    link: `https://metasoltechnologies.com/ai_art/`,
  },
};

const SavePhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PHOTO:
      const {id} = action.payload;
      const itemIndex = state.save_photo.findIndex(item => item.id === id);

      if (itemIndex !== -1) {
        const updatedFavItems = [...state.save_photo];
        updatedFavItems.splice(itemIndex, 1);
        return {
          ...state,
          save_photo: updatedFavItems,
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
        // Delete selected items
        const updatedItems = state.favItems.filter(
          item => !dataToDelete.includes(item.id),
        );
        return {
          ...state,
          favItems: updatedItems,
        };
      } else {
        // Delete single item
        const updatedItems = state.favItems.filter(
          item => item.id !== dataToDelete,
        );
        return {
          ...state,
          favItems: updatedItems,
        };
      }
    default:
      state;
  }
};
export default SavePhotoReducer;
