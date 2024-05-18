import { ADD_CUSTOM_IMAGE } from "../type";

const initialState = {
  customImages: [],
};

export const CustomImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CUSTOM_IMAGE:
      const newImage = action.payload; 
      console.log('NEW IMAGE',newImage)
      return {
        ...state,
        customImages: [...state.customImages, newImage],
      };

    default:
      return state;
  }
};
