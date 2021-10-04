import _ from "lodash" ;
import {
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    UPLOAD_PROFILE_PICTURE_FAIL,
    SET_MESSAGE,
    UPLOAD_PROFILE_PICTURE_SUCCESS,
} from "./types";


import UserService from "../services/user.service";

export const changePassword=(oldPassword,newPassword)=> (dispatch) =>{
    return UserService.changePassword(oldPassword,newPassword).then(
        (response)=>{
            dispatch({
                type: CHANGE_PASSWORD_SUCCESS,
              });
        
              dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
              });
        
              return Promise.resolve();
        },
        (error)=>{
            let {message} = error.response.data ;
            dispatch({
                type: CHANGE_PASSWORD_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
}

export const uploadePicture = (file) =>(dispatch)=>{
    return UserService.uploadPicture(file).then(
        (response)=>{
            dispatch({
                type: UPLOAD_PROFILE_PICTURE_SUCCESS,
                payload: response.data.profile_picture,
              });
        
              dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
              });
        
              return Promise.resolve();
        },
        (error)=>{
            let {message} = error.response.data ;
            dispatch({
                type: UPLOAD_PROFILE_PICTURE_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
}
