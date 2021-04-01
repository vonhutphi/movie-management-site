import * as ActionType from "./constant";

let initialState = {
  loading: null,
  data: null,
  err: null,
};
const filmShowTimerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FILM_SHOWTIME_REQUEST:
      state.loading = true;
      state.data = null;
      state.err = null;
      return { ...state };
    case ActionType.FILM_SHOWTIME_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.err = null;
      return { ...state };
    case ActionType.FILM_SHOWTIME_FAILED:
      state.loading = false;
      state.data = null;
      state.err = action.payload;
      return { ...state };
    case ActionType.DELETE_SHOWTIME:
      state.data = null;
      return {...state}
    default:
      return { ...state };
  }
};
export default filmShowTimerReducer;
