import * as ActionType from "./constant";

let initialState = {
  loading: false,
  data: null,
  err: null,

};
const getUserDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_USER_DETAIL_REQUEST:
      state.loading = true;
      state.data = null;
      state.err = null;
      return { ...state };
    case ActionType.GET_USER_DETAIL_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.err = null;
      return { ...state };
    case ActionType.GET_USER_DETAIL_FAILED:
      state.loading = false;
      state.data = null;
      state.err = action.payload;
      return { ...state };
    case ActionType.DELETE_USER_DETAIL:
      state.data = null
      return {...state}
    default:
      return { ...state };
  }
};
export default getUserDetailReducer;
