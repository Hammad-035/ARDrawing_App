import {ADD_ITEM, DELETE_ITEM} from '../type';
const initialState = {
  favItems: [],
  itemPaylaod: {
    id: 1,
    name: '',
    main_cat_name: '',
   
  },
};
const favReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const { id } = action.payload;
      const itemIndex = state.favItems.findIndex(item => item.id === id);

      if (itemIndex !== -1) {
        // Item exists, so remove it
        const updatedFavItems = [...state.favItems];
        updatedFavItems.splice(itemIndex, 1);
        return {
          ...state,
          favItems: updatedFavItems,
        };
      } else {
        // Item doesn't exist, so add it
        return {
          ...state,
          favItems: [...state.favItems, action.payload],
        };
      }

    }
    case DELETE_ITEM:
      const dataToDelete = action.payload;
      if (Array.isArray(dataToDelete) && dataToDelete.length > 0) {
        // Delete selected items
        const updatedItems = state.favItems.filter(item => !dataToDelete.includes(item.id));
        return {
          ...state,
          favItems: updatedItems,
        };
      } else {
        // Delete single item
        const updatedItems = state.favItems.filter(item => item.id !== dataToDelete);
        return {
          ...state,
          favItems: updatedItems,
        };
      }
    default:
      return state;
  }
};
export default favReducer;
