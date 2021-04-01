import * as ActionType from "./constant";
import Axios from "axios";
import { Toast } from "../../../../../components/Toast";

export const actDeleteMovieApi = (maPhim) => {
  let accessToken = "";
  if (localStorage.getItem("UserAdmin")) {
    accessToken = JSON.parse(localStorage.getItem("UserAdmin")).accessToken;
  }
  return (dispatch) => {
    dispatch(actDeleteMovieRequest());
    Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        dispatch(actDeleteMovieSuccess(res.data));
        Toast.fire({
          icon: "success",
          title: `Xóa phim thành công`,
        })
      })
      .catch((err) => {
        dispatch(actDeleteMovieFailed(err.response.data));
        Toast.fire({
          icon: "error",
          title: `${err.response.data}`,
        });
      });
  };
};
const actDeleteMovieRequest = () => {
  return {
    type: ActionType.DELETE_MOVIE_REQUEST,
  };
};
const actDeleteMovieSuccess = (data) => {
  return {
    type: ActionType.DELETE_MOVIE_SUCCESS,
    payload: data,
  };
};
const actDeleteMovieFailed = (err) => {
  return {
    type: ActionType.DELETE_MOVIE_FAILED,
    payload: err,
  };
};
