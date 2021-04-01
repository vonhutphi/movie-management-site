import * as ActionType from "./constant";

let initialState = {
  loading: null,
  data: null,
  err: null,
};

const addMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_MOVIE_REQUEST:
      state.loading = true;
      state.data = null;
      state.err = null;
      return { ...state };
    case ActionType.ADD_MOVIE_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.err = null;
      return { ...state };
    case ActionType.ADD_MOVIE_FAILED:
      state.loading = false;
      state.data = null;
      state.err = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};
export default addMovieReducer;
