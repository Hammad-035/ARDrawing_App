import { ADD_CUSTOM_IMAGE } from "../type";

export const AddCustomImage = image => {
    console.log('CUSTOM IMAGE',image)
    return dispatch => {
        dispatch({
            type:ADD_CUSTOM_IMAGE,
            payload:image
        })
    }
}