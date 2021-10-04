import _ from "lodash" ;
import {
    POST_MESSAGE_FAIL,
    POST_MESSAGE_SUCCESS,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAIL,
    SET_MESSAGE,
} from "./types";

import PostService from "../services/post.service";

export const publishPost = (content,filename) => (dispatch) => {
  return PostService.postMessage(content,filename).then(
    (response) => {
      dispatch({
        type: POST_MESSAGE_SUCCESS,
        payload:{post:response.data.post}
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      let {message,errors} = error.response.data ;
      // console.log(errors)
      if(!_.isEmpty(errors)){
         message=Object.keys(errors).map(function (key, index) {
          return errors[key]
        }).join(', ')
      }
      dispatch({
        type: POST_MESSAGE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getAllPosts = () => (dispatch)=>{
    return PostService.gettAllPosts().then(
        (response)=>{
            dispatch({
                type: GET_POSTS_SUCCESS,
                payload:{posts:response.data.posts}
            });
            
            return Promise.resolve();
        },
        (error) => {
            let {message,errors} = error.response.data ;
            // console.log(errors)
            if(!_.isEmpty(errors)){
               message=Object.keys(errors).map(function (key, index) {
                return errors[key]
              }).join(', ')
            }
            dispatch({
              type: GET_POSTS_FAIL,
            });
      
            dispatch({
              type: SET_MESSAGE,
              payload: message,
            });
      
            return Promise.reject();
        }
    )
}
