import { SET_HOME } from "../type";
export const setHomeScreen = () => {
    return dispatch => {
      dispatch({
        type: SET_HOME,
        payload: true,
      });
    };
  };