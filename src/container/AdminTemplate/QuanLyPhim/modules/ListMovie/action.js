import * as ActionType from "./constant";
import Axios from "axios";

export const actListMovieApi = () => {
  return (dispatch) => {
    dispatch(actListMovieRequest());
    setTimeout(() => {
      Axios({
        url:
          "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP03",
        method: "GET",
      })
        .then((result) => {
          dispatch(actListMovieSuccess(result.data));
        })
        .catch((err) => {
          dispatch(actListMovieFailed(err));
        });
    }, 500);
  };
};
export const setMovieEdit = (movie) => {
  return {
    type: ActionType.SET_MOVIE_EDIT,
    payload: movie,
  };
};
const actListMovieRequest = () => {
  return {
    type: ActionType.LIST_MOVIE_REQUEST,
  };
};
const actListMovieSuccess = (data) => {
  return {
    type: ActionType.LIST_MOVIE_SUCCESS,
    payload: data,
  };
};
const actListMovieFailed = (err) => {
  return {
    type: ActionType.LIST_MOVIE_FAILED,
    payload: err,
  };
};
