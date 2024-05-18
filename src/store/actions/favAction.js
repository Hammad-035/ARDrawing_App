import { ADD_ITEM,DELETE_ITEM } from "../type";

export const AddItems = data => {
    console.log('DATATA',data)
    return dispatch => {
       dispatch({
        type:ADD_ITEM,
        payload:data
       })
}
}
export const deleteItemOrAll = (data) => ({
    type: DELETE_ITEM,
    payload: data.length === 1 ? data[0] : data, // If length is 1, pass the single ID instead of an array
  });
 