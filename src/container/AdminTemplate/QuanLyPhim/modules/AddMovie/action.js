import * as ActionType from "./constant";
import Axios from "axios";
import { Toast } from "../../../../../components/Toast";

export const actAddMovieApi = (movie) => {
  let accessToken = "";
  if (localStorage.getItem("UserAdmin")) {
    accessToken = JSON.parse(localStorage.getItem("UserAdmin")).accessToken;
  }
  return (dispatch) => {
    dispatch(actAddMovieRequest());
    Axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
      method: "POST",
      data: movie,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        dispatch(actAddMovieSuccess(res.data));
        Toast.fire({
          icon: "success",
          title: `Thêm phim thành công`,
        })
      })
      .catch((err) => {
        dispatch(actAddMovieFailed(err.response.data));
        Toast.fire({
          icon: "error",
          title: `${err.response.data}`,
        });
      });
  };
};
const actAddMovieRequest = () => {
  return {
    type: ActionType.ADD_MOVIE_REQUEST,
  };
};
const actAddMovieSuccess = (data) => {
  return {
    type: ActionType.ADD_MOVIE_SUCCESS,
    payload: data,
  };
};
const actAddMovieFailed = (err) => {
  return {
    type: ActionType.ADD_MOVIE_FAILED,
    payload: err,
  };
};
