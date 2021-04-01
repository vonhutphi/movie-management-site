import {
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_FAILED,
  } from "./constant";
  
  let initialState = {
    loading: false,
    data: null,
    err: null,
  };
  
  const addUserReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_USER_REQUEST:
        state.loading = true;
        state.data = null;
        state.err = null;
        return { ...state };
  
      case ADD_USER_SUCCESS:
        state.loading = false;
        state.data = action.payload;
        state.err = null;
        return { ...state };
  
      case ADD_USER_FAILED:
        state.loading = false;
        state.data = null;
        state.err = action.payload;
        return { ...state };
      default:
        return { ...state };
    }
  };
  
  export default addUserReducer;
  