import { SET_HOME } from "../type";
const initalState = {
    is_home_screen:false
}
export const userReducer = (state = initalState, action) => {
    switch (action.type) {
        case SET_HOME:
            return {
              ...state,
              is_home_screen: true,
            };
        default:
            return state;
    }
}