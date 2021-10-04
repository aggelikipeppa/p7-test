import {
    POST_MESSAGE_SUCCESS,
    POST_MESSAGE_FAIL,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAIL
} from "../actions/types";


const user = JSON.parse(localStorage.getItem("GROUPOMANIA_USER"));
  
const initialState = { allPosts: [] } ;


export default function (state = initialState, action) {
        const { type, payload } = action;
      
        switch (type) {
          case POST_MESSAGE_SUCCESS:
              state.allPosts.unshift(payload.post) ;
              return {
                  ...state,
              }
          case POST_MESSAGE_FAIL:
              return {
                  ...state
              };
          case GET_POSTS_SUCCESS:
                state.allPosts = payload.posts;
                return {
                    ...state
                };
          case GET_POSTS_FAIL:
                return {
                        ...state
                };
          default:
            return state;
        }
}