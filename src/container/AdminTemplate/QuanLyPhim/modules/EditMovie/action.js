import * as ActionType from "./constant";
import Axios from "axios";
import { Toast } from "../../../../../components/Toast";

export const actEditMovieApi = (movie) => {
  let accessToken = "";
  if (localStorage.getItem("UserAdmin")) {
    accessToken = JSON.parse(localStorage.getItem("UserAdmin")).accessToken;
  }
  return (dispatch) => {
    dispatch(actEditMovieRequest());
    Axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload",
      method: "POST",
      data: movie,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        dispatch(actEditMovieSuccess(res.data));
        Toast.fire({
          icon: "success",
          title: `Sửa phim thành công`,
        })
      })
      .catch((err) => {
        dispatch(actEditMovieFailed(err.response.data));
      });
  };
};
const actEditMovieRequest = () => {
  return {
    type: ActionType.EDIT_MOVIE_REQUEST,
  };
};
const actEditMovieSuccess = (data) => {
  return {
    type: ActionType.EDIT_MOVIE_SUCCESS,
    payload: data,
  };
};
const actEditMovieFailed = (err) => {
  return {
    type: ActionType.EDIT_MOVIE_FAILED,
    payload: err,
  };
};
