import * as ActionType from "./constant";
import Axios from "axios";
import { Toast } from "../../../../../components/Toast";

export const fetchDeleteUserApi = (taiKhoan) => {
  let accessToken = "";
  if (localStorage.getItem("UserAdmin")) {
    accessToken = JSON.parse(localStorage.getItem("UserAdmin")).accessToken;
  }
  return (dispatch) => {
    dispatch(actDeleteUserRequest());
    Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
      method: "DELETE",
      data: taiKhoan,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((result) => {
        dispatch(actDeleteUserSuccess(result.data));
        Toast.fire({
          icon: "success",
          title: `Xóa người dùng thành công`,
        });
      })
      .catch((err) => {
        dispatch(actDeleteUserFailed(err.response.data));
        Toast.fire({
          icon: "error",
          title: `${err.response.data}`,
        });
      });
  };
};
const actDeleteUserRequest = () => {
  return {
    type: ActionType.DELETE_USER_REQUEST,
  };
};
const actDeleteUserSuccess = (data) => {
  return {
    type: ActionType.DELETE_USER_SUCCESS,
    payload: data,
  };
};
const actDeleteUserFailed = (err) => {
  return {
    type: ActionType.DELETE_USER_FAILED,
    payload: err,
  };
};
