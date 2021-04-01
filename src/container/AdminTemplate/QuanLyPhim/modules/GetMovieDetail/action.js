import * as ActionType from "./constant";
import Axios from "axios";

export const actGetMovieDetailApi = (maPhim) => {
  return (dispatch) => {
    dispatch(actGetMovieDetailRequest());

    Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=" +
        maPhim,
      method: "GET",
    })
      .then((result) => {
        dispatch(actGetMovieDetailSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actGetMovieDetailFailed(err));
      });
  };
};
export const actDeleteMovieDetail = ()=>{
  return {
    type: ActionType.DELETE_MOVIE_DETAIL
  }
}
const actGetMovieDetailRequest = () => {
  return {
    type: ActionType.GET_MOVIE_DETAIL_REQUEST,
  };
};
const actGetMovieDetailSuccess = (data) => {
  return {
    type: ActionType.GET_MOVIE_DETAIL_SUCCESS,
    payload: data,
  };
};
const actGetMovieDetailFailed = (err) => {
  return {
    type: ActionType.GET_MOVIE_DETAIL_FAILED,
    payload: err,
  };
};
