import { SAVE_PHOTO,DELETE_PHOTO } from "../type";

export const savePhotoActions = data => {
    console.log('DATATA save photo',data)
    return dispatch => {
       dispatch({
        type:SAVE_PHOTO,
        payload:data
       })
}
}

export const DeletePhotoOrAll = (data) => {
    console.log('DELETE PHOTO',data)
    return dispatch => {
        dispatch({
            type:DELETE_PHOTO,
            payload:data.length === 1 ? data[0] : data
        })
    }
}