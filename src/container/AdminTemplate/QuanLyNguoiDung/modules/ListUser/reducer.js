import * as ActionType from "./constant";

let initialState = {
  loading: false,
  userList: null,
  err: null,
  userEdit: null,
};
const listUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LIST_USER_REQUEST:
      state.loading = true;
      state.userList = null;
      state.err = null;
      return { ...state };
    case ActionType.LIST_USER_SUCCESS:
      state.loading = false;
      state.userList = action.payload;
      state.err = null;
      return { ...state };
    case ActionType.LIST_USER_FAILED:
      state.loading = false;
      state.userList = null;
      state.err = action.payload;
      return { ...state };
    case ActionType.SET_USER_EDIT:
      state.userEdit = action.payload;
      return {...state}
    default:
      return { ...state };
  }
};
export default listUserReducer;
