import * as ActionType from "./constant";

let initialState1 = {
  dataCine: null,
  err: null,
};
const listTheaterReducer = (state = initialState1, action) => {
  switch (action.type) {
    case ActionType.LIST_CINE_REQUEST:
      state.dataCine = null;
      state.err = null;
      return { ...state };
    case ActionType.LIST_CINE_SUCCESS:
      state.dataCine = action.payload;
      state.err = null;
      return { ...state };
    case ActionType.LIST_CINE_FAILED:
      state.dataCine = null;
      state.err = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};
export default listTheaterReducer;
