import {
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    UPLOAD_PROFILE_PICTURE_FAIL,
    UPLOAD_PROFILE_PICTURE_SUCCESS,
    // UPLOAD_PROFILE_PICTURE,
    // UPLOAD_PROFILE_PICTURE_FAIL,
    // POST_MESSAGE_SUCCESS,
    // POST_MESSAGE_FAIL,
    // SET_MESSAGE,
} from "../actions/types";


const user = JSON.parse(localStorage.getItem("GROUPOMANIA_USER"));
  
const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };


export default function (state = initialState, action) {
        const { type, payload } = action;
      
        switch (type) {
          case CHANGE_PASSWORD_SUCCESS:
            return {
              ...state,
            };
          case CHANGE_PASSWORD_FAIL:
            return {
              ...state
            };
          case UPLOAD_PROFILE_PICTURE_SUCCESS:
            //  le state contient l'anccien photo , on update cela  
            state.user.profile_picture = payload
            localStorage.setItem("GROUPOMANIA_USER", JSON.stringify(state.user));
            return {
                  ...state,

            };
          case UPLOAD_PROFILE_PICTURE_FAIL:
            return {
                  ...state
                };
            
          default:
            return state;
        }
}