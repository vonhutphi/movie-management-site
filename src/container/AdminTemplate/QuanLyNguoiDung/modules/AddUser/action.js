import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
} from "./constant";
import Axios from "axios";
import { Toast } from "../../../../../components/Toast";

export const fetchAddUserApi = (user) => {
  let accessToken = "";
  if (localStorage.getItem("UserAdmin")) {
    accessToken = JSON.parse(localStorage.getItem("UserAdmin")).accessToken;
  }
  return (dispatch) => {
    dispatch(actAddUserRequest());
    Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
      method: "POST",
      data: user,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((result) => {
        dispatch(actAddUserSuccess(result.data));
        Toast.fire({
          icon: "success",
          title: `Thêm người dùng thành công`,
        })
      })
      .catch((err) => {
        dispatch(actAddUserFailed(err.response.data));
        Toast.fire({
          icon: "error",
          title: `${err.response.data}`,
        });
      });
  };
};

const actAddUserRequest = () => {
  return {
    type: ADD_USER_REQUEST,
  };
};

const actAddUserSuccess = (data) => {
  return {
    type: ADD_USER_SUCCESS,
    payload: data,
  };
};

const actAddUserFailed = (err) => {
  return {
    type: ADD_USER_FAILED,
    payload: err,
  };
};
