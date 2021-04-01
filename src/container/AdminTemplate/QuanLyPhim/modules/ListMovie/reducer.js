import * as ActionType from "./constant";
let initialState = {
  loading: false,
  data: null,
  err: null,
  movieEdit: null,
};

const listMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LIST_MOVIE_REQUEST:
      state.loading = true;
      state.data = null;
      state.err = null;
      return { ...state };
    case ActionType.LIST_MOVIE_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.err = null;
      return { ...state };
    case ActionType.LIST_MOVIE_FAILED:
      state.loading = false;
      state.data = null;
      state.err = action.payload;
      return { ...state };
    case ActionType.SET_MOVIE_EDIT:
      state.movieEdit = action.payload;
      return {...state}
    default:
      return { ...state };
  }
};
export default listMovieReducer;
