import * as ActionType from "./constant";

let initialState = {
  loading: null,
  data: null,
  err: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTH_PAGE_REQUEST:
      state.loading = true;
      state.data = null;
      state.err = null;
      return { ...state };
    case ActionType.AUTH_PAGE_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.err = null;
      return { ...state };
    case ActionType.AUTH_PAGE_FAILED:
      state.loading = false;
      state.data = null;
      state.err = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};
export default authReducer;
